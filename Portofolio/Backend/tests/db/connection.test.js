'use strict';

// Jest sets NODE_ENV=test, so the pool connects to DATABASE_URL_TEST.
const db = require('../../src/db/pool');
const { MARKER_TABLE } = require('../../src/db/guard');

const PROBE = 'zz_transaction_probe';

beforeAll(async () => {
  await db.query(`CREATE TABLE IF NOT EXISTS ${PROBE} (id int PRIMARY KEY)`);
});

afterAll(async () => {
  await db.query(`DROP TABLE IF EXISTS ${PROBE}`);
  await db.close();
});

describe('database connection', () => {
  test('the database answers', async () => {
    await expect(db.ping()).resolves.toBe(true);
  });

  test('tests are connected to the labelled test database, never the development one', async () => {
    const { rows } = await db.query('SELECT to_regclass($1) AS t', [`public.${MARKER_TABLE}`]);
    expect(rows[0].t).not.toBeNull();
  });

  test('the server is PostgreSQL 13 or newer (gen_random_uuid is built in)', async () => {
    const { rows } = await db.query(`SELECT current_setting('server_version_num')::int AS num`);
    expect(rows[0].num).toBeGreaterThanOrEqual(130000);
  });

  test('parameters are sent as data, not as SQL', async () => {
    const attack = "x'; DROP TABLE users; --";
    const { rows } = await db.query('SELECT $1::text AS value', [attack]);
    expect(rows[0].value).toBe(attack);
  });
});

describe('transactions', () => {
  beforeEach(async () => {
    await db.query(`TRUNCATE ${PROBE}`);
  });

  test('a successful transaction saves every statement', async () => {
    await db.withTransaction(async (client) => {
      await client.query(`INSERT INTO ${PROBE} (id) VALUES (1)`);
      await client.query(`INSERT INTO ${PROBE} (id) VALUES (2)`);
    });
    const { rows } = await db.query(`SELECT count(*)::int AS n FROM ${PROBE}`);
    expect(rows[0].n).toBe(2);
  });

  test('a failed transaction saves nothing and reports the error', async () => {
    await expect(
      db.withTransaction(async (client) => {
        await client.query(`INSERT INTO ${PROBE} (id) VALUES (1)`);
        await client.query(`INSERT INTO ${PROBE} (id) VALUES (1)`); // duplicate key
      })
    ).rejects.toMatchObject({ code: '23505' });
    const { rows } = await db.query(`SELECT count(*)::int AS n FROM ${PROBE}`);
    expect(rows[0].n).toBe(0);
  });
});
