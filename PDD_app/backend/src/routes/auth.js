import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

function buildUserResponse(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    age: user.age,
    gender: user.gender,
    location: user.location || user.country,
    country: user.country,
    travelStyle: user.travelStyle,
    preferredTravelStyle: user.preferredTravelStyle,
    budget: user.budget,
    profilePhoto: user.profilePhoto,
    bio: user.bio,
    emergencyContact: user.emergencyContact,
    emergencyPhone: user.emergencyPhone,
    preferences: user.preferences,
    favoriteLocations: user.favoriteLocations,
    savedTrips: user.savedTrips,
  };
}

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET ?? 'dev-secret', { expiresIn: '30d' });
    res.status(201).json({ token, user: buildUserResponse(user) });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', detail: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET ?? 'dev-secret', { expiresIn: '30d' });
    res.json({ token, user: buildUserResponse(user) });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', detail: error.message });
  }
});

router.get('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: buildUserResponse(user) });
  } catch (error) {
    res.status(500).json({ message: 'Could not load profile', detail: error.message });
  }
});

router.put('/profile', requireAuth, async (req, res) => {
  try {
    const updates = (({ name, phone, age, gender, location, country, travelStyle, preferredTravelStyle, budget, profilePhoto, bio, preferences, emergencyContact, emergencyPhone }) => ({
      name,
      phone,
      age,
      gender,
      location,
      country,
      travelStyle,
      preferredTravelStyle,
      budget,
      profilePhoto,
      bio,
      emergencyContact,
      emergencyPhone,
      preferences,
    }))(req.body);

    // Keep backwards-compatible country field while also supporting location.
    if (updates.location && !updates.country) {
      updates.country = updates.location;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: buildUserResponse(user) });
  } catch (error) {
    res.status(500).json({ message: 'Could not update profile', detail: error.message });
  }
});

router.post('/forgot-password', (_req, res) => {
  res.json({ message: 'Password reset workflow queued.' });
});

export default router;
