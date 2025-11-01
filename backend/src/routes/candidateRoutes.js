const express = require('express');
const router = express.Router();
const {getAttemptQuestions, getScheduledTests, startAttempt, saveAnswer, finishAttempt } = require('../controllers/candidateController');

router.get('/tests', getScheduledTests);
router.post('/start-attempt', startAttempt);
router.get('/attempt/:attemptId/questions', getAttemptQuestions);
router.post('/attempt/:attemptId/save-answer', saveAnswer);
router.post('/attempt/:attemptId/finish', finishAttempt);
// router.get('/result/:attemptId', getResult);

module.exports = router;
