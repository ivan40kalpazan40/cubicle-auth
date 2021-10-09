const express = require('express');
const cubeService = require('../services/cubeService');
const router = express.Router();

const cubeDetails = async (req, res) => {
  const cubeId = await req.params.cubeId;
  try {
    const cube = await cubeService.getOne(cubeId);
    const accessories = await cubeService.accForCube(cube._id);
    res.render('details', { ...cube, accessories });
  } catch (err) {
    console.log(err);
    res.render('404', { error: err.name, msg: err.message });
  }
};

const getCreateCube = async (req, res) => {
  //let cubes = await cubeService.getAll().then((cubes) => {
  //console.log(cubes);

  //});
  res.render('create');
};
const createCube = (req, res) => {
  const { name, description, imageUrl, difficulty } = req.body;
  cubeService
    .create(name, description, imageUrl, difficulty)
    .then((cube) => {
      res.redirect('/');
    })
    .catch((error) => {
      console.error('CUBE CREATE ERR:: ' + error);
      res.render('404', {
        error: 'Cube was not created!',
        msg: 'Please make sure you provided correct data in the form!',
      });
    });
};

router.get('/create', getCreateCube);
router.post('/create', createCube);
router.get('/:cubeId', cubeDetails);
module.exports = router;
