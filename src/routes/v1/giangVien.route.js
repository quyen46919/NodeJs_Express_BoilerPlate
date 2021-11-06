const express = require('express');
const validate = require('../../middlewares/validate');
const giangVienValidation = require('../../validations/giangVien.validation');
const giangVienController = require('../../controllers/giangVien.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(giangVienValidation.taoGiangVien), giangVienController.taoGiangVien)
  .get(validate(giangVienValidation.timTatCaGiangVien), giangVienController.timTatCaGiangVien);

router
  .route('/:giangVienId')
  .get(validate(giangVienValidation.timGiangVienTheoId), giangVienController.timGiangVienTheoId)
  .patch(validate(giangVienValidation.capNhatGiangVien), giangVienController.capNhatGiangVien)
  .delete(validate(giangVienValidation.xoaGiangVien), giangVienController.xoaGiangVien);

module.exports = router;