const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');

const router = express.Router();

router
  .route('/')
  // .post(auth('manageCategorys'), validate(categoryValidation.createCategory), categoryController.createCategory)
  .post(validate(categoryValidation.createCategory), categoryController.createCategory)
  // .get(auth('getCategories'), validate(categoryValidation.getCategorys), categoryController.getCategorys);
  .get(validate(categoryValidation.getCategories), categoryController.getCategories);

router
  .route('/:categoryId')
  // .get(auth('getCategories'), validate(categoryValidation.getCategory), categoryController.getCategory)
  .get(validate(categoryValidation.getCategory), categoryController.getCategory)
  // .patch(auth('manageCategorys'), validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .patch(validate(categoryValidation.updateCategory), categoryController.updateCategory)
  // .delete(auth('manageCategorys'), validate(categoryValidation.deleteCategory), categoryController.deleteCategory);
  .delete(validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = router;