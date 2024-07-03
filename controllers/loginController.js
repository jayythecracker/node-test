const helper = require('../utils/helper');
const loginSchema = require('../validators/loginValidator');
const User = require('../models/userModel');

const login = async (req, res, next) => {
  try {
    
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const hasUser = await User.findOne({ email: req.body.email }).select(
      '-__v'
    );
    if (hasUser) {
      if (helper.comaprePassword(req.body.password, hasUser.password)) {
        const user = hasUser.toObject();
        user.token = helper.makeToken(hasUser.toObject());
        delete user.password;
        delete user.__v;
        delete user.created_at;
        res.json(user);
      } else {
        return res.status(400).json({ error: 'Incorrect Password!' });
      }
    } else {
      return res.status(400).json({ error: 'No user with that email!' });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = login;
