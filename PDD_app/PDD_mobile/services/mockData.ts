import type { Place, RouteSummary, SafetyInsight, TripPlan, WeatherSnapshot } from './types';

export const categories = ['Solo', 'Family', 'Adventure', 'Budget', 'Luxury', 'Beaches', 'Hill stations', 'Religious'];

export const popularDestinations: Place[] = [
  { id: 'goa', name: 'Goa Beaches', address: 'North Goa, India', lat: 15.516, lon: 73.762, category: 'Beach', rating: 4.8, price: 'Rs Rs' },
  { id: 'munnar', name: 'Munnar Hills', address: 'Kerala, India', lat: 10.0889, lon: 77.0595, category: 'Hill station', rating: 4.7, price: 'Rs Rs' },
  { id: 'jaipur', name: 'Jaipur Heritage Walk', address: 'Rajasthan, India', lat: 26.9124, lon: 75.7873, category: 'Culture', rating: 4.6, price: 'Rs Rs' },
  { id: 'varanasi', name: 'Varanasi Ghats', address: 'Uttar Pradesh, India', lat: 25.3176, lon: 82.9739, category: 'Religious', rating: 4.9, price: 'Rs' },
];

export const mockPlaces: Place[] = [
  { id: 'hotel-1', name: 'Azure Bay Suites', address: '1.4 km from destination', lat: 15.52, lon: 73.77, category: 'Hotel', rating: 4.5, price: 'Rs 4,200/night', openNow: true },
  { id: 'food-1', name: 'Coastal Spice Kitchen', address: 'Open till 11:30 PM', lat: 15.518, lon: 73.765, category: 'Restaurant', rating: 4.6, price: 'Rs Rs', openNow: true },
  { id: 'hospital-1', name: 'City Care Hospital', address: '24x7 emergency care', lat: 15.51, lon: 73.754, category: 'Hospital', rating: 4.2, openNow: true },
  { id: 'fuel-1', name: 'Highway Fuel Point', address: 'On fastest route', lat: 15.49, lon: 73.75, category: 'Fuel', rating: 4.1, openNow: true },
  { id: 'stop-1', name: 'Central Bus Terminal', address: 'Bus, cab, auto available', lat: 15.505, lon: 73.759, category: 'Transport', rating: 4.0, openNow: true },
];

export const mockWeather: WeatherSnapshot = {
  city: 'Destination',
  condition: 'Partly cloudy',
  temperature: 28,
  humidity: 71,
  windSpeed: 12,
  uvIndex: 6,
  rainChance: 38,
  sunrise: '06:07',
  sunset: '18:49',
  airQuality: 'Moderate',
  alert: 'Carry rain protection after 5 PM.',
};

export const mockRoute: RouteSummary = {
  distanceMeters: 587000,
  durationSeconds: 31400,
  transportMode: 'car',
  encodedPolyline: '',
  steps: ['Start from your selected source', 'Take the fastest highway corridor', 'Stop at verified food and fuel points', 'Arrive near destination city center'],
};

export const mockSafety: SafetyInsight = {
  score: 82,
  status: 'Good',
  dayAdvice: 'Day travel is recommended for scenic stops and lower navigation risk.',
  nightAdvice: 'Avoid isolated road segments after 10 PM; prefer main highways and pre-booked stays.',
  risks: ['Moderate evening rain chance', 'High tourist crowd near central attractions', 'Limited late-night public transport'],
};

export const defaultTripPlan: TripPlan = {
  id: 'demo-trip',
  source: 'Hyderabad',
  destination: 'Goa',
  startDate: '2025-11-14',
  endDate: '2025-11-18',
  travelers: 2,
  status: 'upcoming',
  route: mockRoute,
  weather: mockWeather,
  safety: mockSafety,
  budget: { low: 8500, expected: 14200, premium: 28500 },
  bestTime: 'October to March; start before 7 AM for cooler driving hours.',
  stayDuration: '3 to 4 days',
  crowd: 'Moderate on weekdays, heavy around beaches on weekends.',
  hotelStatus: 'Available rooms listed',
  flightStatus: 'No direct flight booked',
  attractions: popularDestinations,
  hotels: mockPlaces.filter((place) => place.category === 'Hotel'),
  food: mockPlaces.filter((place) => place.category === 'Restaurant'),
  emergency: mockPlaces.filter((place) => ['Hospital', 'Fuel', 'Transport'].includes(place.category)),
  transport: [
    { type: 'Bus', provider: 'Intercity Volvo', departure: '07:30', arrival: '18:45', estimate: 'Rs 1,400', confidence: 'High', bookingUrl: 'https://www.makemytrip.com/bus-tickets/', seatsLeft: 12, score: 88, reason: 'Best value for this route.' },
    { type: 'Train', provider: 'Konkan Express', departure: '21:10', arrival: '10:20', estimate: 'Rs 980', confidence: 'Medium', bookingUrl: 'https://www.irctc.co.in/nget/train-search', seatsLeft: 7, score: 80, reason: 'Low fare, check availability.' },
    { type: 'Cab', provider: 'Outstation cab', departure: 'Anytime', arrival: '9h 10m', estimate: 'Rs 12,500', confidence: 'High', bookingUrl: 'https://www.makemytrip.com/cabs/', seatsLeft: 4, score: 76, reason: 'Most flexible door-to-door option.' },
    { type: 'Local', provider: 'Local transfer', departure: 'Every 15m', arrival: 'Varies', estimate: 'Rs 60-Rs 240', confidence: 'Medium', score: 72, reason: 'Useful near hotels and stations.' },
  ],
  booking: {
    bestMode: 'Bus',
    fareTrend: 'Normal',
    bookBy: 'Book 3-5 days before travel for better sleeper fares.',
    cancellation: 'Choose refundable rooms and flexible bus tickets until weather is stable.',
    alerts: ['Sleeper buses are the best value right now.', 'Add one meal break on the route.', 'Compare checkout prices before payment.'],
  },
};
