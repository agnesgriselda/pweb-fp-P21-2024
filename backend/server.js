require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Tambahkan rute admin
const crowdfundingRoutes = require('./routes/crowdfunding');
const donationRoutes = require('./routes/donation');

const app = express();

// Middleware
app.use(cors()); // Untuk mengatasi masalah CORS
app.use(express.json()); // Middleware untuk parsing JSON request body

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/users', userRoutes); // Geser setelah endpoint utama
app.use('/api/admin', adminRoutes); // Tambahkan rute admin
app.use('/api/crowdfunds', crowdfundingRoutes); // Route untuk crowdfunding
app.use('/api/donations', donationRoutes); // Route untuk donasi

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
