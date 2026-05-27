import type { BookingInsight, RouteSummary, TransportOption } from './types';
import { apiClient } from '@/api/client';

function fare(value: number) {
  return `Rs ${Math.max(80, Math.round(value)).toLocaleString('en-IN')}`;
}

function hourLabel(offsetHours: number) {
  const value = new Date(Date.now() + offsetHours * 60 * 60 * 1000);
  return value.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export function buildTransportOptions(route: RouteSummary, source: string, destination: string): TransportOption[] {
  const km = Math.max(1, route.distanceMeters / 1000);
  const longRoute = km > 450;
  const overnight = km > 650;
  const slug = `${source}-to-${destination}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const options: TransportOption[] = [
    {
      type: 'Bus',
      provider: longRoute ? 'Sleeper Volvo partner' : 'Premium AC coach',
      departure: hourLabel(overnight ? 21 : 7),
      arrival: hourLabel(overnight ? 32 : Math.max(10, Math.round(route.durationSeconds / 3600) + 7)),
      estimate: fare(km * 2.4 + 450),
      confidence: 'High',
      bookingUrl: `https://www.makemytrip.com/bus-tickets/${slug}.html`,
      seatsLeft: Math.max(6, Math.round(34 - km / 35)),
      score: longRoute ? 88 : 82,
      reason: longRoute ? 'Best value for overnight travel with fewer transfers.' : 'Cheapest direct option for this distance.',
    },
    {
      type: 'Train',
      provider: 'IRCTC rail route',
      departure: hourLabel(overnight ? 20 : 9),
      arrival: hourLabel(overnight ? 35 : Math.max(13, Math.round(route.durationSeconds / 3600) + 10)),
      estimate: fare(km * 1.7 + 300),
      confidence: km > 250 ? 'Medium' : 'Low',
      bookingUrl: 'https://www.irctc.co.in/nget/train-search',
      seatsLeft: Math.max(2, Math.round(18 - km / 80)),
      score: km > 250 ? 78 : 62,
      reason: 'Useful when you prefer predictable stations and lower fares.',
    },
    {
      type: 'Cab',
      provider: 'Outstation cab',
      departure: 'Any time',
      arrival: `${Math.max(1, Math.round(route.durationSeconds / 3600))}h ${Math.round((route.durationSeconds % 3600) / 60)}m`,
      estimate: fare(km * 18 + 1800),
      confidence: 'High',
      bookingUrl: `https://www.makemytrip.com/cabs/${slug}`,
      seatsLeft: 4,
      score: km < 380 ? 86 : 70,
      reason: 'Door-to-door convenience with flexible stops for food, fuel, and safety breaks.',
    },
    {
      type: 'Flight',
      provider: 'Domestic flight search',
      departure: hourLabel(6),
      arrival: hourLabel(9),
      estimate: fare(km * 5.8 + 2200),
      confidence: km > 550 ? 'Medium' : 'Low',
      bookingUrl: 'https://www.makemytrip.com/flights/',
      seatsLeft: Math.max(3, Math.round(21 - km / 90)),
      score: km > 700 ? 84 : 58,
      reason: 'Fastest choice for long routes after airport transfer time is considered.',
    },
    {
      type: 'Local',
      provider: 'Metro, auto, and local bus',
      departure: 'Every 10-20m',
      arrival: 'Varies',
      estimate: 'Rs 80-450',
      confidence: 'Medium',
      score: 72,
      reason: 'Use for first-mile and last-mile movement near stations, hotels, and attractions.',
    },
  ];

  return options.sort((first, second) => second.score - first.score);
}

export function buildBookingInsight(options: TransportOption[], route: RouteSummary): BookingInsight {
  const best = options[0];
  const km = route.distanceMeters / 1000;
  return {
    bestMode: best.type,
    fareTrend: km > 700 ? 'High' : km > 250 ? 'Normal' : 'Low',
    bookBy: km > 500 ? 'Book 5-7 days before travel for better sleeper/train fares.' : 'Book 24-48 hours before travel unless it is a weekend.',
    cancellation: 'Prefer refundable hotel rooms and free-cancellation buses/cabs until the route is confirmed.',
    alerts: [
      best.seatsLeft && best.seatsLeft < 8 ? `${best.provider} has limited seats left.` : `${best.provider} is currently the strongest option.`,
      route.durationSeconds > 8 * 3600 ? 'Add one meal break and one fuel or rest stop on this route.' : 'This route is comfortable as a same-day transfer.',
      'Compare final prices in MakeMyTrip, IRCTC, or provider checkout before payment.',
    ],
  };
}

export async function getBookingPlan(route: RouteSummary, source: string, destination: string) {
  const fallbackOptions = buildTransportOptions(route, source, destination);
  const fallback = {
    options: fallbackOptions,
    insight: buildBookingInsight(fallbackOptions, route),
  };

  return apiClient('/bookings/options', fallback, {
    method: 'POST',
    body: JSON.stringify({
      source,
      destination,
      distanceMeters: route.distanceMeters,
      durationSeconds: route.durationSeconds,
    }),
  });
}
