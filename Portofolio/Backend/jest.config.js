'use strict';

module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  // Refuse to start unless the test database carries its label.
  globalSetup: './tests/setup/assertTestDatabase.js',
  // Database tests share one test database, so they run one file at a time.
  maxWorkers: 1,
  testTimeout: 30_000,
};
