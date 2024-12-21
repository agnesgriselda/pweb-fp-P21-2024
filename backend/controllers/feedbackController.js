// File: controllers/feedbackcontroller.js

const Feedback = require('../models/Feedback');

// Submit feedback
exports.submitFeedback = async (req, res) => {
  const { name, email, message, is_anonymous } = req.body;

  try {
    const feedbackData = {
      message,
      is_anonymous,
      name: is_anonymous ? 'Anonymous' : name,
      email: is_anonymous ? '' : email,
    };

    const feedback = new Feedback(feedbackData);
    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Feedback submission error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
