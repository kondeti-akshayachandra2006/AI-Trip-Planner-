import { useNavigate } from 'react-router-dom';
import { Plus, Sparkles, MapPin, Calendar, TrendingUp, Bell, User, Search } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

const upcomingTrips = [
  { id: 1, destination: 'Paris', dates: 'Jun 15-22, 2026', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
  { id: 2, destination: 'Tokyo', dates: 'Aug 5-15, 2026', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400' },
];

const quickActions = [
  { icon: Search, label: 'Search', route: '/search', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Sparkles, label: 'AI Chat', route: '/ai-chat', gradient: 'from-purple-500 to-pink-500' },
  { icon: Calendar, label: 'My Trips', route: '/saved-trips', gradient: 'from-green-500 to-emerald-500' },
  { icon: TrendingUp, label: 'Insights', route: '/insights', gradient: 'from-orange-500 to-red-500' },
];

export default function HomeDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-br from-primary via-secondary to-accent p-6 pb-24 rounded-b-[3rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        <div className="relative flex items-center justify-between mb-8">
          <div>
            <h2 className="text-white/80 text-sm">Welcome back,</h2>
            <h1 className="text-white text-2xl font-bold">Traveler</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/notifications')} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button onClick={() => navigate('/profile')} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="relative">
          <GlassCard className="bg-white/20 border-white/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/80 text-sm mb-1">Your next adventure</p>
                <h3 className="text-white text-xl font-bold">Paris, France</h3>
                <p className="text-white/80 text-sm">15 days to go</p>
              </div>
              <Calendar className="w-12 h-12 text-white/80" />
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-4 gap-3 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => navigate(action.route)}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-foreground">{action.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Upcoming Trips</h3>
            <button onClick={() => navigate('/saved-trips')} className="text-primary text-sm">View All</button>
          </div>

          <div className="space-y-3">
            {upcomingTrips.map((trip) => (
              <GlassCard key={trip.id} onClick={() => navigate(`/itinerary/${trip.id}`)} className="flex items-center gap-4 cursor-pointer">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent overflow-hidden">
                  <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1">{trip.destination}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {trip.dates}
                  </div>
                </div>
                <MapPin className="w-5 h-5 text-primary" />
              </GlassCard>
            ))}
          </div>
        </div>

        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={() => navigate('/create-trip')}
        >
          <Plus className="w-5 h-5" />
          Create New Trip
        </Button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button onClick={() => navigate('/home')} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-primary">Home</span>
          </button>
          <button onClick={() => navigate('/search')} className="flex flex-col items-center gap-1">
            <Search className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Explore</span>
          </button>
          <button onClick={() => navigate('/ai-chat')} className="flex flex-col items-center gap-1">
            <Sparkles className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">AI</span>
          </button>
          <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-1">
            <User className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
