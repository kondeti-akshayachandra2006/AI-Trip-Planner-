import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, MapPin, DollarSign, Calendar, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function AITravelInsights() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Travel Insights</h1>
            <p className="text-white/80 text-sm">AI-powered analytics</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <GlassCard className="bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="font-bold">AI Summary</h2>
          </div>
          <p className="text-muted-foreground">
            Based on your travel history, you prefer cultural experiences and mid-range accommodations. The best time to visit Paris for your preferences is April-June.
          </p>
        </GlassCard>

        <div>
          <h2 className="font-bold mb-3">Travel Statistics</h2>
          <div className="grid grid-cols-2 gap-3">
            <GlassCard className="text-center">
              <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Countries Visited</div>
            </GlassCard>
            <GlassCard className="text-center">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm text-muted-foreground">Days Traveled</div>
            </GlassCard>
            <GlassCard className="text-center">
              <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">$8.5k</div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </GlassCard>
            <GlassCard className="text-center">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">85%</div>
              <div className="text-sm text-muted-foreground">Budget Accuracy</div>
            </GlassCard>
          </div>
        </div>

        <div>
          <h2 className="font-bold mb-3">Top Destinations</h2>
          <div className="space-y-2">
            {[
              { name: 'Paris, France', visits: 3, color: 'bg-blue-500' },
              { name: 'Tokyo, Japan', visits: 2, color: 'bg-purple-500' },
              { name: 'New York, USA', visits: 2, color: 'bg-green-500' },
            ].map((dest, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{dest.name}</span>
                  <span className="text-sm text-muted-foreground">{dest.visits} visits</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${dest.color}`} style={{ width: `${(dest.visits / 3) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold mb-3">AI Recommendations</h2>
          <GlassCard>
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Try Southeast Asia</h3>
                <p className="text-sm text-muted-foreground">
                  Based on your travel style, you might enjoy exploring Thailand or Vietnam. Great value and rich culture!
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
