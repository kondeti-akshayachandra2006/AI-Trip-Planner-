import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, MapPin, DollarSign, Users, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const notifications = [
  { id: 1, icon: Sparkles, title: 'AI Itinerary Ready', message: 'Your Paris itinerary has been generated', time: '2 min ago', color: 'text-purple-500' },
  { id: 2, icon: MapPin, title: 'Flight Reminder', message: 'Your flight to Paris departs in 3 days', time: '1 hour ago', color: 'text-blue-500' },
  { id: 3, icon: DollarSign, title: 'Price Drop Alert', message: 'Hotel prices in Paris dropped by 15%', time: '3 hours ago', color: 'text-green-500' },
  { id: 4, icon: Users, title: 'New Group Message', message: 'Sarah: Can\'t wait for this trip!', time: '5 hours ago', color: 'text-orange-500' },
];

export default function NotificationsCenter() {
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
              <h1 className="text-white font-bold">Notifications</h1>
              <p className="text-white/80 text-sm">4 new</p>
            </div>
          </div>
          <button className="text-white text-sm">Mark all read</button>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <GlassCard key={notification.id} className="cursor-pointer">
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${notification.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{notification.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
