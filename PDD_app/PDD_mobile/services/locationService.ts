import { env, hasKey } from '@/utils/env';
import { mockPlaces } from './mockData';
import type { Place } from './types';
import { requestJson } from './http';

type GeoapifyFeature = {
  properties: {
    place_id?: string;
    name?: string;
    formatted?: string;
    lat: number;
    lon: number;
    categories?: string[];
    distance?: number;
  };
};

export async function searchPlaces(query: string): Promise<Place[]> {
  if (!query.trim() || !hasKey('geoapifyKey')) {
    return mockPlaces;
  }

  const data = await requestJson<{ features: GeoapifyFeature[] }>(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&limit=8&apiKey=${env.geoapifyKey}`,
    { features: [] },
  );

  return data.features.map((feature, index) => ({
    id: feature.properties.place_id ?? `${query}-${index}`,
    name: feature.properties.name ?? feature.properties.formatted ?? query,
    address: feature.properties.formatted ?? 'Suggested place',
    lat: feature.properties.lat,
    lon: feature.properties.lon,
    category: 'Place',
  }));
}

export async function getNearbyPlaces(lat: number, lon: number, category = 'tourism.sights'): Promise<Place[]> {
  if (!hasKey('geoapifyKey')) {
    return mockPlaces;
  }

  const data = await requestJson<{ features: GeoapifyFeature[] }>(
    `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lon},${lat},9000&bias=proximity:${lon},${lat}&limit=12&apiKey=${env.geoapifyKey}`,
    { features: [] },
  );

  const places = data.features.map((feature, index) => ({
    id: feature.properties.place_id ?? `${category}-${index}`,
    name: feature.properties.name ?? 'Nearby place',
    address: feature.properties.formatted ?? `${feature.properties.distance ?? 0}m away`,
    lat: feature.properties.lat,
    lon: feature.properties.lon,
    category: feature.properties.categories?.[0]?.split('.').at(-1) ?? 'Nearby',
    rating: 4 + (index % 8) / 10,
    openNow: true,
  }));

  return places.length ? places : mockPlaces;
}
