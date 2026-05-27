import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, MapPin, Calendar, DollarSign, Users } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const promptSuggestions = [
  { icon: MapPin, text: 'Plan a weekend getaway to the mountains', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Calendar, text: 'Create a 2-week Europe itinerary', gradient: 'from-purple-500 to-pink-500' },
  { icon: DollarSign, text: 'Budget-friendly trip to Southeast Asia', gradient: 'from-green-500 to-emerald-500' },
  { icon: Users, text: 'Family vacation ideas for summer', gradient: 'from-orange-500 to-red-500' },
  { icon: Sparkles, text: 'Hidden gems in Italy', gradient: 'from-indigo-500 to-violet-500' },
  { icon: MapPin, text: 'Beach destinations for relaxation', gradient: 'from-cyan-500 to-blue-500' },
];

export default function AIPromptSuggestions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">AI Prompt Ideas</h1>
            <p className="text-white/80 text-sm">Get inspired</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="font-bold mb-4">Try asking about...</h2>
        <div className="space-y-3">
          {promptSuggestions.map((prompt, index) => {
            const Icon = prompt.icon;
            return (
              <GlassCard
                key={index}
                onClick={() => navigate('/ai-chat')}
                className="cursor-pointer flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${prompt.gradient} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="flex-1">{prompt.text}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
