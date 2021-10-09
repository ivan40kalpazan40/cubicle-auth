const bcrypt = require('bcrypt');
const User = require('../models/User');

const login = async (username, password) => {
  try {
    const user = await User.findByUsername(username);
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
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

const authService = { register, login };

module.exports = authService;
