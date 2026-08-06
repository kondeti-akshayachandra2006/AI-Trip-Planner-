import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, DollarSign, Share2, Download, Edit } from 'lucide-react';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';
import { fetchJson } from '../lib/api';

export default function GeneratedItineraryOverview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [trip, setTrip] = useState<any>(location.state?.trip || null);
  const [loading, setLoading] = useState(!trip);

  const { token } = useAuth();

  useEffect(() => {
    if (!trip && id) {
      fetchJson(`/trips/details/${id}`, {
        method: 'GET',
        authToken: token ?? undefined,
      })
        .then((data) => {
          setTrip(data.trip || data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id, trip, token]);

  if (loading) return <div className="p-10 text-center">Loading Itinerary...</div>;
  if (!trip) return <div className="p-10 text-center text-red-500">Trip not found or unavailable</div>;

  const itinerary = trip.itinerary || [];
  const attractions = trip.attractions || [];
  const hotels = trip.hotels || [];
  const food = trip.food || [];
  const recommendations = trip.recommendations || [];

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-white font-bold">{trip.title || trip.destination}</h1>
              <p className="text-white/80 text-sm">{itinerary.length} Days</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <GlassCard className="bg-white/20 border-white/30 text-center">
            <Calendar className="w-5 h-5 text-white mx-auto mb-1" />
            <p className="text-white text-sm">{itinerary.length} Days</p>
          </GlassCard>
          <GlassCard className="bg-white/20 border-white/30 text-center">
            <MapPin className="w-5 h-5 text-white mx-auto mb-1" />
            <p className="text-white text-sm">{trip.destination}</p>
          </GlassCard>
          <GlassCard className="bg-white/20 border-white/30 text-center">
            <DollarSign className="w-5 h-5 text-white mx-auto mb-1" />
            <p className="text-white text-sm">${trip.budget || '0'}</p>
          </GlassCard>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {trip.summary ? (
          <GlassCard className="p-4">
            <h2 className="font-bold mb-2">Trip Overview</h2>
            <p className="text-sm text-muted-foreground">{trip.summary}</p>
          </GlassCard>
        ) : null}

        {recommendations.length > 0 ? (
          <GlassCard className="p-4">
            <h2 className="font-bold mb-2">Recommendations</h2>
            <div className="space-y-2">
              {recommendations.map((item: any, index: number) => (
                <div key={index} className="rounded-2xl bg-muted p-3">
                  <p className="text-sm font-medium">{item.type}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        ) : null}

        {attractions.length > 0 ? (
          <GlassCard className="p-4">
            <h2 className="font-bold mb-2">Top Attractions</h2>
            <div className="grid grid-cols-2 gap-3">
              {attractions.map((attraction: any, index: number) => (
                <div key={index} className="rounded-2xl bg-muted p-3">
                  <p className="text-sm font-medium">{attraction.name}</p>
                  <p className="text-sm text-muted-foreground">{attraction.description}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        ) : null}

        {hotels.length > 0 ? (
          <GlassCard className="p-4">
            <h2 className="font-bold mb-2">Hotel Options</h2>
            <div className="space-y-2">
              {hotels.map((hotel: any, index: number) => (
                <div key={index} className="rounded-2xl bg-muted p-3">
                  <p className="text-sm font-medium">{hotel.name}</p>
                  <p className="text-sm text-muted-foreground">{hotel.rating} ★ • {hotel.price}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        ) : null}

        {food.length > 0 ? (
          <GlassCard className="p-4">
            <h2 className="font-bold mb-2">Food & Dining</h2>
            <div className="space-y-2">
              {food.map((dish: any, index: number) => (
                <div key={index} className="rounded-2xl bg-muted p-3">
                  <p className="text-sm font-medium">{dish.name}</p>
                  <p className="text-sm text-muted-foreground">{dish.cuisine} • {dish.price}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        ) : null}

        <div className="flex items-center justify-between">
          <h2 className="font-bold">Day-by-Day Plan</h2>
          <button className="text-primary text-sm flex items-center gap-1">
            <Edit className="w-4 h-4" />
            Customize
          </button>
        </div>

        {itinerary.map((day: any) => (
          <GlassCard
            key={day.id || day.dayNumber}
            onClick={() => navigate(`/itinerary/${id}/day/${day.dayNumber}`, { state: { dayData: day } })}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-muted">
                <img
                  src={day.image || `https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80&${day.dayNumber}`}
                  alt={day.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm text-primary font-medium mb-1">Day {day.dayNumber}</div>
                <h3 className="font-bold mb-1">{day.title || `Exploring ${trip.destination}`}</h3>
                <p className="text-sm text-muted-foreground">
                  {Array.isArray(day.activities) ? day.activities.length : 0} activities
                </p>
              </div>
            </div>
          </GlassCard>
        ))}

        {trip.route ? (
          <GlassCard className="p-4">
            <h2 className="font-bold mb-2">Route & Transport</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Distance: <strong>{trip.route.distanceKm ?? '—'} km</strong></p>
                <p className="text-sm">Estimated time: <strong>{trip.route.durationMinutes ?? '—'} min</strong></p>
                <p className="text-sm">Transport suggestions: <strong>{Array.isArray(trip.transport) && trip.transport.length ? trip.transport.map((t:any)=>t.type).join(', ') : 'Public transport, taxi, rideshare'}</strong></p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="md" onClick={() => navigate('/map', { state: { trip } })}>
                  View Map
                </Button>
                <Button variant="gradient" size="md" onClick={() => navigate('/hotels')}>
                  Book Hotels
                </Button>
              </div>
            </div>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-2 gap-3 pt-4">
            <Button variant="outline" size="lg" onClick={() => navigate('/map')}>
              View Map
            </Button>
            <Button variant="gradient" size="lg" onClick={() => navigate('/hotels')}>
              Book Hotels
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
