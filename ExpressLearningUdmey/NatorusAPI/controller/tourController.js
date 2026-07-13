const fs = require('fs');
const Tour = require('./../models/tourModel');
const ApiFeatures = require('./../utils/apiFeatures');

exports.getAllTour = async (req, res) => {
  try {
    let features = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const allTours = await features.query;

    res.status(200).json({
      message: 'Get all tours sucessfull',
      data: allTours,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Something went wrong on fetching data from the db!',
      error: err.message,
    });
  }
};

//aggregation
exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRatings: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } },
      // },
    ]);
    res.status(200).json({
      message: 'sucess',
      data: stats,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong!! Oops',
      error: e.message,
    });
  }
};
