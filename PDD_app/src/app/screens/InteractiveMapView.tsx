import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function InteractiveMapView() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-background relative">
      <div className="absolute inset-0 bg-muted flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <MapPin className="w-16 h-16 mx-auto mb-4" />
          <p>Interactive Map View</p>
          <p className="text-sm mt-2">Showing all destinations and points of interest</p>
        </div>
      </div>

      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-card shadow-lg rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button className="w-10 h-10 bg-primary shadow-lg rounded-full flex items-center justify-center">
          <Navigation className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-10">
        <GlassCard>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Eiffel Tower</h3>
              <p className="text-sm text-muted-foreground">Champ de Mars, Paris</p>
            </div>
          </div>
          <button className="w-full py-2 bg-primary text-white rounded-xl">
            Get Directions
          </button>
        </GlassCard>
      </div>
    </div>
  );
}
