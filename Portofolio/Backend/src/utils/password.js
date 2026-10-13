const argon2 = require('argon2');

const OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
};

function hashPassword(password) {
  return argon2.hash(password, OPTIONS);
}

async function verifyPassword(hash, password) {
  try {
    return await argon2.verify(hash, password);
  } catch {
    return false;
  }
}

let dummyHash;
async function burnPasswordCheck(password) {
  dummyHash = dummyHash || hashPassword('dummy-password-for-timing-only');
  await verifyPassword(await dummyHash, password);
}

module.exports = { hashPassword, verifyPassword, burnPasswordCheck };
