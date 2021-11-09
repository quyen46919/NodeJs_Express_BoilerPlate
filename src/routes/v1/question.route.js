const express = require('express');
const questionController = require('../../controllers/question.controller');
const router = express.Router();

router.route('/cau1').get(questionController.cau1);

router.route('/cau2').get(questionController.cau2);

router.route('/cau3').get(questionController.cau3);

router.route('/cau4').get(questionController.cau4);

router.route('/cau5').get(questionController.cau5);

router.route('/cau6').get(questionController.cau6);

router.route('/cau7').get(questionController.cau7);

router.route('/cau8').get(questionController.cau8);

router.route('/cau9').get(questionController.cau9);

router.route('/cau10').get(questionController.cau10);

router.route('/cau11').get(questionController.cau11);

router.route('/cau12').get(questionController.cau12);

router.route('/cau13').get(questionController.cau13);

router.route('/cau14').get(questionController.cau14);

router.route('/cau15').get(questionController.cau15);

router.route('/cau16').get(questionController.cau16);

router.route('/cau17').get(questionController.cau17);

router.route('/cau18').get(questionController.cau18);

module.exports = router;