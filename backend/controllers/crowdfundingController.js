const Crowdfund = require('../models/Crowdfund');
const mongoose = require('mongoose');
// Fungsi untuk membuat crowdfunding baru
const createCrowdfunding = async (req, res) => {
    try {
        const { name, target } = req.body;
        if (!name || !target) {
            return res.status(400).json({ message: 'Name and Target are required' });
        }
        const newCrowdfunding = new Crowdfund({ name, target });
        await newCrowdfunding.save();
        res.status(201).json(newCrowdfunding);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk mendapatkan semua crowdfunding
const getAllCrowdfunds = async (req, res) => {
    try {
        const crowdfunds = await Crowdfund.find();
        res.status(200).json(crowdfunds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk mendapatkan detail crowdfunding berdasarkan ID
const getCrowdfundDetail = async (req, res) => {
    try {
        const crowdfund = await Crowdfund.findById(req.params.id).populate('comments.user_id');
        if (!crowdfund) {
            return res.status(404).json({ message: 'Crowdfund not found' });
        }
        res.status(200).json(crowdfund);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk mendapatkan crowdfunding aktif
const getActiveCrowdfunds = async (req, res) => {
    try {
        const crowdfunds = await Crowdfund.find({ status: 'OPEN' });
        res.status(200).json(crowdfunds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk menutup crowdfunding
const closeCrowdfund = async (req, res) => {
    try {
        const { id } = req.params;
        const crowdfund = await Crowdfund.findById(id);
        if (!crowdfund) {
            return res.status(404).json({ message: 'Crowdfund not found' });
        }
        crowdfund.status = 'CLOSE';
        await crowdfund.save();
        res.status(200).json({ message: 'Crowdfund closed successfully', crowdfund });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk menambahkan komentar
// Fungsi untuk menambahkan komentar ke crowdfunding
const addComment = async (req, res) => {
    try {
      const { user_id, crowdfund_id, message } = req.body;
  
      // Validasi input
      if (!user_id || !crowdfund_id || !message) {
        return res.status(400).json({ message: 'User ID, Crowdfund ID, and Message are required' });
      }
  
      // Temukan crowdfunding berdasarkan ID
      const crowdfund = await Crowdfund.findById(crowdfund_id);
      if (!crowdfund) {
        return res.status(404).json({ message: 'Crowdfund not found' });
      }
  
      // Menambahkan komentar ke crowdfunding
      const newComment = { user_id, message };
      crowdfund.comments.push(newComment); // Menyimpan komentar ke dalam array comments
      await crowdfund.save();
  
      res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Fungsi untuk menambahkan crowdfunding ke favorit
const addFavorite = async (req, res) => {
    try {
        const { user_id, crowdfund_id } = req.body;

        // Validasi input
        if (!user_id || !crowdfund_id) {
            return res.status(400).json({ message: 'User ID and Crowdfund ID are required' });
        }

        // Validasi ObjectId
        if (!mongoose.Types.ObjectId.isValid(crowdfund_id)) {
            return res.status(400).json({ message: 'Invalid crowdfund ID' });
        }

        console.log('Request body:', { user_id, crowdfund_id });

        // Cari crowdfunding
        const crowdfund = await Crowdfund.findById(crowdfund_id);
        if (!crowdfund) {
            console.log('Crowdfund not found:', crowdfund_id);
            return res.status(404).json({ message: 'Crowdfund not found' });
        }

        // Tambahkan favorit
        crowdfund.favorite_crowdfund.push({ user_id, crowdfund_id });
        console.log('Data before save:', crowdfund.favorite_crowdfund);
        await crowdfund.save();

        res.status(201).json({ message: 'Added to favorites' });
    } catch (error) {
        console.error('Error in addFavorite:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getFavorites = async (req, res) => {
    try {
        const { user_id } = req.query; // Ambil user_id dari query string

        // Validasi input
        if (!user_id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Cari crowdfunding yang memiliki favorit dari user tertentu
        const favorites = await Crowdfund.find({ 'favorite_crowdfund.user_id': user_id });

        res.status(200).json(favorites);
    } catch (error) {
        console.error('Error in getFavorites:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteFavorite = async (req, res) => {
    try {
        const { user_id, crowdfund_id } = req.body; // Ambil user_id dan crowdfund_id dari request body

        // Log data yang diterima
        console.log('Delete Favorite Request:', { user_id, crowdfund_id });

        // Validasi input
        if (!user_id || !crowdfund_id) {
            console.log('Missing user_id or crowdfund_id');
            return res.status(400).json({ message: 'User ID and Crowdfund ID are required' });
        }

        // Validasi ObjectId
        if (!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(crowdfund_id)) {
            return res.status(400).json({ message: 'Invalid user_id or crowdfund_id' });
        }

        // Cari crowdfunding berdasarkan ID
        const crowdfund = await Crowdfund.findById(crowdfund_id);
        if (!crowdfund) {
            console.log('Crowdfund not found:', crowdfund_id);
            return res.status(404).json({ message: 'Crowdfund not found' });
        }

        // Log sebelum perubahan
        console.log('Favorites before delete:', crowdfund.favorite_crowdfund);

        // Hapus favorit berdasarkan user_id
        crowdfund.favorite_crowdfund = crowdfund.favorite_crowdfund.filter(
            (favorite) => favorite.user_id.toString() !== user_id
        );

        // Log setelah perubahan
        console.log('Favorites after delete:', crowdfund.favorite_crowdfund);

        // Simpan perubahan
        await crowdfund.save();

        res.status(200).json({ message: 'Favorite deleted successfully' });
    } catch (error) {
        console.error('Error in deleteFavorite:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createCrowdfunding,
    getAllCrowdfunds,
    getCrowdfundDetail,
    getActiveCrowdfunds,
    closeCrowdfund,
    addComment,
    addFavorite,
    deleteFavorite,
    getFavorites,
};
