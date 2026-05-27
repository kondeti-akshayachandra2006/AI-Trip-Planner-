export type Place = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  category: string;
  rating?: number;
  price?: string;
  openNow?: boolean;
};

export type WeatherSnapshot = {
  city: string;
  condition: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  rainChance: number;
  sunrise: string;
  sunset: string;
  airQuality: string;
  alert?: string;
};

export type RouteSummary = {
  distanceMeters: number;
  durationSeconds: number;
  transportMode: 'car' | 'foot' | 'bike' | 'public';
  encodedPolyline?: string;
  steps: string[];
  coordinates?: { lat: number; lon: number }[];
};

export type SafetyInsight = {
  score: number;
  status: 'Excellent' | 'Good' | 'Caution' | 'Risky';
  dayAdvice: string;
  nightAdvice: string;
  risks: string[];
};

export type TransportOption = {
  type: 'Bus' | 'Train' | 'Cab' | 'Flight' | 'Local';
  provider: string;
  departure: string;
  arrival: string;
  estimate: string;
  confidence: 'High' | 'Medium' | 'Low';
  bookingUrl?: string;
  seatsLeft?: number;
  score: number;
  reason: string;
};

export type BookingInsight = {
  bestMode: TransportOption['type'];
  fareTrend: 'Low' | 'Normal' | 'High';
  bookBy: string;
  cancellation: string;
  alerts: string[];
};

export type TripStatus = 'upcoming' | 'active' | 'completed';

export type TripPlan = {
  id: string;
  source: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  status: TripStatus;
  route: RouteSummary;
  weather: WeatherSnapshot;
  safety: SafetyInsight;
  budget: { low: number; expected: number; premium: number };
  bestTime: string;
  stayDuration: string;
  crowd: string;
  hotelStatus: string;
  flightStatus: string;
  attractions: Place[];
  hotels: Place[];
  food: Place[];
  emergency: Place[];
  transport: TransportOption[];
  booking: BookingInsight;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  favorites: string[];
  preferences: string[];
  savedTrips: number;
  upcomingTrips: number;
  completedTrips: number;
  joinedAt: string;
};
