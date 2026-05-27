import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, DollarSign, MapPin } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const restaurants = [
  { id: 1, name: 'Le Jules Verne', cuisine: 'French Fine Dining', price: '$$$', rating: 4.8, image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400' },
  { id: 2, name: 'L\'Ami Jean', cuisine: 'Bistro', price: '$$', rating: 4.7, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400' },
  { id: 3, name: 'Septime', cuisine: 'Modern French', price: '$$$', rating: 4.9, image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400' },
];

export default function RestaurantRecommendations() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Restaurants</h1>
            <p className="text-white/80 text-sm">Best dining in Paris</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'French', 'Italian', 'Asian', 'Cafés'].map((filter) => (
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

        {restaurants.map((restaurant) => (
          <GlassCard key={restaurant.id} className="cursor-pointer">
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold mb-1">{restaurant.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{restaurant.cuisine}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-sm">{restaurant.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{restaurant.price}</div>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
