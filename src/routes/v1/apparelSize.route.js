const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const apparelSizeValidation = require('../../validations/apparelSize.validation');
const apparelSizeController = require('../../controllers/apparelSize.controller');

const router = express.Router();

router
  .route('/')
  // .post(auth('manageApparelSizes'), validate(apparelSizeValidation.createApparelSize), apparelSizeController.createApparelSize)
  .post(validate(apparelSizeValidation.createApparelSize), apparelSizeController.createApparelSize)
  // .get(auth('getApparelSizes'), validate(apparelSizeValidation.getApparelSizes), apparelSizeController.getApparelSizes);
  .get(validate(apparelSizeValidation.getApparelSizes), apparelSizeController.getApparelSizes);

router
  .route('/:apparelSizeId')
  // .get(auth('getApparelSizes'), validate(apparelSizeValidation.getApparelSize), apparelSizeController.getApparelSize)
  .get(validate(apparelSizeValidation.getApparelSize), apparelSizeController.getApparelSize)
  // .patch(auth('manageApparelSizes'), validate(apparelSizeValidation.updateApparelSize), apparelSizeController.updateApparelSize)
  .patch(validate(apparelSizeValidation.updateApparelSize), apparelSizeController.updateApparelSize)
  // .delete(auth('manageApparelSizes'), validate(apparelSizeValidation.deleteApparelSize), apparelSizeController.deleteApparelSize);
  .delete(validate(apparelSizeValidation.deleteApparelSize), apparelSizeController.deleteApparelSize);

module.exports = router;