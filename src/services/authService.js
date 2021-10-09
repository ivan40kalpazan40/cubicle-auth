const User = require('../models/User');

const register = (username, password) => {
  console.log(username, password);
};

const authService = { register };

module.exports = authService;
