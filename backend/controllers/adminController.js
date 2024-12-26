const Crowdfund = require('../models/Crowdfund');
const Comment = require('../models/Comment'); // Opsional jika menggunakan komentar

exports.getAllCrowdfunds = async (req, res) => {
  try {
    const crowdfunds = await Crowdfund.find();
    res.json(crowdfunds);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching crowdfunds', error });
  }
};

exports.getCrowdfundById = async (req, res) => {
  try {
    const crowdfund = await Crowdfund.findById(req.params.id);
    if (!crowdfund) return res.status(404).json({ message: 'Crowdfund not found' });
    res.json(crowdfund);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching crowdfund', error });
  }
};

exports.createCrowdfund = async (req, res) => {
  try {
    const { name, target } = req.body;
    const newCrowdfund = new Crowdfund({ name, target });
    await newCrowdfund.save();
    res.status(201).json(newCrowdfund);
  } catch (error) {
    res.status(500).json({ message: 'Error creating crowdfund', error });
  }
};

exports.updateCrowdfund = async (req, res) => {
  try {
    const { name, target, status } = req.body;
    const updatedCrowdfund = await Crowdfund.findByIdAndUpdate(
      req.params.id,
      { name, target, status },
      { new: true }
    );
    if (!updatedCrowdfund) return res.status(404).json({ message: 'Crowdfund not found' });
    res.json(updatedCrowdfund);
  } catch (error) {
    res.status(500).json({ message: 'Error updating crowdfund', error });
  }
};

exports.deleteCrowdfund = async (req, res) => {
  try {
    const deletedCrowdfund = await Crowdfund.findByIdAndDelete(req.params.id);
    if (!deletedCrowdfund) return res.status(404).json({ message: 'Crowdfund not found' });
    res.json({ message: 'Crowdfund deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting crowdfund', error });
  }
};
