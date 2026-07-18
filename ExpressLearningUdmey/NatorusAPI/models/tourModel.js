const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'A tour must have name'],
      unique: true,
    },
    maxGroupSize: {
      type: Number,
      // required: [true, 'A tour must have MaxGroupSize'],
    },
    duration: {
      type: Number,
      // required: [true, 'A tour Must have Duration '],
    },
    summary: {
      type: String,
      trim: true,
      // required: [true, 'A tour Must have Summary '],
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
    priceDiscount: String,
    ratingsAverage: { type: Number, default: 4.0 },
    ratingsQuantity: { type: Number, default: 0 },
    price: { type: Number, require: [true, 'A tour must have price'] },
    difficulty: {
      type: String,
      default: 'easy',
    },
    imageCover: {
      type: String,
      // required: [true, 'A tour must have a image cover'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    duration: {
      type: Number,
      default: 3,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
// // documentt middleware : runs before .save() and .create()
// tourSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
// });

// tourSchema.pre('save', function () {
//   console.log('this is the log from the second middleware', this.slug);
// });
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
