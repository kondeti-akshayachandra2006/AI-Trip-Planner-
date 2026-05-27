import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Heart, Share2, Calendar, DollarSign } from 'lucide-react';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';

export default function DestinationDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="relative h-96">
        <img
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800"
          alt="Paris"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-white text-3xl font-bold mb-2">Paris, France</h1>
          <div className="flex items-center gap-2 text-white">
            <MapPin className="w-4 h-4" />
            <span>Europe</span>
            <span className="mx-2">•</span>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>4.8</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h2 className="font-bold mb-2">About</h2>
          <p className="text-muted-foreground">
            Paris, the city of light, is renowned for its art, fashion, gastronomy, and culture. From the iconic Eiffel Tower to charming cafés, Paris offers an unforgettable experience.
          </p>
        </div>

        <div>
          <h2 className="font-bold mb-3">Quick Info</h2>
          <div className="grid grid-cols-2 gap-3">
            <GlassCard className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Best Time</p>
                <p className="font-medium text-sm">Apr-Oct</p>
              </div>
            </GlassCard>
            <GlassCard className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Avg Cost</p>
                <p className="font-medium text-sm">$150/day</p>
              </div>
            </GlassCard>
          </div>
        </div>

        <div>
          <h2 className="font-bold mb-3">Top Attractions</h2>
          <div className="space-y-2">
            {['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Arc de Triomphe'].map((attraction, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-2xl">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>{attraction}</span>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={() => navigate('/create-trip')}
        >
          Plan Trip to Paris
        </Button>
      </div>
    </div>
  );
}
