import dotenv from 'dotenv';

dotenv.config();

const GEOAPIFY_KEY = process.env.GEOAPIFY_API_KEY;
const OPENWEATHER_KEY = process.env.OPENWEATHER_API_KEY;
const OPENROUTESERVICE_KEY = process.env.OPENROUTESERVICE_API_KEY;
const LOCATIONIQ_KEY = process.env.LOCATIONIQ_API_KEY;

async function fetchJson(url, init = {}) {
  const response = await fetch(url, init);
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Request failed ${response.status}: ${text}`);
  }
  return text ? JSON.parse(text) : null;
}

function normalizeGeocodeResult(data, query) {
  if (!data) return null;

  const feature = data?.features?.[0] ?? data?.results?.[0] ?? null;
  if (!feature) return null;

  if (feature.properties) {
    return {
      lat: Number(feature.properties.lat),
      lon: Number(feature.properties.lon),
      label: feature.properties.formatted || feature.properties.name || query,
    };
  }

  if (feature.lat != null && feature.lon != null) {
    return {
      lat: Number(feature.lat),
      lon: Number(feature.lon),
      label: feature.formatted || feature.display_name || feature.name || query,
    };
  }

  return null;
}

export async function geocodeLocation(query) {
  if (!query) return null;
  if (GEOAPIFY_KEY) {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&format=json&limit=1&apiKey=${GEOAPIFY_KEY}`;
    try {
      const data = await fetchJson(url);
      const normalized = normalizeGeocodeResult(data, query);
      if (normalized) return normalized;
    } catch (err) {
      console.warn('[tripApi] geocode fetch failed:', err instanceof Error ? err.message : String(err));
    }
  }

  if (LOCATIONIQ_KEY) {
    const url = `https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_KEY}&q=${encodeURIComponent(query)}&format=json&limit=1`;
    try {
      const data = await fetchJson(url);
      const item = Array.isArray(data) ? data[0] : data;
      if (item) {
        return { lat: Number(item.lat), lon: Number(item.lon), label: item.display_name || query };
      }
    } catch (err) {
      console.warn('[tripApi] locationiq geocode failed:', err instanceof Error ? err.message : String(err));
    }
  }

  return null;
}

function mapPlace(feature) {
  const props = feature.properties || {};
  return {
    name: props.name || props.address_line1 || props.formatted || 'Unknown place',
    address: props.address_line1 || props.formatted || '',
    category: props.categories || '',
    lat: props.lat,
    lon: props.lon,
    url: props.url || props.website || '',
    phone: props.phone || '',
    rating: props.rating || props.rate || null,
  };
}

export async function fetchGeoapifyPlaces({ lat, lon, category, limit = 8 }) {
  if (!lat || !lon || !GEOAPIFY_KEY) return [];
  const params = new URLSearchParams({
    categories: category,
    filter: `circle:${lon},${lat},15000`,
    bias: `proximity:${lon},${lat}`,
    limit: String(limit),
    apiKey: GEOAPIFY_KEY,
  });
  const url = `https://api.geoapify.com/v2/places?${params}`;
  const data = await fetchJson(url);
  return Array.isArray(data.features) ? data.features.map(mapPlace) : [];
}

export async function fetchWeather(lat, lon) {
  if (!lat || !lon || !OPENWEATHER_KEY) return null;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_KEY}`;
  const data = await fetchJson(url);
  return {
    summary: data.weather?.[0]?.description || 'No weather summary',
    temperature: data.main?.temp ?? null,
    feelsLike: data.main?.feels_like ?? null,
    humidity: data.main?.humidity ?? null,
    windSpeed: data.wind?.speed ?? null,
  };
}

export async function fetchRoute(source, destination) {
  if (!OPENROUTESERVICE_KEY || !source?.lat || !source?.lon || !destination?.lat || !destination?.lon) return null;
  const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
  const body = {
    coordinates: [
      [source.lon, source.lat],
      [destination.lon, destination.lat],
    ],
  };
  const data = await fetchJson(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: OPENROUTESERVICE_KEY,
    },
    body: JSON.stringify(body),
  });
  const route = data?.features?.[0];
  if (!route?.properties?.summary) return null;
  return {
    distanceKm: Number((route.properties.summary.distance / 1000).toFixed(1)),
    durationMinutes: Number((route.properties.summary.duration / 60).toFixed(0)),
    geometry: route.geometry,
  };
}
