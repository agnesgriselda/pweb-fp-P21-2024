const express = require('express');
const { login, register } = require('../controllers/authController');

const router = express.Router();

// Login route
router.post('/login', login);

// Register route
router.post('/register', register);

// Debugging route
router.get('/', (req, res) => {
    res.send('Auth API root working!');
});

module.exports = router;
