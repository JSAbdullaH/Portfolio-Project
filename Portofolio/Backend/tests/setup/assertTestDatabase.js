'use strict';

/**
 * Runs once before any test file (jest.config.js, globalSetup).
 * Stops the whole run unless DATABASE_URL_TEST points at a database labelled
 * by "npm run db:mark-test", so no test can touch real data by mistake.
 */

const { assertTestDatabase } = require('../../src/db/guard');

module.exports = async () => {
  try {
    await assertTestDatabase();
  } catch (err) {
    console.error(`\nTests stopped before they started: ${err.message}\n`);
    process.exit(1);
  }
};
