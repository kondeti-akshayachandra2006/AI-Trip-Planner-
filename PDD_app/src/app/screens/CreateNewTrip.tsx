import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

export default function CreateNewTrip() {
  const navigate = useNavigate();
  const [tripData, setTripData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: '1',
    budget: '',
  });

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white font-bold">Create New Trip</h1>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <Input
          placeholder="Where to?"
          value={tripData.destination}
          onChange={(e) => setTripData({ ...tripData, destination: e.target.value })}
          icon={<MapPin className="w-5 h-5" />}
          label="Destination"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            value={tripData.startDate}
            onChange={(e) => setTripData({ ...tripData, startDate: e.target.value })}
            label="Start Date"
          />
          <Input
            type="date"
            value={tripData.endDate}
            onChange={(e) => setTripData({ ...tripData, endDate: e.target.value })}
            label="End Date"
          />
        </div>

        <Input
          type="number"
          placeholder="Number of travelers"
          value={tripData.travelers}
          onChange={(e) => setTripData({ ...tripData, travelers: e.target.value })}
          icon={<Users className="w-5 h-5" />}
          label="Travelers"
        />

        <Input
          type="number"
          placeholder="Your budget"
          value={tripData.budget}
          onChange={(e) => setTripData({ ...tripData, budget: e.target.value })}
          icon={<DollarSign className="w-5 h-5" />}
          label="Budget (USD)"
        />

        <div className="pt-4">
          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={() => navigate('/generate-itinerary', { state: { tripData } })}
          >
            Generate AI Itinerary
          </Button>
        </div>
      </div>
    </div>
  );
}
