const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants');
const User = require('../models/User');

const login = async (username, password) => {
  try {
    const user = await User.findByUsername(username);
    if (user) {
      const isValid = user.validatePassword(password);
      if (isValid) {
        return user;
      } else {
        throw new Error('Wrong password');
      }
    } else {
      throw new Error('User does not exist.');
    }
  } catch (error) {
    throw error;
  }
};
const register = async (username, password, repeatPassword) => {
  const user = await User.create({ username, password });
  return user;
};

function createToken(user) {
  let payload = {
    _id: user._id,
    username: user.username,
  };
  // todo jwt ...
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, (err, resolvedToken) => {
      if (err) {
        reject(err);
      } else {
        resolve(resolvedToken);
      }
    });
  });
}

const authService = { register, login, createToken };

module.exports = authService;
