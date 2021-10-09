const express = require('express');

const authService = require('../services/authService');

const router = express.Router();

const renderLogin = (req, res) => {
  res.render('auth/login');
};

const renderRegister = (req, res) => {
  res.render('auth/register');
};

const registerUser = (req, res) => {
  const { username, password, repeatPassword } = req.body;
  authService.register(username, password);
  // check if user exists in db
  //check if password is same as repeatPassword
  //create user in db
};

router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.post('/register', registerUser);

module.exports = router;
