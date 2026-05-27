import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const destinations = [
  { id: 1, name: 'Paris', country: 'France', rating: 4.8, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
  { id: 2, name: 'Bali', country: 'Indonesia', rating: 4.9, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400' },
  { id: 3, name: 'Tokyo', country: 'Japan', rating: 4.7, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400' },
  { id: 4, name: 'New York', country: 'USA', rating: 4.6, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400' },
  { id: 5, name: 'Santorini', country: 'Greece', rating: 4.9, image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400' },
  { id: 6, name: 'Dubai', country: 'UAE', rating: 4.5, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400' },
];

export default function PopularDestinations() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white font-bold">Popular Destinations</h1>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {destinations.map((destination) => (
          <GlassCard
            key={destination.id}
            onClick={() => navigate(`/destination/${destination.id}`)}
            className="cursor-pointer flex items-center gap-4"
          >
            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold mb-1">{destination.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                {destination.country}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{destination.rating}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
