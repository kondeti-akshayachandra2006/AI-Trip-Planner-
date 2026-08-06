import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Sparkles, MapPin, Calendar, TrendingUp, Bell, User, Search, Compass, Plane, Hotel, UtensilsCrossed, ShieldCheck, MessageCircleMore } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { fetchJson } from '../lib/api';

const fallbackTrips = [
  { id: 'demo-1', destination: 'Paris', dates: 'Jun 15-22, 2026', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
  { id: 'demo-2', destination: 'Tokyo', dates: 'Aug 5-15, 2026', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400' },
];

const quickActions = [
  { icon: Search, label: 'Explore', route: '/search', gradient: 'from-sky-600 to-cyan-500' },
  { icon: Sparkles, label: 'AI Assistant', route: '/ai-chat', gradient: 'from-violet-600 to-fuchsia-500' },
  { icon: Calendar, label: 'Trips', route: '/saved-trips', gradient: 'from-emerald-600 to-green-500' },
  { icon: TrendingUp, label: 'Insights', route: '/insights', gradient: 'from-amber-600 to-orange-500' },
  { icon: Plane, label: 'Flights', route: '/flights', gradient: 'from-blue-600 to-indigo-500' },
  { icon: Hotel, label: 'Hotels', route: '/hotels', gradient: 'from-rose-600 to-pink-500' },
  { icon: UtensilsCrossed, label: 'Dining', route: '/restaurants', gradient: 'from-lime-600 to-emerald-500' },
  { icon: ShieldCheck, label: 'Safety', route: '/emergency', gradient: 'from-slate-700 to-slate-500' },
];

export default function HomeDashboard() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [upcomingTrips, setUpcomingTrips] = useState<any[]>(fallbackTrips);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const data = await fetchJson('/trips', { method: 'GET', authToken: token ?? undefined });
        setUpcomingTrips(
          Array.isArray(data.trips)
            ? data.trips.slice(0, 2).map((trip: any) => ({
                id: trip._id,
                destination: trip.destination,
                dates: trip.startDate && trip.endDate ? `${new Date(trip.startDate).toLocaleDateString()} - ${new Date(trip.endDate).toLocaleDateString()}` : 'Custom trip',
                image: trip.itinerary?.[0]?.image || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
              }))
            : fallbackTrips,
        );
      } catch {
        setUpcomingTrips(fallbackTrips);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadTrips();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.15),_transparent_32%),linear-gradient(135deg,_#f8fbff_0%,_#eef5ff_100%)] pb-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6 lg:flex-row lg:p-8">
        <aside className="lg:w-72 lg:shrink-0">
          <div className="sticky top-6 rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Travel OS</p>
                <h2 className="text-lg font-semibold text-slate-900">Trip Planner</h2>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              {[
                { label: 'Home', route: '/home', icon: MapPin },
                { label: 'Explore', route: '/search', icon: Search },
                { label: 'AI Assistant', route: '/ai-chat', icon: Sparkles },
                { label: 'Trips', route: '/saved-trips', icon: Calendar },
                { label: 'Insights', route: '/insights', icon: TrendingUp },
                { label: 'Profile', route: '/profile', icon: User },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.label} onClick={() => navigate(item.route)} className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                    <Icon className="h-5 w-5 text-primary" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-3xl bg-slate-900 p-4 text-white">
              <p className="text-sm text-slate-300">Next trip</p>
              <p className="mt-1 text-xl font-semibold">Paris · 15 days</p>
              <p className="mt-2 text-sm text-slate-400">Plan flights, hotels, dining and real-time updates from one workspace.</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Welcome back</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">Plan your next destination with a full travel command center.</h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-600">The web experience mirrors the app with real-time itinerary generation, trip management, AI assistance, transport and stay recommendations.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => navigate('/notifications')} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                  <Bell className="h-5 w-5" />
                </button>
                <button onClick={() => navigate('/profile')} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                  <User className="h-5 w-5" />
                </button>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button key={action.label} onClick={() => navigate(action.route)} className="rounded-[24px] border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${action.gradient}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-900">{action.label}</p>
                  <p className="mt-1 text-sm text-slate-500">Open the matching experience</p>
                </button>
              );
            })}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Upcoming trips</h3>
                  <p className="text-sm text-slate-500">Recent plans and live itinerary updates</p>
                </div>
                <button onClick={() => navigate('/saved-trips')} className="text-sm font-semibold text-primary">View all</button>
              </div>

              <div className="mt-5 space-y-3">
                {upcomingTrips.map((trip) => (
                  <GlassCard key={trip.id} onClick={() => navigate(`/itinerary/${trip.id}`)} className="flex items-center gap-4 cursor-pointer border border-slate-100">
                    <div className="h-20 w-20 overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent">
                      <img src={trip.image} alt={trip.destination} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{trip.destination}</h4>
                      <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="h-4 w-4" />
                        {trip.dates}
                      </div>
                    </div>
                    <MapPin className="h-5 w-5 text-primary" />
                  </GlassCard>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <h3 className="text-lg font-semibold text-slate-900">Launch a new plan</h3>
              <p className="mt-2 text-sm text-slate-500">Create a trip, generate an itinerary and bring every travel detail into the same view.</p>
              <Button variant="gradient" size="lg" className="mt-5 w-full" onClick={() => navigate('/create-trip')}>
                <Plus className="h-5 w-5" />
                Create New Trip
              </Button>
              <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <MessageCircleMore className="h-4 w-4 text-primary" />
                  Real-time assistant ready
                </div>
                <p className="mt-2">Ask for hotels, restaurants, weather, transport and safety guidance instantly.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
