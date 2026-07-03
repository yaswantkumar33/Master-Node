const fs = require('fs');
const Tour = require('./../models/tourModel');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// exports.checkbody = (req, res, next) => {
//     let name = req.body.name;
//     if (!name) {
//         return res.status(400).json({
//             status: "Name is not there in the body",
//             message: "Invalid id"
//         })
//     }
//     next();
// }
// exports.checkId = (req, res, next, val) => {

//     let tour = tours.find((elem) => elem.id === Number(val));

//     if (!tour) {
//         return res.status(404).json({
//             status: "Failed to fetch the Tour",
//             message: "Invalid id"
//         })
//     }

//     next();

// }
// exports.getAllTours = (req, res) => {

//     res.status(200).json({
//         "status": "Sucess",
//         "Results": tours.length,
//         "data": {
//             tours
//         }
//     })
// }
// exports.createTour = (req, res) => {

//     const NewId = tours[tours.length - 1].id + 1;

//     let newTour = Object.assign({ id: NewId }, req.body);

//     tours.push(newTour);
//     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
//         res.status(201).json({
//             status: "Success",
//             data: {
//                 tours: newTour
//             }
//         })
//     })
// }
// exports.getTour = (req, res) => {

//     let tourId = req.params.id;
//     let tour = tours.find((elem) => elem.id === Number(tourId));

//     res.status(200).json({
//         status: "Sucess",
//         requestTime: req.requestTime,
//         data: {
//             params: tour
//         }
//     })

// }
// exports.updateTours = (req, res) => {
//     let tourId = req.params.id;

//     let tour = tours.find((elem) => elem.id === Number(tourId));

//     res.status(200).json({
//         status: "Success",
//         data: {
//             message: "Id received form the patch method!"
//         }
//     })

// }
// exports.deleteTour = (req, res) => {
//     let tourId = req.params.id;
//     let tour = tours.find((elem) => elem.id === Number(tourId));

//     res.status(200).json({
//         status: "Success",
//         data: {
//             message: "Id received form the delete method!"
//         }
//     })

// }

// using mongodb nad mongoose---------------------------------------------------
// create tour
exports.createTouer = async (req, res) => {
  console.log('Create Tour Called');

  try {
    // One way
    // const newTour = new Tour({ name: "Himalyan Hunters", price: 23444 })
    // newTour.save().then(()=>{
    //     console.log("New Tour created");
    // })
    // Another way
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

// get all tour from the database
exports.getAllTour = async (req, res) => {
  // GET /api/v1/tours?duration[gte]=5&difficulty=easy&sort=desc&limit=10&page=3&fields=test => {duration: { gte: '5' },difficulty: 'easy',sort: 'desc',limit: '10',page: '3',fields: 'test'}

  try {
    // 1a.) filtering
    const queryObj = { ...req.query };
    const excludedQueryObj = ['page', 'limit', 'sort', 'fields'];
    excludedQueryObj.forEach((ele) => delete queryObj[ele]);

    // 1b.)advance filterting
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // the main query
    let mainquery = Tour.find(JSON.parse(queryStr));

    // 2.) sort filter
    // sort condition
    if (req.query.sort) {
      // to do a descing order add "-" to the value like '-price'
      // to make multiple level of sort we can do like this
      const sortby = req.query.sort.split(',').join(' ');
      mainquery = mainquery.sort(sortby);
    } else {
      mainquery = mainquery.sort('-createdAt');
    }
    // 3.) limiting fields

    if (req.query.fields) {
      let fields = req.query.fields.split(',').join(' ');
      mainquery.select(fields);
    } else {
      // here in select if we use "-" means it means except that field
      mainquery.select('-__v');
    }

    // 4.)Pagination

    const limit = req.query.limit * 1 || 100;
    const page = req.query.page * 1 || 1;

    // skip
    const skip = (page - 1) * limit || 0;
    mainquery.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip > numTours) throw new Error('The page doses not exist!!!');
    }

    const allTours = await mainquery;

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

// middleware for the 5 best tours

exports.alias = (req, res, next) => {
  console.log('Middleare calleed ! for the top tours!!');
  req.query.limit = 3;
  req.query.sort  = "ratingsAverage,price"
  req.query.fields ="name,price,ratingsAverage,summary"
  next();
};

// get tour deatils
exports.getTour = async (req, res) => {
  try {
    const tourDetails = await Tour.findById(req.params.id);
    // const tourDetails = await Tour.findOne(req.params.id);
    // const tourDetails = await Tour.find({ _id: req.params.id });

    res.status(200).json({
      message: 'data fetched sucessfully',
      data: tourDetails,
    });
  } catch (err) {
    res.status(400).json({
      mesage: 'Somehting went wrong while fetching data',
      error: err.message,
    });
  }
};

// update tour by id
exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: 'updtaed sucessfully',
      data: updatedTour,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Something went wrong while updating the document',
      error: err.mesage,
    });
  }
};

// delete tour by id
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    }).then((data) => {
      res.status(204).json({
        message: 'Deleted Sucessfully',
        data: data._id,
      });
    });
  } catch (err) {
    res.status(400).json({
      message: 'Somthing went wrong while deleting',
      error: err.mesage,
    });
  }
};
