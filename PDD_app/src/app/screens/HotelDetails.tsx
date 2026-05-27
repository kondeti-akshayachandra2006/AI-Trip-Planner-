import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Wifi, Coffee, Car, Heart, Share2 } from 'lucide-react';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';

const amenities = [
  { icon: Wifi, label: 'Free WiFi' },
  { icon: Coffee, label: 'Breakfast' },
  { icon: Car, label: 'Parking' },
];

export default function HotelDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="relative h-80">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
          alt="Hotel"
          className="w-full h-full object-cover"
        />
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
      </div>

      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-bold">Hotel Plaza Athénée</h1>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">$450</div>
              <div className="text-sm text-muted-foreground">per night</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <MapPin className="w-4 h-4" />
            <span>Champs-Élysées, Paris</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">4.9</span>
            <span className="text-muted-foreground">(245 reviews)</span>
          </div>
        </div>

        <div>
          <h2 className="font-bold mb-3">About</h2>
          <p className="text-muted-foreground">
            Experience luxury at its finest with stunning views of the Eiffel Tower. Our 5-star hotel offers world-class amenities and exceptional service.
          </p>
        </div>

        <div>
          <h2 className="font-bold mb-3">Amenities</h2>
          <div className="grid grid-cols-3 gap-3">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <GlassCard key={index} className="flex flex-col items-center gap-2 p-4">
                  <Icon className="w-6 h-6 text-primary" />
                  <span className="text-xs text-center">{amenity.label}</span>
                </GlassCard>
              );
            })}
          </div>
        </div>

        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={() => navigate('/payment')}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
