const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour must have name'],
    unique: true,
  },
  rating: { type: Number, default: 4.0 },
  price: { type: Number, require: [true, 'A tour must have price'] },
  difficulty: {
    type: String,
    default: 'easy',
  },
  duration: {
    type: Number,
    default: 3,
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
