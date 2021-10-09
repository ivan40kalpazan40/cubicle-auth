const express = require('express');

const authService = require('../services/authService');

const router = express.Router();

const renderLogin = (req, res) => {
  res.render('auth/login');
};

const renderRegister = (req, res) => {
  res.render('auth/register');
};

const logUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await authService.login(username, password);
    res.redirect('/');
  } catch (error) {
    console.log(`_>` + error.message);
    return res.redirect('/auth/login');
  }
};
const registerUser = async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  const user = await authService.register(username, password);
  res.redirect('/auth/login');
};

router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.post('/login', logUser);
router.post('/register', registerUser);

module.exports = router;
