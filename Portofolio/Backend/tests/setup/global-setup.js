// Runs once before all tests: rebuilds the test database from the migration files,
// so every run starts from exactly what `prisma migrate deploy` would create.
const fs = require('node:fs');
const path = require('node:path');
const { Client } = require('pg');

module.exports = async function globalSetup() {
  require('./env'); // sets and checks process.env.DATABASE_URL
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  try {
    await client.query('DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;');
    const dir = path.join(__dirname, '..', '..', 'prisma', 'migrations');
    const folders = fs.readdirSync(dir).filter((f) => fs.statSync(path.join(dir, f)).isDirectory()).sort();
    for (const folder of folders) {
      await client.query(fs.readFileSync(path.join(dir, folder, 'migration.sql'), 'utf8'));
    }
  } finally {
    await client.end();
  }
};
