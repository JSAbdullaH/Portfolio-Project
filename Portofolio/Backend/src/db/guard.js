'use strict';

/**
 * Safety label for the test database.
 *
 * The test suite undoes every migration, which deletes every table. On
 * Supabase every database is named "postgres", so the name cannot tell the
 * test database from a real one. The test database carries a label instead:
 * a one-row table created by `npm run db:mark-test`. Only an empty database
 * can be labelled, and every destructive test command refuses a database
 * without the label.
 */

const { Client } = require('pg');
const { getClientConfig, describeDatabase } = require('./config');

const MARKER_TABLE = 'site14_test_marker';
// The migrations runner's own bookkeeping table does not count as data.
const IGNORED_TABLES = ['pgmigrations'];

async function withTestClient(work) {
  const config = getClientConfig('test');
  const client = new Client(config);
  await client.connect();
  try {
    return await work(client, describeDatabase(config.connectionString));
  } finally {
    await client.end();
  }
}

async function hasMarker(client) {
  const { rows } = await client.query('SELECT to_regclass($1) AS t', [`public.${MARKER_TABLE}`]);
  return rows[0].t !== null;
}

/** Throw unless DATABASE_URL_TEST points at a labelled test database. */
async function assertTestDatabase() {
  await withTestClient(async (client, name) => {
    if (!(await hasMarker(client))) {
      throw new Error(
        `${name} is not labelled as a test database, and the tests delete everything in it. ` +
          'If it really is your empty test database, run "npm run db:mark-test" once.'
      );
    }
  });
}

/**
 * Label the database of DATABASE_URL_TEST as the test database.
 * @returns {Promise<'marked'|'already-marked'>}
 */
async function markTestDatabase() {
  return withTestClient(async (client, name) => {
    if (await hasMarker(client)) return 'already-marked';

    const { rows } = await client.query(
      `SELECT c.relname AS name
         FROM pg_class c
         JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public'
          AND c.relkind IN ('r', 'p', 'v', 'm', 'f')
          AND c.relname <> ALL ($1::text[])
        ORDER BY 1`,
      [IGNORED_TABLES]
    );
    if (rows.length) {
      const list = rows.slice(0, 5).map((row) => row.name).join(', ');
      throw new Error(
        `${name} already has ${rows.length} table(s) in the public schema (${list}). ` +
          'Only an empty database can become the test database. Create a new, empty project for the tests.'
      );
    }

    await client.query('BEGIN');
    try {
      await client.query(`
        CREATE TABLE public.${MARKER_TABLE} (
          marked_at timestamptz NOT NULL DEFAULT now(),
          note      text        NOT NULL
        )`);
      await client.query(`INSERT INTO public.${MARKER_TABLE} (note) VALUES ($1)`, [
        'SITE14 test database. npm test deletes all data in it.',
      ]);
      await client.query(
        `COMMENT ON TABLE public.${MARKER_TABLE} IS 'Labels this database as the SITE14 test database (npm run db:mark-test).'`
      );
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK').catch(() => {});
      throw err;
    }
    return 'marked';
  });
}

module.exports = { assertTestDatabase, markTestDatabase, MARKER_TABLE };
