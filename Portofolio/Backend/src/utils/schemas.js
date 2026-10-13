const { z } = require('zod');

const email = z.string().trim().toLowerCase().email('Enter a valid email address').max(255);

const newPassword = z
  .string()
  .min(10, 'Use at least 10 characters')
  .max(128, 'Use at most 128 characters');

const registerSchema = z.object({
  company_name: z.string().trim().min(2).max(150),
  commercial_registration: z.string().trim().max(50).optional(),
  full_name: z.string().trim().min(2).max(120),
  email,
  password: newPassword,
});

const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Enter your password').max(128),
});

module.exports = { registerSchema, loginSchema };
