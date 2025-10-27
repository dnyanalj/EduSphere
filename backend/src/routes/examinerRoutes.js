const express = require('express');
const router = express.Router();
const { createTest, listTests } = require('../controllers/examinerController');

router.post('/create-test', createTest);
router.get('/tests', listTests);

module.exports = router;
