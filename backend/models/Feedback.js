const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  message: { type: String, required: true },
  is_anonymous: { type: Boolean, required: true },
  submitted_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
