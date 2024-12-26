const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  message: { 
    type: String, 
    required: true 
  },
  user: { 
    type: String, 
    required: true 
  }, // Nama user
  crowdfundId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Crowdfund', 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
