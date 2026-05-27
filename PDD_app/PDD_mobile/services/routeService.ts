import { env, hasKey } from '@/utils/env';
import { mockRoute } from './mockData';
import type { RouteSummary } from './types';
import { requestJson } from './http';

type OrsResponse = {
  features?: {
    properties?: {
      summary?: { distance: number; duration: number };
      segments?: { steps?: { instruction: string }[] }[];
    };
    geometry?: { coordinates?: number[][] };
  }[];
};

export async function getRoute(from: { lat: number; lon: number }, to: { lat: number; lon: number }): Promise<RouteSummary> {
  if (!hasKey('openRouteServiceKey')) {
    return mockRoute;
  }

  const data = await requestJson<OrsResponse>(
    'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
    {},
    {
      method: 'POST',
      headers: {
        Authorization: env.openRouteServiceKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coordinates: [[from.lon, from.lat], [to.lon, to.lat]], alternative_routes: { target_count: 2 } }),
    },
  );

  const summary = data.features?.[0]?.properties?.summary;
  const steps = data.features?.[0]?.properties?.segments?.flatMap((segment) => segment.steps?.map((step) => step.instruction) ?? []) ?? [];
  const coords = data.features?.[0]?.geometry?.coordinates?.map((c) => ({ lat: c[1], lon: c[0] }));

  return summary
    ? { distanceMeters: summary.distance, durationSeconds: summary.duration, transportMode: 'car', steps: steps.slice(0, 8), coordinates: coords }
    : mockRoute;
}
