// Direct SQL access for tests that check the database rules themselves.
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const TABLES = [
  'companies', 'job_category_rules', 'users', 'auth_tokens', 'refresh_tokens', 'sites',
  'employees', 'devices', 'geofences', 'work_sessions', 'telemetry_logs', 'alerts',
  'employee_current_state', 'tasks', 'record_corrections', 'reports',
];

// TRUNCATE is allowed even on append-only tables (the triggers block UPDATE/DELETE only).
async function truncateAll() {
  await pool.query(`TRUNCATE ${TABLES.join(', ')} RESTART IDENTITY CASCADE`);
}

const square = (lng, lat, half = 0.001) => ({
  type: 'Polygon',
  coordinates: [[[lng - half, lat - half], [lng + half, lat - half], [lng + half, lat + half], [lng - half, lat + half], [lng - half, lat - half]]],
});

// One company with everything a session needs. Returns the ids.
async function makeCompany(tag, { consent = true } = {}) {
  const q = async (sql, params) => (await pool.query(sql, params)).rows[0];
  const company = await q('INSERT INTO companies (name) VALUES ($1) RETURNING id', [`Company ${tag}`]);
  await q('INSERT INTO job_category_rules (company_id, job_category) VALUES ($1, $2) RETURNING id', [company.id, 'construction']);
  const user = await q(
    "INSERT INTO users (company_id, full_name, email, role) VALUES ($1, $2, $3, 'company_admin') RETURNING id",
    [company.id, `Admin ${tag}`, `admin-${tag.toLowerCase()}@example.test`],
  );
  const site = await q(
    "INSERT INTO sites (company_id, name, boundary, shift_start, shift_end) VALUES ($1, $2, $3, '07:00', '17:00') RETURNING id",
    [company.id, `Site ${tag}`, square(46.6, 24.7)],
  );
  const geofence = await q(
    'INSERT INTO geofences (site_id, name, boundary, is_outdoor) VALUES ($1, $2, $3, true) RETURNING id',
    [site.id, `Roof ${tag}`, square(46.6, 24.7, 0.0005)],
  );
  const employee = await q(
    "INSERT INTO employees (company_id, site_id, full_name, job_category, consent_given_at) VALUES ($1, $2, $3, 'construction', $4) RETURNING id",
    [company.id, site.id, `Worker ${tag}`, consent ? new Date() : null],
  );
  const device = await q(
    "INSERT INTO devices (company_id, employee_id, serial_number, api_key_hash) VALUES ($1, $2, $3, 'x') RETURNING id",
    [company.id, employee.id, `GPS-${tag}`],
  );
  return { companyId: company.id, userId: user.id, siteId: site.id, geofenceId: geofence.id, employeeId: employee.id, deviceId: device.id };
}

async function openSession(c, startedAt = new Date(Date.now() - 60 * 60_000)) {
  const { rows } = await pool.query(
    'INSERT INTO work_sessions (company_id, employee_id, site_id, device_id, started_at) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [c.companyId, c.employeeId, c.siteId, c.deviceId, startedAt],
  );
  return rows[0].id;
}

// Resolves with the SQLSTATE of the error the query raised, or null if it succeeded.
async function sqlState(sql, params) {
  try {
    await pool.query(sql, params);
    return null;
  } catch (err) {
    return err.code;
  }
}

module.exports = { pool, TABLES, truncateAll, makeCompany, openSession, sqlState, square };
