const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const classValidation = require('../../validations/class.validation');
const classController = require('../../controllers/class.controller');

const router = express.Router();

router
  .route('/')
  // .post(auth('manageClasss'), validate(classValidation.createClass), classController.createClass)
  .post(validate(classValidation.createClass), classController.createClass)
  // .get(auth('getClasss'), validate(classValidation.getClasss), classController.getClasss);
  .get(validate(classValidation.getClasses), classController.getClasses);

router
  .route('/:classId')
  // .get(auth('getClasss'), validate(classValidation.getClass), classController.getClass)
  .get(validate(classValidation.getClass), classController.getClass)
  // .patch(auth('manageClasss'), validate(classValidation.updateClass), classController.updateClass)
  .patch(validate(classValidation.updateClass), classController.updateClass)
  // .delete(auth('manageClasss'), validate(classValidation.deleteClass), classController.deleteClass);
  .delete(validate(classValidation.deleteClass), classController.deleteClass);

module.exports = router;