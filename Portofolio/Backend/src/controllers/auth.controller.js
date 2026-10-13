const config = require('../config');
const authService = require('../services/auth.service');

async function register(req, res) {
  await authService.register(req.body);
  res.status(201).json({ verification_required: config.REQUIRE_EMAIL_VERIFICATION });
}

async function login(req, res) {
  res.json(await authService.login(req.body));
}

module.exports = { register, login };
