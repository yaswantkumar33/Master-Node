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

    console.log(features.query.getQuery());

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

exports.createTouer = async (req, res) => {
  console.log('Create Tour Called');

  try {
    const newTour = await Tour.create(req.body);
    // console.log(req.body);

    res.status(200).json({
      message: 'Tour created successfully',
      data: newTour,
    });
  } catch (err) {
    console.log(`${err.message}`);
    res.status(400).json({
      message: 'Oops Something went wrong in the creation process',
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

exports.getMontlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourstarts: { $sum: 1 },
          tours: { $push: '$name' }, //to make a array
        },
      },
      {
        $addFields: {
          month: '$_id',
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
      {
        $limit: 6,
      },
    ]);
    res.status(200).json({
      message: 'sucess',
      data: { plan },
    });
  } catch (e) {
    res.status(500).json({
      message: 'oops something went wrong',
      error: e.message,
    });
  }
};

//closing at 7:08  unwinding and projecting 10:31 pm 13:07:2026
