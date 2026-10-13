const config = require('../config');
const { withTransaction } = require('../config/db');
const AppError = require('../utils/AppError');
const { burnPasswordCheck, hashPassword, verifyPassword } = require('../utils/password');
const { signAccessToken } = require('../utils/jwt');
const companyModel = require('../models/company.model');
const userModel = require('../models/user.model');

const invalidCredentials = () =>
  new AppError(401, 'INVALID_CREDENTIALS', 'Email or password is incorrect');

async function register(input) {
  const passwordHash = await hashPassword(input.password);
  try {
    await withTransaction(async (client) => {
      const company = await companyModel.create(client, {
        name: input.company_name,
        commercialRegistration: input.commercial_registration,
      });
      await userModel.create(client, {
        companyId: company.id,
        fullName: input.full_name,
        email: input.email,
        passwordHash,
        role: 'company_admin',
      });
    });
  } catch (err) {
    if (err.code === '23505') return;
    throw err;
  }
}

async function login(input) {
  const user = await userModel.findByEmail(input.email);

  if (!user || !user.password_hash) {
    await burnPasswordCheck(input.password);
    throw invalidCredentials();
  }

  if (user.locked_until && user.locked_until > new Date()) {
    await burnPasswordCheck(input.password);
    throw invalidCredentials();
  }

  const ok = await verifyPassword(user.password_hash, input.password);
  if (!ok) {
    await userModel.registerFailure(user.id);
    throw invalidCredentials();
  }

  if (!user.is_active) throw invalidCredentials();
  if (config.REQUIRE_EMAIL_VERIFICATION && !user.is_email_verified) {
    throw new AppError(403, 'EMAIL_NOT_VERIFIED', 'Confirm your email address before signing in');
  }

  await userModel.resetFailures(user.id);

  const { token, expiresIn } = signAccessToken({
    userId: user.id,
    companyId: user.company_id,
    role: user.role,
  });

  return {
    access_token: token,
    expires_in: expiresIn,
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      company_id: user.company_id,
    },
  };
}

module.exports = { register, login };
