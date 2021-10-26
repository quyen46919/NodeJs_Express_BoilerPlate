const express = require('express');
const validate = require('../../middlewares/validate');
const loaiDichVuValidation = require('../../validations/loaiDichVu.validation');
const loaiDichVuController = require('../../controllers/loaiDichVu.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(loaiDichVuValidation.taoLoaiDichVu), loaiDichVuController.taoLoaiDichVu)
  .get(validate(loaiDichVuValidation.timTatCaLoaiDichVu), loaiDichVuController.timTatCaLoaiDichVu);

router
  .route('/:loaiDichVuId')
  .get(validate(loaiDichVuValidation.timLoaiDichVuTheoId), loaiDichVuController.timLoaiDichVuTheoId)
  .patch(validate(loaiDichVuValidation.capNhatLoaiDichVu), loaiDichVuController.capNhatLoaiDichVu)
  .delete(validate(loaiDichVuValidation.xoaLoaiDichVu), loaiDichVuController.xoaLoaiDichVu);

module.exports = router;