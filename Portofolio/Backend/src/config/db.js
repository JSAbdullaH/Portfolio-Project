const { Pool } = require('pg');
const config = require('./index');

const pool = new Pool({ connectionString: config.DATABASE_URL });

async function withTransaction(fn) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { pool, withTransaction };
