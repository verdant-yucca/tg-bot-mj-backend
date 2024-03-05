const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
    unique: true,
  },
  languageCode: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  avatarPath: {
    type: String,
    required: false,
  },
  lastAuth: {
    type: String,
    required: false,
  },
  createDate: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('user', userSchema);
