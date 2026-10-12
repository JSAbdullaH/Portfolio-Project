'use strict';

/**
 * The single connection pool used by the whole API.
 *
 * Opening a PostgreSQL connection is slow, so the pool opens a few and lends
 * them to requests. Every query in the backend goes through this module:
 *
 *   const db = require('./db/pool');
 *   const { rows } = await db.query('SELECT * FROM sites WHERE company_id = $1', [companyId]);
 *
 * Values are always passed as parameters ($1, $2 ...), never concatenated into
 * the SQL string. That is what prevents SQL injection.
 */

const { Pool } = require('pg');
const { getClientConfig } = require('./config');

let pool;

/** Create the pool on first use. */
function getPool() {
  if (!pool) {
    pool = new Pool({
      ...getClientConfig(),
      // The Supabase pooler accepts few connections on the free plan.
      max: Number(process.env.DATABASE_POOL_MAX || 5),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
      application_name: 'site14-api',
    });
    // An idle connection can drop (database restart, network). Log it instead
    // of crashing the process; the pool replaces the connection on next use.
    pool.on('error', (err) => {
      console.error('[db] idle connection error:', err.message);
    });
  }
  return pool;
}

/** Run one parameterized query. */
function query(text, params) {
  return getPool().query(text, params);
}

/**
 * Run several queries as one transaction: either all of them are saved, or
 * none is. The callback receives a client; use it for every query inside.
 *
 *   await db.withTransaction(async (client) => {
 *     await client.query('INSERT ...', [...]);
 *     await client.query('UPDATE ...', [...]);
 *   });
 */
async function withTransaction(work) {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const result = await work(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    throw err;
  } finally {
    client.release();
  }
}

/** True when the database answers. Used by the health check. */
async function ping() {
  const { rows } = await query('SELECT 1 AS ok');
  return rows[0].ok === 1;
}

/** Close every connection, e.g. at shutdown or at the end of a test run. */
async function close() {
  if (pool) {
    const current = pool;
    pool = undefined;
    await current.end();
  }
}

module.exports = { getPool, query, withTransaction, ping, close };
