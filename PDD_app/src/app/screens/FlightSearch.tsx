import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plane, Clock, DollarSign } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const flights = [
  { id: 1, airline: 'Air France', departure: '08:00 AM', arrival: '10:30 AM', duration: '2h 30m', price: 250, stops: 'Direct' },
  { id: 2, airline: 'Lufthansa', departure: '12:00 PM', arrival: '03:15 PM', duration: '3h 15m', price: 180, stops: '1 Stop' },
  { id: 3, airline: 'British Airways', departure: '06:00 PM', arrival: '08:45 PM', duration: '2h 45m', price: 220, stops: 'Direct' },
];

export default function FlightSearch() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('round-trip');

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Flight Search</h1>
            <p className="text-white/80 text-sm">New York → Paris</p>
          </div>
        </div>

        <div className="flex gap-2">
          {['round-trip', 'one-way'].map((type) => (
            <button
              key={type}
              onClick={() => setTripType(type)}
              className={`px-4 py-2 rounded-full capitalize ${
                tripType === type
                  ? 'bg-white text-primary'
                  : 'bg-white/20 text-white'
              }`}
            >
              {type.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Direct', 'Cheapest', 'Fastest'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                filter === 'All'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {flights.map((flight) => (
          <GlassCard
            key={flight.id}
            onClick={() => navigate(`/flight/${flight.id}`)}
            className="cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">{flight.airline}</h3>
                  <p className="text-sm text-muted-foreground">{flight.stops}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">${flight.price}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="font-bold">{flight.departure}</div>
                <div className="text-muted-foreground">JFK</div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                {flight.duration}
              </div>
              <div className="text-right">
                <div className="font-bold">{flight.arrival}</div>
                <div className="text-muted-foreground">CDG</div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
