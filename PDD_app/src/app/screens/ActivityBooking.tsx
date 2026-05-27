import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Users } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

const activities = [
  { id: 1, name: 'Eiffel Tower Skip-the-Line', duration: '2 hours', price: 25, rating: 4.9, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
  { id: 2, name: 'Seine River Cruise', duration: '1 hour', price: 15, rating: 4.7, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400' },
  { id: 3, name: 'Versailles Palace Tour', duration: '4 hours', price: 45, rating: 4.8, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400' },
];

export default function ActivityBooking() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Activities & Tours</h1>
            <p className="text-white/80 text-sm">Book experiences</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {activities.map((activity) => (
          <GlassCard key={activity.id} className="cursor-pointer">
            <div className="h-40 -m-5 mb-4 rounded-t-3xl overflow-hidden">
              <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold mb-2">{activity.name}</h3>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {activity.duration}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {activity.rating}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">${activity.price}</div>
                <div className="text-xs text-muted-foreground">per person</div>
              </div>
              <Button variant="gradient" size="sm" onClick={() => navigate('/payment')}>
                Book Now
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
