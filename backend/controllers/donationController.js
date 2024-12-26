const Donation = require('../models/donation');
const Crowdfund = require('../models/Crowdfund');

// Fungsi untuk menambahkan donasi
const addDonation = async (req, res) => {
    try {
        const { user_id, crowdfund_id, payment_method, bank_name, amount } = req.body;

        // Validasi input
        if (!crowdfund_id || !user_id || !payment_method || amount <= 0) {
            return res.status(400).json({ message: 'Lu Mau Donasi Atau Ngutang COK!' });
        }

        // Periksa apakah crowdfund ada
        const crowdfund = await Crowdfund.findById(crowdfund_id);
        if (!crowdfund) {
            return res.status(404).json({ message: 'Crowdfund not found' });
        }

        // Cek jika metode pembayaran adalah 'TRANSFER' dan bank_name tidak disediakan
        if (payment_method === 'TRANSFER' && !bank_name) {
            return res.status(400).json({ message: 'Bank name is required for Transfer payment method' });
        }

        // Tambahkan donasi baru ke koleksi Donation
        const donation = new Donation({
            user_id,
            crowdfund_id,
            payment_method,
            bank_name,
            amount,
        });
        await donation.save();

        // Update jumlah donasi terkini di Crowdfund
        crowdfund.current_donation += amount;
        await crowdfund.save();

        // Populate crowdfund dan kirimkan respons
        const updatedCrowdfund = await Crowdfund.findById(crowdfund_id);

        res.status(201).json({
            message: 'Donation added successfully',
            donation,
            updatedCrowdfund,
        });
    } catch (error) {
        console.error('Error adding donation:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Fungsi untuk mendapatkan semua donasi
const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find().populate('user_id').populate('crowdfund_id');
        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Fungsi untuk mendapatkan donasi berdasarkan ID Crowdfund
const getDonationsByCrowdfund = async (req, res) => {
    try {
        const { crowdfund_id } = req.params;

        const donations = await Donation.find({ crowdfund_id }).populate('user_id');
        if (!donations || donations.length === 0) {
            return res.status(404).json({ message: 'No donations found for this crowdfund' });
        }

        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching donations for crowdfund:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    addDonation,
    getAllDonations,
    getDonationsByCrowdfund,
};
