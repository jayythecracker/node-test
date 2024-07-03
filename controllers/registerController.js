const userSchema = require('../validators/registerValidator');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const helper = require('../utils/helper');
const path = require('path');

const register = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      profile_pic: req.file ? path.join(req.file.filename) : 'No profile picture',
    });

    const savedUser = await newUser.save();
    const user = savedUser.toObject();
    user.token = helper.makeToken(user);
    delete user.password;
    res.json(user);

  } catch (e) {
    next(e);
  }
};

module.exports = register;
