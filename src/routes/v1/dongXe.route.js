const express = require('express');
const validate = require('../../middlewares/validate');
const dongXeValidation = require('../../validations/dongXe.validation');
const dongXeController = require('../../controllers/dongXe.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(dongXeValidation.taoDongXe), dongXeController.taoDongXe)
  .get(validate(dongXeValidation.timTatCaDongXe), dongXeController.timTatCaDongXe);

router
  .route('/:dongXeId')
  .get(validate(dongXeValidation.timDongXeTheoId), dongXeController.timDongXeTheoId)
  .patch(validate(dongXeValidation.capNhatDongXe), dongXeController.capNhatDongXe)
  .delete(validate(dongXeValidation.xoaDongXe), dongXeController.xoaDongXe);

module.exports = router;