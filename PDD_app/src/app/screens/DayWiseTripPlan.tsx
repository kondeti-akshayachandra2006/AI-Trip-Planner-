import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, DollarSign, Star } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function DayWiseTripPlan() {
  const navigate = useNavigate();
  const { day } = useParams();
  const location = useLocation();
  const dayData = location.state?.dayData;

  const activities = dayData?.activities || [
    { time: '09:00 AM', name: 'Activity', duration: '2 hours', cost: 'Free', rating: 4.5 }
  ];

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Day {day} Plan</h1>
            <p className="text-white/80 text-sm">{dayData?.title || 'Daily Schedule'}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="relative">
          {activities.map((activity: any, index: number) => (
            <div key={index} className="relative">
              {index < activities.length - 1 && (
                <div className="absolute left-5 top-20 w-0.5 h-full bg-border"></div>
              )}
              <GlassCard className="mb-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-primary mb-2">
                      <Clock className="w-4 h-4" />
                      {activity.time}
                    </div>
                    <h3 className="font-bold mb-2">{activity.name}</h3>

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {activity.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {activity.cost}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {activity.rating}
                      </div>
                    </div>

                    <button className="mt-3 text-primary text-sm">View Details</button>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
