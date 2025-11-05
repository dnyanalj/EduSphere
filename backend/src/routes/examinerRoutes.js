const express = require('express');
const router = express.Router();
const { createTest, listTests ,getTestResults} = require('../controllers/examinerController');

router.post('/create-test', createTest);
router.get('/tests', listTests);
router.get('/test/:testId/results', getTestResults);

module.exports = router;
