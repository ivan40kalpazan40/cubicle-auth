const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 500 },
  imageUrl: {
    type: String,
    required: true,
    validate: [/^https?:\/\//i, 'Invalid url format'],
  },
  difficulty: { type: Number, min: 1, max: 10 },
  accessories: [{ type: mongoose.Types.ObjectId, ref: 'Accessory' }],
  creatorId: { type: String, required: true },
});

const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;
