// Points the tests at the test database, and refuses anything else.
// Jest runs this before every test file (setupFiles), and global-setup.js
// requires it too, so both use the same checked URL.
require('dotenv').config({ quiet: true });

const url = process.env.DATABASE_URL_TEST;
if (!url) {
  throw new Error('DATABASE_URL_TEST is not set. Copy .env.example to .env and create the database (see README.md).');
}
const name = new URL(url).pathname.replace(/^\//, '');
if (!/test/i.test(name)) {
  throw new Error(`Refusing to run tests on database "${name}": its name must contain "test", because tests wipe it.`);
}

process.env.DATABASE_URL = url;
process.env.NODE_ENV = 'test';
process.env.JWT_ACCESS_SECRET ||= 'test-only-secret-at-least-32-characters-long';
