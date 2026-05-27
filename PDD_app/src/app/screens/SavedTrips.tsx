import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Plus } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

const trips = [
  { id: 1, destination: 'Paris, France', dates: 'Jun 15-22, 2026', status: 'Upcoming', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
  { id: 2, destination: 'Tokyo, Japan', dates: 'Aug 5-15, 2026', status: 'Planning', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400' },
  { id: 3, destination: 'New York, USA', dates: 'Mar 10-17, 2026', status: 'Completed', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400' },
];

export default function SavedTrips() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-white font-bold">My Trips</h1>
              <p className="text-white/80 text-sm">{trips.length} trips</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/create-trip')}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex gap-2 overflow-x-auto pb-4">
          {['All', 'Upcoming', 'Planning', 'Completed'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                filter === 'All'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {trips.map((trip) => (
            <GlassCard
              key={trip.id}
              onClick={() => navigate(`/itinerary/${trip.id}`)}
              className="cursor-pointer"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold">{trip.destination}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      trip.status === 'Upcoming' ? 'bg-green-500/10 text-green-500' :
                      trip.status === 'Planning' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {trip.dates}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <Button
          variant="outline"
          size="lg"
          className="w-full mt-6"
          onClick={() => navigate('/create-trip')}
        >
          <Plus className="w-5 h-5" />
          Plan New Trip
        </Button>
      </div>
    </div>
  );
}
