const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please fill a valid email address',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().required().min(8).trim().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters long',
  }),
});

module.exports = loginSchema;
