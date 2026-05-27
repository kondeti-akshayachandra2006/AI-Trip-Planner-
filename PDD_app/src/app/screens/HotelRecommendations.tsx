import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, DollarSign, Heart } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const hotels = [
  { id: 1, name: 'Hotel Plaza Athénée', location: 'Champs-Élysées', price: 450, rating: 4.9, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
  { id: 2, name: 'Le Meurice', location: 'Tuileries Garden', price: 380, rating: 4.8, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400' },
  { id: 3, name: 'Shangri-La Paris', location: 'Eiffel Tower Area', price: 520, rating: 5.0, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400' },
];

export default function HotelRecommendations() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Hotels in Paris</h1>
            <p className="text-white/80 text-sm">Jun 15-22, 2026</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Luxury', 'Budget', 'Near Attractions'].map((filter) => (
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

        {hotels.map((hotel) => (
          <GlassCard
            key={hotel.id}
            onClick={() => navigate(`/hotel/${hotel.id}`)}
            className="cursor-pointer"
          >
            <div className="flex gap-4">
              <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold">{hotel.name}</h3>
                  <button className="text-muted-foreground">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4" />
                  {hotel.location}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{hotel.rating}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-bold">${hotel.price}</div>
                    <div className="text-xs text-muted-foreground">per night</div>
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
