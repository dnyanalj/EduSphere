const express = require('express');
const router = express.Router();
const { getScheduledTests, startAttempt, saveAnswer, finishAttempt } = require('../controllers/candidateController');

router.get('/tests', getScheduledTests);
router.post('/start-attempt', startAttempt);
router.post('/attempts/:attemptId/save-answer', saveAnswer);
router.post('/attempts/:attemptId/finish', finishAttempt);

module.exports = router;
