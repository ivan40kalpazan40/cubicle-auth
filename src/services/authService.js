const User = require('../models/User');

const register = async (username, password, repeatPassword) => {
  const user = await User.create({ username, password });
  return user;
};

const authService = { register };

module.exports = authService;
