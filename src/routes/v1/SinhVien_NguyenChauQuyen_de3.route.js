const express = require('express');
const validate = require('../../middlewares/validate');
const sinhVienValidation = require('../../validations/SinhVien_NguyenChauQuyen_de3.validation');
const sinhVienController = require('../../controllers/SinhVien_NguyenChauQuyen_de3.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(sinhVienValidation.taoSinhVien), sinhVienController.taoSinhVien)
  .get(validate(sinhVienValidation.timTatCaSinhVien), sinhVienController.timTatCaSinhVien);

router
  .route('/:sinhVienId')
  .get(validate(sinhVienValidation.timSinhVienTheoId), sinhVienController.timSinhVienTheoId)
  .patch(validate(sinhVienValidation.capNhatSinhVien), sinhVienController.capNhatSinhVien)
  .delete(validate(sinhVienValidation.xoaSinhVien), sinhVienController.xoaSinhVien);

module.exports = router;