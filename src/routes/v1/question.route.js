const express = require('express');
const questionController = require('../../controllers/question.controller');
const router = express.Router();

router.route('/cau1').get(questionController.cau1);

router.route('/cau2').get(questionController.cau2);

router.route('/cau3').get(questionController.cau3);

router.route('/cau4').get(questionController.cau4);

router.route('/cau5').get(questionController.cau5);

router.route('/cau6').get(questionController.cau6);

module.exports = router;