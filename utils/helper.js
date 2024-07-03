const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const makeToken = (payload) => {
  if (!process.env.SECRET) {
    throw new Error('SECRET environment variable is not defined');
  }
  return jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
};

const comaprePassword = (plan, hash) => bcrypt.compareSync(plan, hash);

module.exports = {
  makeToken,
  comaprePassword,
};
