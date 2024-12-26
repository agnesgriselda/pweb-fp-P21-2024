const mongoose = require('mongoose');

// Enum untuk status crowdfund
const CrowdfundStatus = ['OPEN', 'CLOSE'];

// Enum untuk metode pembayaran
const PaymentMethod = ['QRIS', 'TRANSFER'];

// Schema untuk komentar (dalam Crowdfund)
const commentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Schema untuk favorit crowdfund
const FavoriteCrowdfundSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  crowdfund_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crowdfund',
    required: true,
  },
});

// Schema untuk crowdfund
const crowdfundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  target: { type: Number, required: true },
  current_donation: { type: Number, default: 0 },
  status: {
    type: String,
    enum: CrowdfundStatus, // Enum status crowdfund
    default: 'OPEN',
  },
  favorite_crowdfund: {
    type: [FavoriteCrowdfundSchema], // Array untuk favorit crowdfund
    required: false,
  },
  comments: [commentSchema], // Menyertakan schema komentar dalam Crowdfund
  createdAt: { type: Date, default: Date.now },
});

// Membuat model untuk Crowdfund
const Crowdfund = mongoose.model('Crowdfund', crowdfundSchema);

module.exports = Crowdfund;
