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
  try {
    const allTours = await Tour.find();
    console.log(allTours);

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

// get tour deatils
exports.getTour = async (req, res) => {
  try {
    const tourDetails = await Tour.findById(req.params.id);
    // const tourDetails = await Tour.findOne(req.params.id);
    // const tourDetails = await Tour.find({ _id: req.params.id });
    console.log(tourDetails);

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
