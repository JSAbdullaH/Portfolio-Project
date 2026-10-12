#!/usr/bin/env node
'use strict';

/**
 * Database command line. Run through npm:
 *
 *   npm run db:check              connect and print what the database is
 *   npm run db:migrate            apply every pending migration
 *   npm run db:rollback           undo the last migration (add -- --all for every one)
 *   npm run db:status             list applied and pending migrations
 *   npm run db:new -- add-sites   create db/migrations/<timestamp>_add-sites.sql
 *   npm run db:mark-test          label the empty test database (once per test project)
 *
 * Add `-- --test` to any command to run it against DATABASE_URL_TEST.
 * migrate and rollback refuse a test database that is not labelled.
 */

const fs = require('node:fs');
const path = require('node:path');
const { Client } = require('pg');
const { getClientConfig, describeDatabase } = require('../src/db/config');
const { runMigrations, getStatus, MIGRATIONS_DIR } = require('../src/db/migrations');
const { assertTestDatabase, markTestDatabase, MARKER_TABLE } = require('../src/db/guard');

const args = process.argv.slice(2);
const command = args[0];
const target = args.includes('--test') ? 'test' : 'main';
const label = target === 'test' ? 'test database' : 'database';

async function check() {
  const config = getClientConfig(target);
  const client = new Client(config);
  await client.connect();
  try {
    const { rows } = await client.query(
      `SELECT current_database() AS database,
              current_user AS "user",
              current_setting('server_version') AS version,
              current_setting('TimeZone') AS timezone,
              to_regclass($1) IS NOT NULL AS marked`,
      [`public.${MARKER_TABLE}`]
    );
    const info = rows[0];
    const status = await getStatus(target);
    console.log(`Connected to the ${label}.`);
    console.log(`  address    ${describeDatabase(config.connectionString)}`);
    console.log(`  user       ${info.user}`);
    console.log(`  server     PostgreSQL ${info.version}`);
    console.log(`  time zone  ${info.timezone}`);
    console.log(`  ssl        ${sslLine(config.ssl)}`);
    if (target === 'test') console.log(`  test label ${info.marked ? 'yes' : 'no (run "npm run db:mark-test")'}`);
    console.log(`  migrations ${status.applied.length} applied, ${status.pending.length} pending`);
    if (status.pending.length) {
      console.log(`  run "npm run db:migrate${target === 'test' ? ' -- --test' : ''}" to apply the pending ones`);
    }
  } finally {
    await client.end();
  }
}

/** The SSL setting this program connected with (from DATABASE_SSL). */
function sslLine(option) {
  if (!option) return 'off';
  if (!option.rejectUnauthorized) return 'on, certificate NOT verified';
  return option.ca ? 'on, certificate verified with DATABASE_SSL_CA' : 'on, certificate verified';
}

async function migrate() {
  if (target === 'test') await assertTestDatabase();
  const ran = await runMigrations({ direction: 'up', target, log: () => {} });
  console.log(ran.length ? `Applied ${ran.length} migration(s) to the ${label}:` : `The ${label} is up to date.`);
  ran.forEach((name) => console.log(`  + ${name}`));
}

async function rollback() {
  if (target === 'test') await assertTestDatabase();
  const count = args.includes('--all') ? Infinity : 1;
  const ran = await runMigrations({ direction: 'down', count, target, log: () => {} });
  console.log(ran.length ? `Undid ${ran.length} migration(s) on the ${label}:` : 'Nothing to undo.');
  ran.forEach((name) => console.log(`  - ${name}`));
}

async function status() {
  const { applied, pending } = await getStatus(target);
  console.log(`Migrations on the ${label} (${describeDatabase(getClientConfig(target).connectionString)}):`);
  applied.forEach((row) => console.log(`  [applied] ${row.name}  ${row.run_on.toISOString()}`));
  pending.forEach((name) => console.log(`  [pending] ${name}`));
  if (!applied.length && !pending.length) console.log('  none');
}

async function markTest() {
  if (target !== 'test') {
    throw new Error('mark-test only labels the database of DATABASE_URL_TEST. Run it as: npm run db:mark-test');
  }
  const result = await markTestDatabase();
  const name = describeDatabase(getClientConfig('test').connectionString);
  console.log(result === 'marked' ? `Labelled ${name} as the test database.` : `${name} is already labelled as the test database.`);
}

function create() {
  const name = (args[1] || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (!name || name === 'test') {
    throw new Error('Give the migration a name: npm run db:new -- create-sites');
  }
  const file = path.join(MIGRATIONS_DIR, `${Date.now()}_${name}.sql`);
  fs.writeFileSync(
    file,
    [
      `-- ${name}`,
      '-- One change per migration. Never edit a migration after it is merged:',
      '-- add a new one instead.',
      '',
      '-- Up Migration',
      '',
      '',
      '-- Down Migration',
      '-- Undo exactly what the Up part does, in reverse order.',
      '',
    ].join('\n')
  );
  console.log(`Created ${path.relative(process.cwd(), file)}`);
}

const commands = { check, migrate, rollback, status, new: create, 'mark-test': markTest };

/** A short explanation for the errors people meet when connecting. */
function hint(err) {
  const message = String(err.message);
  if (/Tenant or user not found/i.test(message)) {
    return 'The pooler does not know this user. With the Supabase pooler the user is "postgres.<project-ref>", not "postgres". Copy the Session pooler string again.';
  }
  switch (err.code) {
    case 'ERR_INVALID_URL':
      return 'A connection string in .env is not a valid URL. Characters such as @ : / ? # % in the password must be URL-encoded (@ becomes %40).';
    case 'ENOTFOUND':
      return 'The host name does not exist. Copy the connection string again from Supabase (Connect, Session pooler).';
    case 'ENETUNREACH':
    case 'EHOSTUNREACH':
      return 'The host is not reachable. The Supabase "Direct connection" needs IPv6: use the "Session pooler" string instead.';
    case 'ECONNREFUSED':
      return 'Nothing is listening on that host and port. Check the host and port in .env (the Session pooler uses port 5432).';
    case '28P01':
      return 'Wrong password. Reset it in Supabase (Database settings), and URL-encode special characters in .env (@ becomes %40).';
    case '3D000':
      return 'That database does not exist. On Supabase the database name at the end of the URL is always "postgres".';
    case 'SELF_SIGNED_CERT_IN_CHAIN':
    case 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY':
    case 'UNABLE_TO_VERIFY_LEAF_SIGNATURE':
    case 'DEPTH_ZERO_SELF_SIGNED_CERT':
      return 'The server certificate could not be verified. Set DATABASE_SSL_CA to the CA file downloaded from Supabase (Database settings, SSL Configuration).';
    default:
      break;
  }
  if (/timeout/i.test(message)) {
    return 'The database did not answer in time. Check your network, and in the Supabase dashboard check that the project is not paused (free projects pause after a week without activity).';
  }
  return '';
}

async function main() {
  const run = commands[command];
  if (!run) {
    console.log('Usage: node scripts/db.js <check|migrate|rollback|status|new|mark-test> [--test] [--all]');
    process.exitCode = 1;
    return;
  }
  await run();
}

main().catch((err) => {
  console.error(`Database command "${command}" failed: ${err.message}`);
  const help = hint(err);
  if (help) console.error(help);
  process.exitCode = 1;
});
