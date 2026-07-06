const express = require('express');
const router = express.Router();
const tourController = require('./../controller/tourController');

// router.param('id', tourController.checkId);

// router
//     .route('/')
//     .get(tourController.getAllTours)
//     .post(tourController.checkbody, tourController.createTour);
// router
//     .route('/:id')
//     .get(tourController.getTour)
//     .patch(tourController.checkbody, tourController.updateTours)
//     .delete(tourController.deleteTour);

// mogdb and mongoose ------------------------------------->

// route to best  5 tours

// router
  // .route('/top-5-cheap')
  // .get(tourController.alias, tourController.getAllTour);
router
  .route('/')
  // .post(tourController.createTouer)
  .get(tourController.getAllTour);
// router
//   .route('/:id')
//   .get(tourController.getTour)
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour);

module.exports = router;
