const express = require('express');
const validate = require('../../middlewares/validate');
const deTaiValidation = require('../../validations/deTai.validation');
const deTaiController = require('../../controllers/deTai.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(deTaiValidation.taoDeTai), deTaiController.taoDeTai)
  .get(validate(deTaiValidation.timTatCaDeTai), deTaiController.timTatCaDeTai);

router
  .route('/:deTaiId')
  .get(validate(deTaiValidation.timDeTaiTheoId), deTaiController.timDeTaiTheoId)
  .patch(validate(deTaiValidation.capNhatDeTai), deTaiController.capNhatDeTai)
  .delete(validate(deTaiValidation.xoaDeTai), deTaiController.xoaDeTai);

module.exports = router;