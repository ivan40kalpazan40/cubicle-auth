const jwt = require('jsonwebtoken');
const { TOKEN_COOKIE_NAME, SECRET } = require('../constants');

exports.auth = function (req, res, next) {
  let token = req.cookies[TOKEN_COOKIE_NAME];

  if (!token) {
    return next();
  }

  jwt.verify(token, SECRET, (err, resolvedToken) => {
    if (err) {
      return res.status(401).redirect('/auth/login');
    }
    req.user = resolvedToken;
    next();
  });
};
