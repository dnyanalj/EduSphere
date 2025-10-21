const express = require('express');
const router = express.Router();
const { createTest, listTests } = require('../controllers/examinerController');

router.post('/tests', createTest);
router.get('/tests', listTests);

module.exports = router;
