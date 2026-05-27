import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, Star } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const wishlistItems = [
  { id: 1, name: 'Santorini', country: 'Greece', rating: 4.9, image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400', type: 'Destination' },
  { id: 2, name: 'Hotel Plaza Athénée', location: 'Paris', rating: 4.8, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', type: 'Hotel' },
  { id: 3, name: 'Machu Picchu Trek', location: 'Peru', rating: 5.0, image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400', type: 'Activity' },
];

export default function WishlistScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Wishlist</h1>
            <p className="text-white/80 text-sm">{wishlistItems.length} saved</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex gap-2 overflow-x-auto pb-4">
          {['All', 'Destinations', 'Hotels', 'Activities'].map((filter) => (
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
          {wishlistItems.map((item) => (
            <GlassCard key={item.id} className="cursor-pointer">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold mb-1">{item.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {'country' in item ? item.country : item.location}
                      </div>
                    </div>
                    <button className="text-red-500">
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-sm">{item.rating}</span>
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
