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
    res.render('details', { ...cube, accessories, auth: req.user });
  } catch (err) {
    console.log(err);
    res.render('404', { error: err.name, msg: err.message, auth: req.user });
  }
};

const getCreateCube = async (req, res) => {
  //let cubes = await cubeService.getAll().then((cubes) => {
  //console.log(cubes);

  //});
  res.render('create', { auth: req.user });
};
const createCube = (req, res) => {
  const { name, description, imageUrl, difficulty } = req.body;
  const creatorId = req.user._id;
  cubeService
    .create(name, description, imageUrl, difficulty, creatorId)
    .then((cube) => {
      res.redirect('/');
    })
    .catch((error) => {
      console.error('CUBE CREATE ERR:: ' + error);
      res.render('404', {
        error: 'Cube was not created!',
        msg: 'Please make sure you provided correct data in the form!',
        auth: req.user,
      });
    });
};

const renderEdit = async (req, res) => {
  const cube = await cubeService.getOne(req.params.cubeId);
  res.render('editCubePage', {
    cube,
    difficulty: difficulty[cube.difficulty],
    auth: req.user,
  });
};

const renderDelete = async (req, res) => {
  const cubeId = req.params.cubeId;
  const cube = await cubeService.getOne(cubeId);
  res.render('deleteCubePage', {
    cube,
    difficulty: difficulty[cube.difficulty],
    auth: req.user,
  });
};

const deleteCubePage = async (req, res) => {
  try {
    await cubeService.deleteCube(req.params.cubeId);
    res.redirect(`/`);
  } catch (error) {
    console.log(error.message);
    res.redirect('/404');
  }
};

const editCubePage = async (req, res) => {
  const cubeId = req.params.cubeId;
  const { name, description, imageUrl, difficulty } = req.body;
  try {
    const cube = await cubeService.editCube(
      cubeId,
      name,
      description,
      imageUrl,
      difficulty
    );
    res.redirect(`/cube/${cubeId}`);
  } catch (error) {
    res.redirect('/404');
  }
};

router.get('/create', isAuth, getCreateCube);
router.post('/create', createCube);
router.get('/:cubeId', cubeDetails);
router.get('/:cubeId/edit', isAuth, renderEdit);
router.get('/:cubeId/delete', isAuth, renderDelete);
router.post('/:cubeId/delete', isAuth, deleteCubePage);
router.post('/:cubeId/edit', isAuth, editCubePage);

module.exports = router;
