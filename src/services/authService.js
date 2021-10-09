const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (username, password) => {
  try {
    const user = await User.findByUsername(username);
    if (user) {
      const isValid = await user.validatePassword(password);
      console.log(isValid);
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
    _id: user.get('_id'),
    username: user.get('username'),
  };
  // todo jwt ...
  return new Promise(
    (resolve, reject),
    jwt.sign(payload, secret, { expiresIn: '1d' })
  );
}

const authService = { register, login };

module.exports = authService;
