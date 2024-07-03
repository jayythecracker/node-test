const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please fill a valid email address',
    'string.empty': 'Email is required',
  }),
  phone: Joi.string().trim().min(8).max(11).required().messages({
    'string.empty': 'Phone is required',
    'string.min': 'Phone number must be at least 8 characters long',
    'string.max': 'Phone number must be at most 11 characters long',
  }),
  password: Joi.string().min(8).invalid('12345678').required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters long',
    'any.invalid': 'Password is too weak',
  }),
  profile_pic: Joi.string().default('No profile picture'),
});

module.exports = userSchema;
