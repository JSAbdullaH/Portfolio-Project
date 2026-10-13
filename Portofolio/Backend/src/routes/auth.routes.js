const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const config = require('../config');
const { validateBody } = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('../utils/schemas');
const authController = require('../controllers/auth.controller');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => config.NODE_ENV === 'test',
  handler: (_req, res) => {
    res.status(429).json({ error: { code: 'RATE_LIMITED', message: 'Too many attempts, try again later' } });
  },
});

const router = Router();

router.post('/register', authLimiter, validateBody(registerSchema), authController.register);
router.post('/login', authLimiter, validateBody(loginSchema), authController.login);

module.exports = router;
