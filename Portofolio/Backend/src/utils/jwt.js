const jwt = require('jsonwebtoken');
const config = require('../config');
const AppError = require('./AppError');

const ISSUER = 'worksite-api';
const ROLES = ['company_admin', 'site_manager'];

function signAccessToken(ctx) {
  const expiresIn = config.JWT_ACCESS_TTL_SECONDS;
  const token = jwt.sign({ company_id: ctx.companyId, role: ctx.role }, config.JWT_ACCESS_SECRET, {
    algorithm: 'HS256',
    subject: ctx.userId,
    issuer: ISSUER,
    expiresIn,
  });
  return { token, expiresIn };
}

function verifyAccessToken(token) {
  try {
    const payload = jwt.verify(token, config.JWT_ACCESS_SECRET, {
      algorithms: ['HS256'],
      issuer: ISSUER,
    });
    if (
      typeof payload === 'string' ||
      typeof payload.sub !== 'string' ||
      typeof payload.company_id !== 'string' ||
      !ROLES.includes(payload.role)
    ) {
      throw new Error('malformed claims');
    }
    return { userId: payload.sub, companyId: payload.company_id, role: payload.role };
  } catch {
    throw new AppError(401, 'UNAUTHENTICATED', 'Invalid or expired token');
  }
}

module.exports = { signAccessToken, verifyAccessToken };
