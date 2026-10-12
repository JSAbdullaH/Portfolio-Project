'use strict';

/**
 * Database configuration.
 *
 * Every connection setting comes from environment variables, so the same code
 * runs against a developer's Supabase project, the test project and the
 * production project. Only the .env file (or the host's settings) changes.
 *
 * Supabase is used as hosted PostgreSQL only: the API connects with a normal
 * PostgreSQL connection string. Supabase Auth, the auto-generated REST API
 * (Data API), RLS and Realtime are not used (school rule).
 */

const fs = require('node:fs');
const path = require('node:path');
const { parseEnv } = require('node:util');

const BACKEND_DIR = path.join(__dirname, '..', '..');
const ENV_FILE = path.join(BACKEND_DIR, '.env');

/**
 * Copy the values of .env into process.env. A value already set in the real
 * environment wins, so a hosting provider's settings override the file.
 * parseEnv is built into Node >= 20.12, so no dotenv package is needed.
 */
function loadEnvFile() {
  if (!fs.existsSync(ENV_FILE)) return;
  const values = parseEnv(fs.readFileSync(ENV_FILE, 'utf8'));
  for (const [key, value] of Object.entries(values)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

/**
 * Remove SSL settings written inside the URL (sslmode, sslrootcert ...).
 * node-postgres lets them silently replace the ssl option below, which drops
 * the CA certificate. SSL is configured only through DATABASE_SSL instead.
 */
function stripSslParams(url) {
  const parsed = new URL(url);
  for (const key of [...parsed.searchParams.keys()]) {
    if (key.toLowerCase().startsWith('ssl') || key === 'uselibpqcompat') parsed.searchParams.delete(key);
  }
  return parsed.toString();
}

/** "user@host:port/database", the identity of a database without the password. */
function describeDatabase(url) {
  const u = new URL(url);
  const port = u.port || '5432';
  return `${decodeURIComponent(u.username)}@${u.hostname}:${port}/${decodeURIComponent(u.pathname.replace(/^\//, ''))}`;
}

/** Database name from a connection string, e.g. "postgres". */
function databaseName(url) {
  return decodeURIComponent(new URL(url).pathname.replace(/^\//, ''));
}

/**
 * The test database must never be the main one: the tests undo every
 * migration, which deletes every table. On Supabase every database is named
 * "postgres", so the check compares host, port, user and database.
 */
function assertSeparateTestDatabase(testUrl, mainUrl) {
  if (mainUrl && describeDatabase(testUrl) === describeDatabase(mainUrl)) {
    throw new Error(
      'DATABASE_URL_TEST points at the same database as DATABASE_URL. ' +
        'Tests delete data, so they need their own database (a second Supabase project).'
    );
  }
}

/**
 * Connection string for the requested target.
 * @param {'main'|'test'} [target] defaults to 'test' when NODE_ENV is "test".
 */
function getDatabaseUrl(target) {
  loadEnvFile();
  const resolved = target || (process.env.NODE_ENV === 'test' ? 'test' : 'main');
  const variable = resolved === 'test' ? 'DATABASE_URL_TEST' : 'DATABASE_URL';
  const url = process.env[variable];
  if (!url) {
    throw new Error(`${variable} is not set. Copy .env.example to .env and fill it in.`);
  }
  if (resolved === 'test') assertSeparateTestDatabase(url, process.env.DATABASE_URL);
  return stripSslParams(url);
}

/**
 * SSL setting for node-postgres, from DATABASE_SSL:
 *   false      no encryption (a local PostgreSQL only)
 *   true       encrypt and verify the server certificate; for Supabase set
 *              DATABASE_SSL_CA to the CA file downloaded from the dashboard
 *              (a path, or the certificate text itself)
 *   no-verify  encrypt without verifying the certificate
 */
function getSslOption() {
  loadEnvFile();
  const value = (process.env.DATABASE_SSL || 'false').toLowerCase();
  if (value === 'no-verify') return { rejectUnauthorized: false };
  if (value !== 'true') return false;
  const ssl = { rejectUnauthorized: true };
  const caPath = process.env.DATABASE_SSL_CA;
  if (caPath && caPath.trim().startsWith('-----BEGIN')) {
    // A hosting provider may only offer variables, not files: the certificate
    // itself can be pasted into DATABASE_SSL_CA.
    ssl.ca = caPath.replace(/\\n/g, '\n');
  } else if (caPath) {
    const resolved = path.resolve(BACKEND_DIR, caPath);
    if (!fs.existsSync(resolved)) {
      throw new Error(`DATABASE_SSL_CA file not found: ${resolved}. Download it from Supabase: Database settings, SSL Configuration.`);
    }
    ssl.ca = fs.readFileSync(resolved, 'utf8');
  }
  return ssl;
}

/**
 * Full client configuration accepted by pg.Pool, pg.Client and node-pg-migrate.
 * A connection that is not open after 10 seconds fails with a clear error
 * instead of hanging (for example when a free Supabase project is paused).
 */
function getClientConfig(target) {
  return { connectionString: getDatabaseUrl(target), ssl: getSslOption(), connectionTimeoutMillis: 10_000 };
}

module.exports = {
  getDatabaseUrl,
  getSslOption,
  getClientConfig,
  databaseName,
  describeDatabase,
  stripSslParams,
  assertSeparateTestDatabase,
};
