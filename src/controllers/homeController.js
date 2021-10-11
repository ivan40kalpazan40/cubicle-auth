const express = require('express');
const { Error } = require('mongoose');
const cubeService = require('../services/cubeService');
const router = express.Router();

const renderHome = (req, res) => {
  cubeService
    .getAll()
    .then((items) => {
      res.render('index', { items, auth: req.user });
    })
    .catch((err) => console.error(`DB.FIND.ERR:: ${err.error}`));
};
const renderAbout = (req, res) => {
  res.render('about', { auth: req.user });
};

const search = (req, res) => {
  let { search, from, to } = req.query;
  cubeService
    .getAll()
    .then((items) => {
      if (search) {
        items = items.filter((x) =>
          x.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (from) {
        items = items.filter((x) => x.difficulty >= from);
      }
      if (to) {
        items = items.filter((x) => x.difficulty <= to);
      }

      res.render('index', { title: 'SEARCH', items, auth: req.user });
    })
    .catch((err) => {
      console.log(err);
      const er = new Error('Search error');
      res.render('404', { error: er.name, msg: er.message, auth: req.user });
    });
};

router.get('/', renderHome);
router.get('/about', renderAbout);
router.get('/search', search);

module.exports = router;
