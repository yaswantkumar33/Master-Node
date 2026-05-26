const express = require('express');
const controller = require('../controller');
const router = express.Router();

router
    .route('/api/v1/dummy')
    .get(controller.getapi)
    .post(controller.postapi)
    .delete(controller.deleteapi)


module.exports = router;