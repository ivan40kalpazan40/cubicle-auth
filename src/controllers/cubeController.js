const express = require('express');
const cubeService = require('../services/cubeService');
const { isAuth } = require('../middleware/authMiddleware');
const { difficulty } = require('../constants');
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

const renderEdit = (req, res) => {
  res.render('editCubePage');
};

const renderDelete = async (req, res) => {
  const cubeId = req.params.cubeId;
  const cube = await cubeService.getOne(cubeId);
  res.render('deleteCubePage', {
    cube,
    difficulty: difficulty[cube.difficulty],
  });
};

router.get('/create', isAuth, getCreateCube);
router.post('/create', createCube);
router.get('/:cubeId', cubeDetails);
router.get('/:cubeId/edit', isAuth, renderEdit);
router.get('/:cubeId/delete', isAuth, renderDelete);

module.exports = router;
