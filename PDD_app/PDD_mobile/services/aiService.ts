import { getBookingPlan } from './bookingService';
import { defaultTripPlan, mockPlaces, mockSafety } from './mockData';
import { getNearbyPlaces } from './locationService';
import { getRoute } from './routeService';
import { getWeather } from './weatherService';
import type { Place, SafetyInsight, TripPlan, WeatherSnapshot } from './types';

function safetyFromWeather(weather: WeatherSnapshot): SafetyInsight {
  const rainy = weather.rainChance > 55;
  const hot = weather.temperature > 34;
  const score = rainy || hot ? 68 : 84;
  return {
    ...mockSafety,
    score,
    status: score > 80 ? 'Good' : 'Caution',
    risks: [
      rainy ? 'Rain may slow route segments and outdoor activities' : 'Normal weather risk',
      hot ? 'High afternoon heat; schedule indoor breaks' : 'Comfortable daytime travel window',
      'Use verified transport and avoid isolated late-night transfers',
    ],
  };
}

function budgetForDistance(distanceMeters: number) {
  const km = distanceMeters / 1000;
  return {
    low: km * 9 + 3500,
    expected: km * 16 + 6500,
    premium: km * 34 + 14000,
  };
}

export async function generateTripPlan(source: Place, destination: Place): Promise<TripPlan> {
  const [route, weather, attractions, hotels, food, emergency] = await Promise.all([
    getRoute(source, destination),
    getWeather(destination.lat, destination.lon),
    getNearbyPlaces(destination.lat, destination.lon, 'tourism.sights'),
    getNearbyPlaces(destination.lat, destination.lon, 'accommodation.hotel'),
    getNearbyPlaces(destination.lat, destination.lon, 'catering.restaurant'),
    getNearbyPlaces(destination.lat, destination.lon, 'healthcare.hospital,service.vehicle.fuel,public_transport'),
  ]);

  const bookingPlan = await getBookingPlan(route, source.name, destination.name);

  const now = new Date();
  const startDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const endDate = new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000);
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  return {
    ...defaultTripPlan,
    id: `${source.id}-${destination.id}-${Date.now()}`,
    source: source.name,
    destination: destination.name,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    travelers: 2,
    status: 'upcoming',
    route,
    weather,
    safety: safetyFromWeather(weather),
    budget: budgetForDistance(route.distanceMeters),
    hotelStatus: 'Rooms available for vetted hotels',
    flightStatus: 'Search flights for the best connection',
    bestTime: weather.temperature > 32 ? 'Start before 6:30 AM and avoid outdoor plans from 12 PM to 3 PM.' : defaultTripPlan.bestTime,
    attractions: attractions.length ? attractions : defaultTripPlan.attractions,
    hotels: hotels.length ? hotels : mockPlaces.filter((place) => place.category === 'Hotel'),
    food: food.length ? food : mockPlaces.filter((place) => place.category === 'Restaurant'),
    emergency: emergency.length ? emergency : defaultTripPlan.emergency,
    transport: bookingPlan.options,
    booking: bookingPlan.insight,
  };
}

export function askAssistant(message: string, plan: TripPlan | null) {
  const text = message.toLowerCase();
  if (!plan) return 'Select a source and destination first. I can then build a route, budget, hotel, food, weather, and safety plan.';
  if (text.includes('night')) return `${plan.safety.nightAdvice} Safety score is ${plan.safety.score}/100.`;
  if (text.includes('food')) return `Try ${plan.food[0]?.name ?? 'a verified local restaurant'} first. Keep one backup near your hotel during peak hours.`;
  if (text.includes('bus') || text.includes('train') || text.includes('cab') || text.includes('flight')) return `${plan.booking.bestMode} is the current best mode. ${plan.booking.bookBy} ${plan.transport[0]?.reason ?? ''}`;
  if (text.includes('budget')) return `Expected budget is around Rs ${Math.round(plan.budget.expected).toLocaleString('en-IN')}. Budget range starts near Rs ${Math.round(plan.budget.low).toLocaleString('en-IN')}.`;
  if (text.includes('weather')) return `${plan.weather.city} is ${plan.weather.temperature} C with ${plan.weather.condition}. ${plan.weather.alert ?? 'No severe warning right now.'}`;
  return `For ${plan.source} to ${plan.destination}, I recommend ${plan.stayDuration}, daytime transfers, and booking hotels before arrival.`;
}
