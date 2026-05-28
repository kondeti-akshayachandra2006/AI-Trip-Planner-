import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation, Search, Loader2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import Button from '../components/Button';

const DEFAULT_PLACES = [
  { id: 'paris', name: 'Paris, France', address: 'Champs-Élysées, Paris', lat: 48.8566, lon: 2.3522 },
  { id: 'tokyo', name: 'Tokyo, Japan', address: 'Shibuya, Tokyo', lat: 35.6762, lon: 139.6503 },
  { id: 'goa', name: 'Goa, India', address: 'Calangute Beach', lat: 15.4909, lon: 73.8278 },
  { id: 'nyc', name: 'New York, USA', address: 'Central Park, New York City', lat: 40.7851, lon: -73.9683 },
  { id: 'sydney', name: 'Sydney, Australia', address: 'Sydney Opera House', lat: -33.8688, lon: 151.2093 },
];

type Place = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
};

const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY ?? '';

function buildMapUrl(place: Place) {
  const { lat, lon } = place;
  if (GEOAPIFY_KEY) {
    return `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=1300&height=900&center=${lon},${lat}&zoom=12&marker=${lon},${lat};type:awesome;color:%23ff4f4f&apiKey=${GEOAPIFY_KEY}`;
  }
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=12&size=900x600&markers=${lat},${lon},red-pushpin`;
}

export default function InteractiveMapView() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Place[]>(DEFAULT_PLACES);
  const [selectedPlace, setSelectedPlace] = useState<Place>(DEFAULT_PLACES[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const trimmed = query.trim();

    if (!trimmed) {
      setSuggestions(DEFAULT_PLACES);
      setError('');
      setLoading(false);
      return () => controller.abort();
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        if (!GEOAPIFY_KEY) {
          const filtered = DEFAULT_PLACES.filter((place) =>
            place.name.toLowerCase().includes(trimmed.toLowerCase()) ||
            place.address.toLowerCase().includes(trimmed.toLowerCase()),
          );
          setSuggestions(filtered.length ? filtered : DEFAULT_PLACES);
        } else {
          const response = await fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(trimmed)}&limit=6&apiKey=${GEOAPIFY_KEY}`,
            { signal: controller.signal },
          );
          const data = await response.json();
          const places = (data.features ?? []).map((feature: any, index: number) => ({
            id: feature.properties.place_id ?? `${trimmed}-${index}`,
            name: feature.properties.name ?? feature.properties.formatted ?? trimmed,
            address: feature.properties.formatted ?? 'Suggested destination',
            lat: feature.properties.lat,
            lon: feature.properties.lon,
          }));
          setSuggestions(places.length ? places : DEFAULT_PLACES);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError('Location search unavailable. Showing demo locations.');
          setSuggestions(DEFAULT_PLACES);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 350);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const mapUrl = useMemo(() => buildMapUrl(selectedPlace), [selectedPlace]);

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/10" />

      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-card shadow-lg rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button className="w-10 h-10 bg-primary shadow-lg rounded-full flex items-center justify-center">
          <Navigation className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="absolute top-24 left-6 right-6 z-20">
        <GlassCard className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-lg font-bold">Destination search</h2>
              <p className="text-sm text-muted-foreground">Find any place and pin it on the map.</p>
            </div>
          </div>
          <Input
            placeholder="Search cities, landmarks, or destinations"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<Search className="w-5 h-5" />}
            className="mb-3"
          />
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Searching...
            </div>
          )}
          {error ? <div className="text-sm text-red-500 mt-2">{error}</div> : null}
          <div className="mt-3 grid gap-2">
            {suggestions.slice(0, 5).map((place) => (
              <button
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                className={`w-full text-left rounded-2xl px-4 py-3 border ${selectedPlace.id === place.id ? 'border-primary bg-primary/10' : 'border-border bg-card'} transition`}
              >
                <div className="font-semibold">{place.name}</div>
                <div className="text-sm text-muted-foreground">{place.address}</div>
              </button>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="absolute inset-0 top-56 z-0">
        <img src={mapUrl} alt="Map preview" className="h-full w-full object-cover" />
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-20">
        <GlassCard>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{selectedPlace.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedPlace.address}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm text-muted-foreground mb-4">
            <div className="rounded-2xl bg-slate-900/60 p-3 text-white">
              Lat {selectedPlace.lat.toFixed(4)}
            </div>
            <div className="rounded-2xl bg-slate-900/60 p-3 text-white">
              Lon {selectedPlace.lon.toFixed(4)}
            </div>
            <div className="rounded-2xl bg-slate-900/60 p-3 text-white">
              {GEOAPIFY_KEY ? 'Live map' : 'OSM fallback'}
            </div>
          </div>
          <Button variant="gradient" size="lg" className="w-full" onClick={() => {}}>
            Select location
          </Button>
        </GlassCard>
      </div>
    </div>
  );
}
