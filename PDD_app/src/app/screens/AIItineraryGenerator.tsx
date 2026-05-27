import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { fetchJson } from '../lib/api';

export default function AIItineraryGenerator() {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const hasCalledApi = useRef(false);

  const tripData = location.state?.tripData || {
    destination: 'Paris',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 345600000).toISOString(), // +4 days
    travelers: '1',
    budget: '2000'
  };

  const { token } = useAuth();

  useEffect(() => {
    // Fake progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90; // Stay at 90 until API returns
        return prev + 5;
      });
    }, 200);

    // Actual API Call
    const generateTrip = async () => {
      if (hasCalledApi.current) return;
      hasCalledApi.current = true;

      try {
        const startDate = new Date(tripData.startDate);
        const endDate = new Date(tripData.endDate);
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

        const data = await fetchJson('/api/generate-trip', {
          method: 'POST',
          authToken: token ?? undefined,
          body: {
            destination: tripData.destination,
            days: diffDays,
            budget: tripData.budget,
            preferences: ['Sightseeing', 'Culture'],
            travelStyle: 'Balanced',
            travelers: tripData.travelers,
          },
        });

        setProgress(100);
        setTimeout(() => {
          navigate(`/itinerary/${data.id}`, { state: { trip: data.trip || data } });
        }, 500);
      } catch (err) {
        console.error(err);
        setError('Connection failed. Using demo data...');
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => navigate('/itinerary/1'), 1000);
        }, 2000);
      }
    };

    generateTrip();
    return () => clearInterval(interval);
  }, [navigate, tripData]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 mx-auto mb-8 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center"
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>

        <h1 className="text-white text-2xl font-bold mb-4">
          {error ? 'Still Preparing...' : 'Creating Your Perfect Itinerary'}
        </h1>
        <p className="text-white/80 mb-8">
          {error ? error : `Planning your dream trip to ${tripData.destination}...`}
        </p>

        <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-3 overflow-hidden mb-4">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>

        <p className="text-white/60 text-sm">{progress}% Complete</p>
      </div>
    </div>
  );
}
