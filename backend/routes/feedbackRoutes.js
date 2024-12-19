const express = require('express');
const { submitFeedback } = require('../controllers/feedbackController');

const router = express.Router();

// Feedback submission route
router.post('/', submitFeedback);

module.exports = router;
