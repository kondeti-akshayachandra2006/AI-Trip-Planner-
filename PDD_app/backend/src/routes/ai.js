import express from 'express';
import { Trip } from '../models/Trip.js';
import { ChatHistory } from '../models/ChatHistory.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

function safeParseJSON(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function buildMockItinerary({ destination, days, budget, travelStyle, travelers }) {
  const dayCount = Math.max(1, Number(days) || 3);
  const styleTag = travelStyle ? travelStyle.toLowerCase() : 'balanced';
  const destinationTitle = destination ? destination : 'your destination';

  const baseActivities = [
    'city highlights tour',
    'local cultural experience',
    'signature dining experience',
    'relaxing scenic walk',
    'market exploration',
  ];

  return {
    destination: destinationTitle,
    days: dayCount,
    budget: budget || 'medium',
    travelStyle: travelStyle || 'Balanced',
    overview: `A ${dayCount}-day ${travelStyle || 'balanced'} trip to ${destinationTitle} carefully designed for ${travelers || '1'} traveler(s).`,
    itinerary: Array.from({ length: dayCount }, (_, index) => {
      const dayNumber = index + 1;
      const title = `${styleTag === 'luxury' ? 'Luxury' : styleTag === 'adventure' ? 'Adventure' : styleTag === 'budget' ? 'Smart' : 'Curated'} day in ${destinationTitle}`;
      return {
        dayNumber,
        title,
        summary: `Enjoy ${destinationTitle} with ${styleTag} choices and local recommendations for day ${dayNumber}.`,
        activities: [
          `Morning ${baseActivities[(index + 0) % baseActivities.length]}`,
          `Afternoon ${baseActivities[(index + 1) % baseActivities.length]}`,
          `Evening ${styleTag === 'luxury' ? 'dinner at a premium venue' : styleTag === 'budget' ? 'street food walk' : 'special local dinner'}`,
        ],
        image: `https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80&day=${dayNumber}`,
        weatherHint: `Expect mild weather with local variations on day ${dayNumber}.`,
      };
    }),
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
    const { destination, days, budget, preferences, travelStyle, travelers = 1 } = req.body;
    if (!destination) return res.status(400).json({ message: 'Destination is required' });

    const prompt = `Create a ${days}-day ${travelStyle || 'balanced'} travel itinerary for ${destination} for ${travelers} traveler(s) with a ${budget || 'moderate'} budget and preferences: ${Array.isArray(preferences) ? preferences.join(', ') : preferences}. Return JSON with destination, days, travelStyle, budget, overview, itinerary (dayNumber,title,summary,activities,image), and recommendations.`;

    let plan = null;
    let aiContent = null;

    try {
      aiContent = await callOpenAI(prompt);
      const parsed = safeParseJSON(aiContent || '');
      if (parsed && parsed.itinerary) {
        plan = parsed;
      }
    } catch (error) {
      console.warn('OpenAI itinerary fallback:', error.message);
    }

    if (!plan) {
      plan = buildMockItinerary({ destination, days, budget, travelStyle, travelers });
    }

    const trip = await Trip.create({
      userId: req.user.id,
      destination,
      days,
      travelStyle,
      budget,
      itinerary: plan.itinerary,
      title: `${travelStyle || 'Custom'} trip to ${destination}`,
      summary: plan.overview,
      recommendations: plan.recommendations,
      preferences,
      createdByAI: Boolean(aiContent),
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
