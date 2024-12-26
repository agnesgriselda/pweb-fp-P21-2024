const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Rute untuk mendapatkan semua crowdfund
router.get('/crowdfund', adminController.getAllCrowdfunds);

// Rute untuk mendapatkan detail crowdfund berdasarkan ID
router.get('/crowdfund/:id', adminController.getCrowdfundById);

// Rute untuk membuat crowdfund baru
router.post('/crowdfund', adminController.createCrowdfund);

// Rute untuk memperbarui data crowdfund berdasarkan ID
router.put('/crowdfund/:id', adminController.updateCrowdfund);

// Rute untuk menghapus crowdfund berdasarkan ID
router.delete('/crowdfund/:id', adminController.deleteCrowdfund);


module.exports = router;
