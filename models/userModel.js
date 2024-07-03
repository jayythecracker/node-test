const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true,
    minlength: 8,
    maxlength: 11,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    trim: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  profile_pic: {
    type: String,
    default: 'No profile picture',
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

// Hash the password before saving the user
userModel.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', userModel);
module.exports = User;
