'use strict';

/**
 * Schema migrations.
 *
 * Each file in db/migrations is one versioned change to the schema, written in
 * plain SQL with an "-- Up Migration" part (apply) and a "-- Down Migration"
 * part (undo). The table "pgmigrations" records which files have run, so each
 * file runs exactly once on every database.
 *
 * The runner is node-pg-migrate. It is an ES module, so it is loaded with
 * import() from this CommonJS file.
 */

const fs = require('node:fs');
const path = require('node:path');
const { Client } = require('pg');
const { getClientConfig } = require('./config');

const MIGRATIONS_DIR = path.join(__dirname, '..', '..', 'db', 'migrations');
const MIGRATIONS_TABLE = 'pgmigrations';

/** Migration names found on disk, in the order they will run. */
function listMigrationFiles() {
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith('.sql'))
    .sort()
    .map((file) => file.replace(/\.sql$/, ''));
}

/**
 * Apply or undo migrations.
 * @param {object} options
 * @param {'up'|'down'} [options.direction] 'up' applies, 'down' undoes
 * @param {number} [options.count] how many; default all for up, 1 for down
 * @param {'main'|'test'} [options.target] which database
 * @param {(msg: string) => void} [options.log]
 * @returns {Promise<string[]>} names of the migrations that ran
 */
async function runMigrations({ direction = 'up', count, target, log = console.log } = {}) {
  const { runner } = await import('node-pg-migrate');
  const ran = await runner({
    databaseUrl: getClientConfig(target),
    dir: MIGRATIONS_DIR,
    migrationsTable: MIGRATIONS_TABLE,
    direction,
    count,
    checkOrder: true, // fail if an older file appears after newer ones already ran
    singleTransaction: true, // a failed batch leaves the database unchanged
    log,
  });
  return ran.map((migration) => migration.name);
}

/** Applied and pending migrations for a database. */
async function getStatus(target) {
  const files = listMigrationFiles();
  const client = new Client(getClientConfig(target));
  await client.connect();
  try {
    const { rows: exists } = await client.query('SELECT to_regclass($1) AS t', [`public.${MIGRATIONS_TABLE}`]);
    let applied = [];
    if (exists[0].t) {
      const { rows } = await client.query(`SELECT name, run_on FROM ${MIGRATIONS_TABLE} ORDER BY run_on, id`);
      applied = rows;
    }
    const appliedNames = new Set(applied.map((row) => row.name));
    return { applied, pending: files.filter((name) => !appliedNames.has(name)) };
  } finally {
    await client.end();
  }
}

module.exports = { runMigrations, getStatus, listMigrationFiles, MIGRATIONS_DIR, MIGRATIONS_TABLE };
