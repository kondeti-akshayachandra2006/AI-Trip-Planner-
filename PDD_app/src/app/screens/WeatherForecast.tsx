import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cloud, Sun, CloudRain, Wind } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const forecast = [
  { day: 'Mon', temp: '22°C', icon: Sun, condition: 'Sunny' },
  { day: 'Tue', temp: '20°C', icon: Cloud, condition: 'Cloudy' },
  { day: 'Wed', temp: '18°C', icon: CloudRain, condition: 'Rainy' },
  { day: 'Thu', temp: '21°C', icon: Sun, condition: 'Sunny' },
  { day: 'Fri', temp: '23°C', icon: Sun, condition: 'Sunny' },
];

export default function WeatherForecast() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Weather Forecast</h1>
            <p className="text-white/80 text-sm">Paris, France</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <GlassCard className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-5xl font-bold mb-2">22°C</div>
              <div className="text-lg text-muted-foreground">Partly Cloudy</div>
            </div>
            <Sun className="w-20 h-20 text-yellow-500" />
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Humidity</div>
              <div className="font-bold">65%</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Wind</div>
              <div className="font-bold">12 km/h</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">UV Index</div>
              <div className="font-bold">6</div>
            </div>
          </div>
        </GlassCard>

        <div>
          <h2 className="font-bold mb-4">7-Day Forecast</h2>
          <div className="space-y-3">
            {forecast.map((day, index) => {
              const Icon = day.icon;
              return (
                <GlassCard key={index}>
                  <div className="flex items-center justify-between">
                    <div className="font-bold">{day.day}</div>
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-primary" />
                      <span className="text-sm text-muted-foreground w-20">{day.condition}</span>
                      <span className="font-bold text-lg">{day.temp}</span>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
