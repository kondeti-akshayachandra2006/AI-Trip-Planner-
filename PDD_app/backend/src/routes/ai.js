import express from 'express';
import { Trip } from '../models/Trip.js';
import { ChatHistory } from '../models/ChatHistory.js';
import { requireAuth } from '../middleware/auth.js';
import { geocodeLocation, fetchGeoapifyPlaces, fetchWeather, fetchRoute } from '../services/tripApi.js';

const router = express.Router();

function safeParseJSON(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function buildMockItinerary({ destination, days, budget, travelStyle, travelers, attractions = [], restaurants = [] }) {
  const dayCount = Math.max(1, Number(days) || 3);
  const styleTag = travelStyle ? travelStyle.toLowerCase() : 'balanced';
  const destinationTitle = destination ? destination : 'your destination';

  return {
    destination: destinationTitle,
    days: dayCount,
    budget: budget || 'medium',
    travelStyle: travelStyle || 'Balanced',
    overview: `A ${dayCount}-day ${travelStyle || 'balanced'} trip to ${destinationTitle} carefully designed for ${travelers || '1'} traveler(s).`,
    itinerary: Array.from({ length: dayCount }, (_, index) => {
      const dayNumber = index + 1;
      const attraction = attractions[index] || attractions[index % attractions.length] || { name: `${destinationTitle} highlights` };
      const restaurant = restaurants[index] || restaurants[index % restaurants.length] || { name: `${destinationTitle} local eatery` };
      const title = `${styleTag === 'luxury' ? 'Luxury' : styleTag === 'adventure' ? 'Adventure' : styleTag === 'budget' ? 'Smart' : 'Curated'} day in ${destinationTitle}`;
      return {
        dayNumber,
        title,
        summary: `Explore ${destinationTitle} with ${styleTag} experiences, including ${attraction.name} and ${restaurant.name}.`,
        activities: [
          `Morning visit to ${attraction.name}`,
          `Lunch or snacks at ${restaurant.name}`,
          `Evening local walk and nightlife discovery`,
        ],
        image: `https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80&day=${dayNumber}`,
        weatherHint: `Expect mild weather with local variations on day ${dayNumber}.`,
      };
    }),
    attractions: attractions.slice(0, Math.min(4, attractions.length)) || Array.from({ length: Math.min(4, dayCount) }, (_, index) => ({
      name: `${destinationTitle} Attraction ${index + 1}`,
      description: `A must-see experience in ${destinationTitle}.`,
    })),
    hotels: [
      { name: `${destinationTitle} Central Hotel`, rating: 4.7, price: '$160/night' },
      { name: `${destinationTitle} Comfort Suites`, rating: 4.4, price: '$105/night' },
    ],
    food: restaurants.slice(0, Math.min(4, restaurants.length)) || [
      { name: `${destinationTitle} Bistro`, cuisine: 'Local cuisine', price: '$$$' },
      { name: `Street food market`, cuisine: 'Street food', price: '$' },
    ],
    transport: [
      { type: 'Public transit', detail: 'Use local metro and buses for most city travel.' },
      { type: 'Airport transfer', detail: 'Book a shared transfer to save cost.' },
    ],
    weather: {
      summary: `Mostly pleasant weather with some local variations.`,
    },
    safety: {
      tips: [`Keep your valuables secure`, `Use official taxis or rideshares after dark`],
    },
    recommendations: [
      { type: 'Hotels', detail: `Choose hotels that match a ${styleTag} stay profile.` },
      { type: 'Transport', detail: 'Use public transit during the day and premium transfers for airport journeys.' },
      { type: 'Packing', detail: 'Pack layers, comfortable shoes, and travel documents in a secure travel wallet.' },
    ],
  };
}
async function callOpenAI(prompt, history = []) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const messages = [
    {
      role: 'system',
      content: 'You are a travel planning assistant. Return valid JSON when asked for itineraries and travel recommendations.',
    },
    ...history,
    { role: 'user', content: prompt },
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages,
      temperature: 0.8,
      max_tokens: 800,
    }),
  });

  if (!response.ok) {
    const failure = await response.text();
    throw new Error(`OpenAI request failed: ${failure}`);
  }

  const payload = await response.json();
  return payload.choices?.[0]?.message?.content || null;
}

