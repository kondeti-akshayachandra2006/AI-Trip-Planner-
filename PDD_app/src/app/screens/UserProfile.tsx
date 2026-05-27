import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Star, Settings, Edit } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function UserProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-16">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button onClick={() => navigate('/settings')} className="text-white">
            <Settings className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl">
              👤
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center">
              <Edit className="w-4 h-4" />
            </button>
          </div>
          <h1 className="text-white text-2xl font-bold mb-1">{user?.name || 'Guest Traveler'}</h1>
          <p className="text-white/80">{user?.email || 'No email available'}</p>
        </div>
      </div>

      <div className="px-6 -mt-8">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <GlassCard className="text-center">
            <div className="text-2xl font-bold mb-1">{user?.savedTrips?.length ?? 0}</div>
            <div className="text-xs text-muted-foreground">Trips</div>
          </GlassCard>
          <GlassCard className="text-center">
            <div className="text-2xl font-bold mb-1">{user?.preferences?.length ?? 0}</div>
            <div className="text-xs text-muted-foreground">Preferences</div>
          </GlassCard>
          <GlassCard className="text-center">
            <div className="text-2xl font-bold mb-1">{user?.travelStyle ? '★' : '—'}</div>
            <div className="text-xs text-muted-foreground">Style</div>
          </GlassCard>
        </div>

        <div className="space-y-3 mb-6">
          <GlassCard onClick={() => navigate('/saved-trips')} className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-medium">My Trips</span>
            </div>
            <span className="text-muted-foreground">→</span>
          </GlassCard>

          <GlassCard onClick={() => navigate('/wishlist')} className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-primary" />
              <span className="font-medium">Wishlist</span>
            </div>
            <span className="text-muted-foreground">→</span>
          </GlassCard>

          <GlassCard onClick={() => navigate('/reviews')} className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-primary" />
              <span className="font-medium">Reviews & Ratings</span>
            </div>
            <span className="text-muted-foreground">→</span>
          </GlassCard>

          <GlassCard onClick={() => navigate('/subscription')} className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-medium">Subscription</span>
            </div>
            <span className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-xs">
              Premium
            </span>
          </GlassCard>
        </div>

        <div className="space-y-3">
          <Button variant="outline" size="lg" className="w-full" onClick={() => navigate('/settings')}>
            Edit Profile
          </Button>
          <Button variant="secondary" size="lg" className="w-full" onClick={() => { logout(); navigate('/login'); }}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
