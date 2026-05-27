import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, (_req, res) => {
  res.json({
    notifications: [
      { id: 'weather-1', type: 'weather', message: 'Rain chance increased near your destination.' },
      { id: 'safety-1', type: 'safety', message: 'Prefer daylight arrival for the selected route.' },
    ],
  });
});

export default router;
