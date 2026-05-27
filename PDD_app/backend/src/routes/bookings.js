import express from 'express';

const router = express.Router();

function fare(value) {
  return `Rs ${Math.max(80, Math.round(value)).toLocaleString('en-IN')}`;
}

router.post('/options', (req, res) => {
  const { source = 'Hyderabad', destination = 'Goa', distanceMeters = 587000, durationSeconds = 31400 } = req.body;
  const km = Math.max(1, Number(distanceMeters) / 1000);
  const hours = Math.max(1, Number(durationSeconds) / 3600);
  const slug = `${source}-to-${destination}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const options = [
    {
      type: 'Bus',
      provider: km > 450 ? 'Sleeper Volvo partner' : 'Premium AC coach',
      estimate: fare(km * 2.4 + 450),
      confidence: 'High',
      score: km > 450 ? 88 : 82,
      seatsLeft: Math.max(6, Math.round(34 - km / 35)),
      bookingUrl: `https://www.makemytrip.com/bus-tickets/${slug}.html`,
      reason: 'Best value when price, route time, and cancellation flexibility are balanced.',
    },
    {
      type: 'Train',
      provider: 'IRCTC rail route',
      estimate: fare(km * 1.7 + 300),
      confidence: km > 250 ? 'Medium' : 'Low',
      score: km > 250 ? 78 : 62,
      seatsLeft: Math.max(2, Math.round(18 - km / 80)),
      bookingUrl: 'https://www.irctc.co.in/nget/train-search',
      reason: 'Lower fare option when seat availability is acceptable.',
    },
    {
      type: 'Cab',
      provider: 'Outstation cab',
      estimate: fare(km * 18 + 1800),
      confidence: 'High',
      score: km < 380 ? 86 : 70,
      seatsLeft: 4,
      bookingUrl: `https://www.makemytrip.com/cabs/${slug}`,
      reason: 'Best for door-to-door travel and custom stopovers.',
    },
    {
      type: 'Flight',
      provider: 'Domestic flight search',
      estimate: fare(km * 5.8 + 2200),
      confidence: km > 550 ? 'Medium' : 'Low',
      score: km > 700 ? 84 : 58,
      seatsLeft: Math.max(3, Math.round(21 - km / 90)),
      bookingUrl: 'https://www.makemytrip.com/flights/',
      reason: 'Fastest for long routes after airport transfers are included.',
    },
  ].sort((first, second) => second.score - first.score);

  res.json({
    source,
    destination,
    options,
    insight: {
      bestMode: options[0].type,
      fareTrend: km > 700 ? 'High' : km > 250 ? 'Normal' : 'Low',
      bookBy: km > 500 ? 'Book 5-7 days before travel.' : 'Book 24-48 hours before travel.',
      cancellation: 'Prefer refundable stays and flexible bus/cab tickets until the route is final.',
      alerts: [
        hours > 8 ? 'Plan a meal and fuel break.' : 'Same-day transfer is practical.',
        'Use official provider checkout for final payment and live availability.',
      ],
    },
  });
});

export default router;
