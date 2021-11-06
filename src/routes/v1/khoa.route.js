const express = require('express');
const validate = require('../../middlewares/validate');
const khoaValidation = require('../../validations/khoa.validation');
const khoaController = require('../../controllers/khoa.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(khoaValidation.taoKhoa), khoaController.taoKhoa)
  .get(validate(khoaValidation.timTatCaKhoa), khoaController.timTatCaKhoa);

router
  .route('/:khoaId')
  .get(validate(khoaValidation.timKhoaTheoId), khoaController.timKhoaTheoId)
  .patch(validate(khoaValidation.capNhatKhoa), khoaController.capNhatKhoa)
  .delete(validate(khoaValidation.xoaKhoa), khoaController.xoaKhoa);

module.exports = router;