router.post('/generate-trip', requireAuth, async (req, res) => {
  try {
    const { destination, source, days, budget, preferences, travelStyle, travelers = 1, startDate, endDate } = req.body;
    // Debug: log incoming request and API key availability
    try {
      // eslint-disable-next-line no-console
      console.log('[ai] generate-trip payload:', JSON.stringify({ destination, source, days }).slice(0, 200));
      // eslint-disable-next-line no-console
      console.log('[ai] GEOAPIFY_KEY present:', Boolean(process.env.GEOAPIFY_API_KEY));
      // eslint-disable-next-line no-console
      console.log('[ai] LOCATIONIQ_KEY present:', Boolean(process.env.LOCATIONIQ_API_KEY));
    } catch (e) {}
    if (!destination) return res.status(400).json({ message: 'Destination is required' });

    const destinationLocation = await geocodeLocation(destination);
    if (!destinationLocation) {
      return res.status(400).json({ message: 'Could not determine destination coordinates' });
    }

    const sourceLocation = source ? await geocodeLocation(source) : null;
    const [weather, attractions, hotels, restaurants, route] = await Promise.all([
      fetchWeather(destinationLocation.lat, destinationLocation.lon),
      fetchGeoapifyPlaces({ lat: destinationLocation.lat, lon: destinationLocation.lon, category: 'tourism.sights', limit: 6 }),
      fetchGeoapifyPlaces({ lat: destinationLocation.lat, lon: destinationLocation.lon, category: 'accommodation.hotel', limit: 6 }),
      fetchGeoapifyPlaces({ lat: destinationLocation.lat, lon: destinationLocation.lon, category: 'catering.restaurant', limit: 8 }),
      sourceLocation ? fetchRoute(sourceLocation, destinationLocation) : null,
    ]);

    const plan = buildMockItinerary({
      destination: destinationLocation.label,
      days,
      budget,
      travelStyle,
      travelers,
      attractions,
      restaurants,
    });

    plan.weather = weather || plan.weather;
    plan.route = route || null;
    plan.hotels = hotels.length ? hotels.slice(0, 4) : plan.hotels;
    plan.food = restaurants.length ? restaurants.slice(0, 4) : plan.food;
    plan.attractions = attractions.length ? attractions.slice(0, 4) : plan.attractions;
    plan.recommendations = [
      { type: 'Best hotel picks', detail: hotels.length ? `Top local hotels include ${hotels.slice(0, 3).map((hotel) => hotel.name).join(', ')}.` : 'Choose centrally located hotels for easy sightseeing.' },
      { type: 'Top restaurants', detail: restaurants.length ? `Try ${restaurants.slice(0, 3).map((rest) => rest.name).join(', ')} for local flavor.` : 'Use Geoapify places or local guides for best dining.' },
      { type: 'Route advice', detail: route ? `Estimated travel time is ${route.durationMinutes} minutes.` : 'Plan your local transport in advance for smooth travel.' },
    ];

    const trip = await Trip.create({
      userId: req.user.id,
      source: source || '',
      sourceCoords: sourceLocation || {},
      destination: destinationLocation.label,
      destinationCoords: destinationLocation,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      days,
      travelStyle,
      budget,
      itinerary: plan.itinerary,
      title: `${travelStyle || 'Custom'} trip to ${destinationLocation.label}`,
      summary: plan.overview,
      recommendations: plan.recommendations,
      attractions: plan.attractions,
      hotels: plan.hotels,
      food: plan.food,
      transport: plan.transport,
      weather: plan.weather,
      route,
      safety: plan.safety,
      plan,
      preferences,
      createdByAI: false,
    });

    res.status(201).json({ id: trip._id.toString(), trip });
  } catch (error) {
    res.status(500).json({ message: 'Trip generation failed', detail: error.message });
  }
});

router.post('/chat', requireAuth, async (req, res) => {
  try {
    const { prompt, history = [] } = req.body;
    if (!prompt) return res.status(400).json({ message: 'Prompt is required' });

    const content = await callOpenAI(prompt, history);
    const output = content || 'I’m sorry, I couldn’t reach the assistant right now. Please try again soon.';

    const record = await ChatHistory.findOneAndUpdate(
      { userId: req.user.id },
      {
        $push: {
          messages: [
            { role: 'user', text: prompt },
            { role: 'assistant', text: output },
          ],
        },
      },
      { upsert: true, new: true },
    );

    res.json({ answer: output, history: record.messages });
  } catch (error) {
    res.status(500).json({ message: 'AI chat failed', detail: error.message });
  }
});

export default router;
