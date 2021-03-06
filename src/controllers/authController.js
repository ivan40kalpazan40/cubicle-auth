const express = require('express');

const authService = require('../services/authService');
const { TOKEN_COOKIE_NAME } = require('../constants');
const { isGuest } = require('../middleware/authMiddleware');
const router = express.Router();

const renderLogin = (req, res) => {
  res.render('auth/login', { auth: req.user });
};

const renderRegister = (req, res) => {
  res.render('auth/register', { auth: req.user });
};

const logUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await authService.login(username, password);
    const token = await authService.createToken(user);
    res.cookie(TOKEN_COOKIE_NAME, token, { httpOnly: true });
    res.redirect('/');
  } catch (error) {
    console.log(`_>` + error.message);
    return res.redirect('/auth/login');
  }
};
const registerUser = async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  try {
    const user = await authService.register(username, password);
    res.redirect('/auth/login');
  } catch (error) {
    console.log(error.message);
    res.redirect('/404');
  }
};

const logoutUser = (req, res) => {
  res.clearCookie(TOKEN_COOKIE_NAME);
  res.redirect('/');
  //authService.logUserOut();
};

router.get('/login', isGuest, renderLogin);
router.get('/register', isGuest, renderRegister);
router.get('/logout', logoutUser);
router.post('/login', isGuest, logUser);
router.post('/register', isGuest, registerUser);

module.exports = router;
