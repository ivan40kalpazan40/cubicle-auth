const express = require('express');
const router = express.Router();

const renderLogin = (req, res) => {
  res.render('auth/login');
};

const renderRegister = (req, res) => {
  res.render('auth/register');
};

router.get('/login', renderLogin);
router.get('/register', renderRegister);

module.exports = router;
