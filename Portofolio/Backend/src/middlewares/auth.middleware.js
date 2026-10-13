const AppError = require('../utils/AppError');
const { verifyAccessToken } = require('../utils/jwt');

function authenticate(req, _res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw new AppError(401, 'UNAUTHENTICATED', 'Authentication required');
  }
  req.auth = verifyAccessToken(header.slice(7).trim());
  next();
}

const requireRole = (...allowed) => (req, _res, next) => {
  const auth = req.auth;
  if (!auth) throw new AppError(401, 'UNAUTHENTICATED', 'Authentication required');
  if (auth.role === 'company_admin' || allowed.includes(auth.role)) return next();
  throw new AppError(403, 'FORBIDDEN', 'You do not have permission to do this');
};

module.exports = { authenticate, requireRole };
