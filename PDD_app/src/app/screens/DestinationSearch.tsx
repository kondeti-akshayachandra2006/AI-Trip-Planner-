import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, MapPin } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const trendingDestinations = [
  { id: 1, name: 'Paris, France', category: 'City Break', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
  { id: 2, name: 'Bali, Indonesia', category: 'Beach Paradise', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400' },
  { id: 3, name: 'Tokyo, Japan', category: 'Culture & Food', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400' },
  { id: 4, name: 'New York, USA', category: 'Urban Adventure', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400' },
];

export default function DestinationSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <h1 className="text-white font-bold text-2xl mb-6">Explore Destinations</h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="font-bold">Trending Now</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {trendingDestinations.map((destination) => (
            <GlassCard
              key={destination.id}
              onClick={() => navigate(`/destination/${destination.id}`)}
              className="cursor-pointer p-0 overflow-hidden"
            >
              <div className="h-32 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm">{destination.name}</h3>
                    <p className="text-xs text-muted-foreground">{destination.category}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <button
          onClick={() => navigate('/popular')}
          className="w-full text-center text-primary mt-6"
        >
          View All Destinations
        </button>
      </div>
    </div>
  );
}
