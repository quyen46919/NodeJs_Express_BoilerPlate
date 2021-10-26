const express = require('express');
const validate = require('../../middlewares/validate');
const nhaCungCapValidation = require('../../validations/nhaCungCap.validation');
const nhaCungCapController = require('../../controllers/nhaCungCap.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(nhaCungCapValidation.taoNhaCungCap), nhaCungCapController.taoNhaCungCap)
  .get(validate(nhaCungCapValidation.timTatCaNhaCungCap), nhaCungCapController.timTatCaNhaCungCap);

router
  .route('/:nhaCungCapId')
  .get(validate(nhaCungCapValidation.timNhaCungCapTheoId), nhaCungCapController.timNhaCungCapTheoId)
  .patch(validate(nhaCungCapValidation.capNhatNhaCungCap), nhaCungCapController.capNhatNhaCungCap)
  .delete(validate(nhaCungCapValidation.xoaNhaCungCap), nhaCungCapController.xoaNhaCungCap);

module.exports = router;