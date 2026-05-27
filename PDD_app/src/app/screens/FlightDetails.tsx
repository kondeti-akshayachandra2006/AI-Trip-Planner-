import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plane, Wifi, Coffee, Monitor } from 'lucide-react';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';

export default function FlightDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Flight Details</h1>
            <p className="text-white/80 text-sm">Air France</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold">08:00 AM</div>
              <div className="text-muted-foreground">JFK, New York</div>
            </div>
            <div className="flex-1 flex flex-col items-center mx-4">
              <Plane className="w-6 h-6 text-primary rotate-90 mb-1" />
              <div className="w-full h-0.5 bg-border"></div>
              <div className="text-sm text-muted-foreground mt-1">2h 30m Direct</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">10:30 AM</div>
              <div className="text-muted-foreground">CDG, Paris</div>
            </div>
          </div>
        </GlassCard>

        <div>
          <h2 className="font-bold mb-3">Flight Information</h2>
          <GlassCard className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Flight Number</span>
              <span className="font-medium">AF 342</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Aircraft</span>
              <span className="font-medium">Boeing 777</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Class</span>
              <span className="font-medium">Economy</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Baggage</span>
              <span className="font-medium">23kg included</span>
            </div>
          </GlassCard>
        </div>

        <div>
          <h2 className="font-bold mb-3">Amenities</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Wifi, label: 'WiFi' },
              { icon: Coffee, label: 'Meals' },
              { icon: Monitor, label: 'Entertainment' },
            ].map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <GlassCard key={index} className="flex flex-col items-center gap-2 p-4">
                  <Icon className="w-6 h-6 text-primary" />
                  <span className="text-xs">{amenity.label}</span>
                </GlassCard>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Total Price</div>
              <div className="text-2xl font-bold text-primary">$250</div>
            </div>
            <Button variant="gradient" size="lg" onClick={() => navigate('/payment')}>
              Book Flight
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
