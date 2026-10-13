const { pool } = require('../config/db');
const config = require('../config');

async function create(client, { companyId, fullName, email, passwordHash, role }) {
  const { rows } = await client.query(
    `INSERT INTO users (company_id, full_name, email, password_hash, role, is_email_verified)
     VALUES ($1, $2, $3, $4, $5, FALSE)
     RETURNING id`,
    [companyId, fullName, email, passwordHash, role],
  );
  return rows[0];
}

async function findByEmail(email) {
  const { rows } = await pool.query(
    `SELECT id, company_id, full_name, email, password_hash, role,
            is_email_verified, is_active, locked_until
       FROM users WHERE lower(email) = $1`,
    [email],
  );
  return rows[0] || null;
}

async function registerFailure(userId) {
  await pool.query(
    `UPDATE users SET
        failed_login_count = CASE
          WHEN locked_until IS NOT NULL AND locked_until <= now() THEN 1
          ELSE failed_login_count + 1 END,
        locked_until = CASE
          WHEN (CASE WHEN locked_until IS NOT NULL AND locked_until <= now() THEN 1
                     ELSE failed_login_count + 1 END) >= $2
          THEN now() + make_interval(mins => $3)
          ELSE NULL END,
        updated_at = now()
      WHERE id = $1`,
    [userId, config.LOGIN_MAX_FAILURES, config.LOGIN_LOCK_MINUTES],
  );
}

async function resetFailures(userId) {
  await pool.query(
    'UPDATE users SET failed_login_count = 0, locked_until = NULL, updated_at = now() WHERE id = $1',
    [userId],
  );
}

module.exports = { create, findByEmail, registerFailure, resetFailures };
