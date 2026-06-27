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

router.route('/').post(tourController.createTouer);

module.exports = router;