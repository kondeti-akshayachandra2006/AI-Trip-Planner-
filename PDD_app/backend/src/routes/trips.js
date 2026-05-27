import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { Trip } from '../models/Trip.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ trips });
  } catch (error) {
    res.status(500).json({ message: 'Could not load trips', detail: error.message });
  }
});

router.get('/details/:id', requireAuth, async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user.id });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json({ trip });
  } catch (error) {
    res.status(500).json({ message: 'Could not load trip', detail: error.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { destination, source } = req.body;
    if (!destination || !source) {
      return res.status(400).json({ message: 'Source and destination are required' });
    }
    const trip = await Trip.create({ userId: req.user.id, ...req.body });
    res.status(201).json({ trip });
  } catch (error) {
    res.status(500).json({ message: 'Could not save trip', detail: error.message });
  }
});

router.post('/:id/share', requireAuth, async (req, res) => {
  try {
    if (!req.body.email) return res.status(400).json({ message: 'Email is required' });
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $addToSet: { sharedWith: req.body.email } },
      { new: true },
    );
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json({ trip });
  } catch (error) {
    res.status(500).json({ message: 'Could not share trip', detail: error.message });
  }
});

export default router;
