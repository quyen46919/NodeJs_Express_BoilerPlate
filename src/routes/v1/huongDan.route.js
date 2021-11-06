const express = require('express');
const validate = require('../../middlewares/validate');
const huongDanValidation = require('../../validations/huongDan.validation');
const huongDanController = require('../../controllers/huongDan.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(huongDanValidation.taoHuongDan), huongDanController.taoHuongDan)
  .get(validate(huongDanValidation.timTatCaHuongDan), huongDanController.timTatCaHuongDan);

router
  .route('/:huongDanId')
  .get(validate(huongDanValidation.timHuongDanTheoId), huongDanController.timHuongDanTheoId)
  .patch(validate(huongDanValidation.capNhatHuongDan), huongDanController.capNhatHuongDan)
  .delete(validate(huongDanValidation.xoaHuongDan), huongDanController.xoaHuongDan);

module.exports = router;