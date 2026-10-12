'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {
  getDatabaseUrl,
  getSslOption,
  databaseName,
  describeDatabase,
  stripSslParams,
  assertSeparateTestDatabase,
} = require('../../src/db/config');

const DEV = 'postgresql://postgres.devref123:p%40ss@aws-0-eu-central-1.pooler.supabase.com:5432/postgres';
const TEST = 'postgresql://postgres.testref456:p%40ss@aws-0-eu-central-1.pooler.supabase.com:5432/postgres';

/** Run fn with some environment variables changed, then put them back. */
function withEnv(values, fn) {
  const previous = {};
  for (const [key, value] of Object.entries(values)) {
    previous[key] = process.env[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    return fn();
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

describe('reading a connection string', () => {
  test('database name, which is always "postgres" on Supabase', () => {
    expect(databaseName(DEV)).toBe('postgres');
    expect(databaseName('postgres://u:p@localhost:5432/site14_test')).toBe('site14_test');
  });

  test('the identity of a database leaves the password out', () => {
    expect(describeDatabase(DEV)).toBe('postgres.devref123@aws-0-eu-central-1.pooler.supabase.com:5432/postgres');
    expect(describeDatabase(DEV)).not.toContain('p@ss');
  });

  test('a missing port means 5432', () => {
    expect(describeDatabase('postgres://u:p@db.example.com/app')).toBe('u@db.example.com:5432/app');
  });
});

describe('the test database must be a different database', () => {
  test('two Supabase projects are different databases', () => {
    expect(() => assertSeparateTestDatabase(TEST, DEV)).not.toThrow();
  });

  test('the same project is refused, even when the password is written differently', () => {
    const samePlaceOtherPassword = DEV.replace('p%40ss', 'other');
    expect(() => assertSeparateTestDatabase(samePlaceOtherPassword, DEV)).toThrow(/same database/);
  });

  test('getDatabaseUrl("test") refuses DATABASE_URL_TEST equal to DATABASE_URL', () => {
    withEnv({ DATABASE_URL: DEV, DATABASE_URL_TEST: DEV }, () => {
      expect(() => getDatabaseUrl('test')).toThrow(/same database/);
    });
  });

  test('a missing variable gives a clear message', () => {
    withEnv({ DATABASE_URL_TEST: '' }, () => {
      expect(() => getDatabaseUrl('test')).toThrow(/DATABASE_URL_TEST is not set/);
    });
  });
});

describe('SSL settings', () => {
  test('SSL options written inside the URL are removed, the rest is kept', () => {
    const url = stripSslParams(`${DEV}?sslmode=require&sslrootcert=x.crt&application_name=api`);
    expect(url).not.toMatch(/ssl/);
    expect(url).toMatch(/application_name=api/);
    expect(getDatabaseUrlFrom(`${DEV}?sslmode=require`)).not.toMatch(/sslmode/);
  });

  test.each([
    ['false', false],
    ['true', { rejectUnauthorized: true }],
    ['no-verify', { rejectUnauthorized: false }],
  ])('DATABASE_SSL=%s gives the right option', (value, expected) => {
    withEnv({ DATABASE_SSL: value, DATABASE_SSL_CA: '' }, () => {
      expect(getSslOption()).toEqual(expected);
    });
  });

  test('DATABASE_SSL_CA adds the certificate to verify the server with', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'site14-ca-'));
    const file = path.join(dir, 'ca.crt');
    fs.writeFileSync(file, '-----BEGIN CERTIFICATE-----\nfake\n-----END CERTIFICATE-----\n');
    try {
      withEnv({ DATABASE_SSL: 'true', DATABASE_SSL_CA: file }, () => {
        expect(getSslOption()).toEqual({ rejectUnauthorized: true, ca: fs.readFileSync(file, 'utf8') });
      });
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  test('the certificate text itself can be given instead of a path (hosting variables)', () => {
    const pem = '-----BEGIN CERTIFICATE-----\\nfake\\n-----END CERTIFICATE-----';
    withEnv({ DATABASE_SSL: 'true', DATABASE_SSL_CA: pem }, () => {
      expect(getSslOption().ca).toBe('-----BEGIN CERTIFICATE-----\nfake\n-----END CERTIFICATE-----');
    });
  });

  test('a missing certificate file is reported, not ignored', () => {
    withEnv({ DATABASE_SSL: 'true', DATABASE_SSL_CA: './certs/does-not-exist.crt' }, () => {
      expect(() => getSslOption()).toThrow(/DATABASE_SSL_CA file not found/);
    });
  });
});

function getDatabaseUrlFrom(url) {
  return withEnv({ DATABASE_URL: url }, () => getDatabaseUrl('main'));
}
