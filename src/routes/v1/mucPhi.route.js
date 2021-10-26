const express = require('express');
const validate = require('../../middlewares/validate');
const mucPhiValidation = require('../../validations/mucPhi.validation');
const mucPhiController = require('../../controllers/mucPhi.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(mucPhiValidation.taoMucPhi), mucPhiController.taoMucPhi)
  .get(validate(mucPhiValidation.timTatCaMucPhi), mucPhiController.timTatCaMucPhi);

router
  .route('/:mucPhiId')
  .get(validate(mucPhiValidation.timMucPhiTheoId), mucPhiController.timMucPhiTheoId)
  .patch(validate(mucPhiValidation.capNhatMucPhi), mucPhiController.capNhatMucPhi)
  .delete(validate(mucPhiValidation.xoaMucPhi), mucPhiController.xoaMucPhi);

module.exports = router;