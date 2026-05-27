import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const events = [
  { id: 1, name: 'Paris Jazz Festival', date: 'Jun 20', time: '8:00 PM', location: 'Parc Floral', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400' },
  { id: 2, name: 'Night at the Louvre', date: 'Jun 22', time: '7:00 PM', location: 'Louvre Museum', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400' },
  { id: 3, name: 'Bastille Day Fireworks', date: 'Jul 14', time: '11:00 PM', location: 'Eiffel Tower', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
];

export default function LocalEventsDiscovery() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Local Events</h1>
            <p className="text-white/80 text-sm">Discover happenings in Paris</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Music', 'Art', 'Food', 'Sports'].map((filter) => (
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

        {events.map((event) => (
          <GlassCard key={event.id} className="cursor-pointer">
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold mb-2">{event.name}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
