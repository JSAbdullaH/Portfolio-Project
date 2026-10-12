'use strict';

/**
 * The label that keeps the tests away from real data. Each test hides the
 * label of the test database for a moment, checks that the commands refuse
 * to work, and puts the label back.
 */

const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { Client } = require('pg');
const { getClientConfig } = require('../../src/db/config');
const { MARKER_TABLE } = require('../../src/db/guard');

const ROOT = path.join(__dirname, '..', '..');
const HIDDEN = `${MARKER_TABLE}_hidden`;

function dbCommand(...args) {
  try {
    const out = execFileSync(process.execPath, ['scripts/db.js', ...args], {
      cwd: ROOT,
      env: process.env,
      encoding: 'utf8',
      stdio: 'pipe',
    });
    return { code: 0, out };
  } catch (err) {
    return { code: err.status, out: `${err.stdout}${err.stderr}` };
  }
}

async function sql(text) {
  const client = new Client(getClientConfig('test'));
  await client.connect();
  try {
    return (await client.query(text)).rows;
  } finally {
    await client.end();
  }
}

/** Run checks while the label is hidden, then always restore it. */
async function withoutLabel(checks) {
  await sql(`ALTER TABLE ${MARKER_TABLE} RENAME TO ${HIDDEN}`);
  try {
    await checks();
  } finally {
    await sql(`DROP TABLE IF EXISTS ${MARKER_TABLE}`);
    await sql(`ALTER TABLE ${HIDDEN} RENAME TO ${MARKER_TABLE}`);
  }
}

describe('test database label', () => {
  test('migrate and rollback refuse a test database without the label', async () => {
    await withoutLabel(async () => {
      for (const command of ['migrate', 'rollback']) {
        const result = dbCommand(command, '--test');
        expect(result.code).toBe(1);
        expect(result.out).toMatch(/not labelled as a test database/);
      }
    });
  });

  test('mark-test refuses a database that already has tables', async () => {
    await withoutLabel(async () => {
      await sql('CREATE TABLE zz_existing_data (id int)');
      try {
        const result = dbCommand('mark-test', '--test');
        expect(result.code).toBe(1);
        expect(result.out).toMatch(/Only an empty database can become the test database/);
        expect(result.out).toMatch(/zz_existing_data/);
        const [{ t }] = await sql(`SELECT to_regclass('public.${MARKER_TABLE}') AS t`);
        expect(t).toBeNull();
      } finally {
        await sql('DROP TABLE IF EXISTS zz_existing_data');
      }
    });
  });

  test('mark-test only works on DATABASE_URL_TEST', () => {
    const result = dbCommand('mark-test');
    expect(result.code).toBe(1);
    expect(result.out).toMatch(/only labels the database of DATABASE_URL_TEST/);
  });

  test('marking twice is harmless', () => {
    const result = dbCommand('mark-test', '--test');
    expect(result.code).toBe(0);
    expect(result.out).toMatch(/already labelled/);
  });
});
