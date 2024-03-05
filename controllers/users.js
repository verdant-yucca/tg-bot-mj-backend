const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const {
  ERROR_NOT_FOUND, ERROR_BED_REQUEST
} = require('../utils/constants');

module.exports.login = async (req, res, next) => {
  const {
    chatId, languageCode, username, firstName, lastName, avatarPath
  } = req.body;
  const foundUser = await User.findOne({ chatId });
  const currentDate = new Date().toISOString();
  console.log('foundUser', foundUser);

  if (foundUser) {
    User.findOneAndUpdate(
      { chatId },
      { languageCode, username, firstName, lastName, avatarPath, lastAuth: currentDate }
    )
      .then((user) => {
        if (user) {
          res.send({ user });
        } else {
          throw new NotFoundError(ERROR_NOT_FOUND.message);
        }
      })
      .catch((err) => {
        if (err.name === 'ValidationError' || err.name === 'CastError') {
          next(new BadRequestError(ERROR_BED_REQUEST.message));
        } else {
          next(err);
        }
      });
  } else {
    const createDate = currentDate;
    const lastAuth = currentDate;

    User.create({
      chatId, languageCode, username, firstName, lastName, avatarPath, createDate, lastAuth
    })
      .then((user) =>  res.send({ user }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(ERROR_BED_REQUEST.message));
        } else {
          next(err);
        }
      });
  }
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

