const mongoose = require('mongoose');
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
const getAll = async () => {
  const cubes = await Cube.find().lean();
  return cubes;
};
const getOne = async (id) => {
  const cube = await Cube.findById(id).lean();
  return cube;
};

const create = (name, description, imageUrl, difficulty) => {
  return Cube.create({ name, description, imageUrl, difficulty });
};
const newAccessory = (name, description, imageUrl) => {
  return Accessory.create({ name, description, imageUrl });
};

const allAccessories = async () => {
  const accessories = await Accessory.find({}).lean();
  return accessories;
};
const oneAccById = async (id) => {
  const acc = await Accessory.findById(id).lean();
  return acc;
};

const accForCube = async (id) => {
  const cube = await getOne(id);
  return await Accessory.find({ _id: { $in: cube.accessories } }).lean();
};

const availableForCube = async (id) => {
  const cube = await getOne(id);
  return await Accessory.find({ _id: { $nin: cube.accessories } }).lean();
};

const updateCube = async (id, update) => {
  const cube = await Cube.findOneAndUpdate({ _id: id }, update);
  return cube;
};
const cubeService = {
  create,
  getAll,
  getOne,
  newAccessory,
  allAccessories,
  oneAccById,
  accForCube,
  availableForCube,
  updateCube,
};
module.exports = cubeService;
