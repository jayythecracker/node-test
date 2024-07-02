// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  age: {
    type: Number,
    min: [18, 'Age must be at least 18'],
    max: [99, 'Age must be less than 100'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
