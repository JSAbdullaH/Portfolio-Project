const { pool } = require('../config/db');

async function create(client, { name, commercialRegistration }) {
  const { rows } = await client.query(
    'INSERT INTO companies (name, commercial_registration) VALUES ($1, $2) RETURNING id',
    [name, commercialRegistration || null],
  );
  return rows[0];
}

async function findById(id) {
  const { rows } = await pool.query(
    `SELECT id, name, midday_ban_from_date, midday_ban_to_date,
            midday_ban_start_time, midday_ban_end_time
       FROM companies WHERE id = $1`,
    [id],
  );
  return rows[0] || null;
}

module.exports = { create, findById };
