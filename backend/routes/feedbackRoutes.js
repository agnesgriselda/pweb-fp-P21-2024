const express = require('express');
const { submitFeedback } = require('../controllers/feedbackController');

const router = express.Router();

// Feedback submission route
router.post('/', submitFeedback);

// Debugging route
router.get('/', (req, res) => {
    res.send('Feedback API root working!');
});

module.exports = router;
