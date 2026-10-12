'use strict';

/**
 * Runs the real commands a developer types (npm run db:*), against the test
 * database, and checks the database after each one.
 */

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { Client } = require('pg');
const { getClientConfig } = require('../../src/db/config');
const { listMigrationFiles, MIGRATIONS_DIR } = require('../../src/db/migrations');

const ROOT = path.join(__dirname, '..', '..');

function dbCommand(...args) {
  try {
    const stdout = execFileSync(process.execPath, ['scripts/db.js', ...args, '--test'], {
      cwd: ROOT,
      env: process.env,
      encoding: 'utf8',
      stdio: 'pipe',
    });
    return { code: 0, out: stdout };
  } catch (err) {
    return { code: err.status, out: `${err.stdout}${err.stderr}` };
  }
}

async function inspect(sql, params) {
  const client = new Client(getClientConfig('test'));
  await client.connect();
  try {
    return (await client.query(sql, params)).rows;
  } finally {
    await client.end();
  }
}

const appliedCount = async () => {
  const [{ t }] = await inspect(`SELECT to_regclass('public.pgmigrations') AS t`);
  if (!t) return 0;
  const [{ n }] = await inspect('SELECT count(*)::int AS n FROM pgmigrations');
  return n;
};

const databaseSettings = async () => {
  const rows = await inspect(`
    SELECT s.setconfig
    FROM pg_db_role_setting s
    JOIN pg_database d ON d.oid = s.setdatabase
    WHERE d.datname = current_database() AND s.setrole = 0`);
  return rows.length ? rows[0].setconfig : [];
};

describe('migrations, run the way a developer runs them', () => {
  const files = listMigrationFiles();

  test('the setup migrations come first: baseline, then the Data API lock', () => {
    expect(files.length).toBeGreaterThanOrEqual(2);
    expect(files[0]).toMatch(/^\d{13}_baseline$/);
    expect(files[1]).toMatch(/^\d{13}_lock-supabase-data-api$/);
  });

  test('rollback --all leaves no migration applied and removes the UTC setting', async () => {
    const result = dbCommand('rollback', '--all');
    expect(result.code).toBe(0);
    expect(await appliedCount()).toBe(0);
    expect(await databaseSettings()).not.toContain('TimeZone=UTC');
  });

  test('migrate applies every migration and fixes the time zone to UTC', async () => {
    const result = dbCommand('migrate');
    expect(result.code).toBe(0);
    expect(result.out).toMatch(/Applied \d+ migration/);
    expect(await appliedCount()).toBe(files.length);
    expect(await databaseSettings()).toContain('TimeZone=UTC');
  });

  test('a new connection sees UTC', async () => {
    const [{ tz }] = await inspect(`SELECT current_setting('TimeZone') AS tz`);
    expect(tz).toBe('UTC');
  });

  test('running migrate again changes nothing', async () => {
    const result = dbCommand('migrate');
    expect(result.code).toBe(0);
    expect(result.out).toMatch(/up to date/);
    expect(await appliedCount()).toBe(files.length);
  });

  test('check and status report the state', () => {
    const check = dbCommand('check');
    expect(check.code).toBe(0);
    expect(check.out).toMatch(/time zone\s+UTC/);
    expect(check.out).toMatch(new RegExp(`${files.length} applied, 0 pending`));
    const status = dbCommand('status');
    expect(status.out).toMatch(/\[applied\] \d{13}_baseline/);
  });

  test('the Supabase API roles (anon, authenticated, service_role) get no rights on what the app creates', async () => {
    // Create one of each inside a transaction, read the rights, then undo it all.
    const client = new Client(getClientConfig('test'));
    await client.connect();
    try {
      await client.query('BEGIN');
      await client.query('CREATE TABLE public.zz_rights_probe (id serial PRIMARY KEY)');
      const { rows } = await client.query(`
        SELECT r.rolname AS role,
               has_table_privilege(r.oid, 'public.zz_rights_probe', 'SELECT, INSERT, UPDATE, DELETE, TRUNCATE') AS new_table,
               has_table_privilege(r.oid, 'public.pgmigrations', 'SELECT, INSERT, UPDATE, DELETE') AS migrations_table,
               has_sequence_privilege(r.oid, 'public.zz_rights_probe_id_seq', 'USAGE, SELECT, UPDATE') AS sequence
          FROM pg_roles r
         WHERE r.rolname IN ('anon', 'authenticated', 'service_role')
         ORDER BY 1`);
      await client.query('ROLLBACK');
      // On a plain PostgreSQL the roles do not exist and rows is empty.
      for (const row of rows) {
        expect(row).toEqual({ role: row.role, new_table: false, migrations_table: false, sequence: false });
      }
      // No default grant to these roles is left for anything created later
      // (tables, sequences and functions).
      const { rows: defaults } = await client.query(`
        SELECT count(*)::int AS n
          FROM pg_default_acl d
          JOIN pg_namespace n ON n.oid = d.defaclnamespace
         CROSS JOIN LATERAL aclexplode(d.defaclacl) a
          JOIN pg_roles r ON r.oid = a.grantee
         WHERE n.nspname = 'public'
           AND d.defaclrole = (SELECT oid FROM pg_roles WHERE rolname = current_user)
           AND r.rolname IN ('anon', 'authenticated', 'service_role')`);
      expect(defaults[0].n).toBe(0);
    } finally {
      await client.end();
    }
  });

  test('a failing migration leaves the database exactly as it was', async () => {
    const broken = path.join(MIGRATIONS_DIR, '9999999999999_test-only-broken.sql');
    fs.writeFileSync(
      broken,
      '-- Up Migration\nCREATE TABLE zz_half_done (id int);\nSELECT * FROM table_that_does_not_exist;\n-- Down Migration\nDROP TABLE zz_half_done;\n'
    );
    try {
      const before = await appliedCount();
      const result = dbCommand('migrate');
      expect(result.code).toBe(1);
      expect(result.out).toMatch(/table_that_does_not_exist/);
      expect(await appliedCount()).toBe(before);
      const [{ t }] = await inspect(`SELECT to_regclass('public.zz_half_done') AS t`);
      expect(t).toBeNull(); // the CREATE TABLE before the error was rolled back too
    } finally {
      fs.rmSync(broken, { force: true });
    }
  });
});
