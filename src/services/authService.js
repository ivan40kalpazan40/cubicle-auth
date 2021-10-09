const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (username, password, repeatPassword) => {
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hash });
  return user;
};

const authService = { register };

module.exports = authService;
