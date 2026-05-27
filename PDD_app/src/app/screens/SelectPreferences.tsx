import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mountain, Palmtree, Building2, Utensils, Camera, Users } from 'lucide-react';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';

const preferences = [
  { id: 'adventure', icon: Mountain, label: 'Adventure', color: 'from-orange-500 to-red-500' },
  { id: 'beach', icon: Palmtree, label: 'Beach & Relax', color: 'from-cyan-500 to-blue-500' },
  { id: 'city', icon: Building2, label: 'City Tours', color: 'from-purple-500 to-pink-500' },
  { id: 'food', icon: Utensils, label: 'Food & Culture', color: 'from-green-500 to-emerald-500' },
  { id: 'photography', icon: Camera, label: 'Photography', color: 'from-indigo-500 to-violet-500' },
  { id: 'family', icon: Users, label: 'Family Trips', color: 'from-yellow-500 to-orange-500' },
];

export default function SelectPreferences() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const togglePreference = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleContinue = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen w-full bg-background p-6 flex flex-col">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Travel Preferences</h1>
          <p className="text-muted-foreground">Select your interests (choose at least 3)</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-auto">
          {preferences.map((pref) => {
            const Icon = pref.icon;
            const isSelected = selected.includes(pref.id);

            return (
              <GlassCard
                key={pref.id}
                onClick={() => togglePreference(pref.id)}
                className={`cursor-pointer ${
                  isSelected ? 'ring-2 ring-primary' : ''
                } h-32 flex flex-col items-center justify-center gap-3`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pref.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-center">{pref.label}</p>
              </GlassCard>
            );
          })}
        </div>

        <Button
          variant="gradient"
          size="lg"
          className="w-full mt-8"
          onClick={handleContinue}
          disabled={selected.length < 3}
        >
          Continue ({selected.length}/3)
        </Button>
      </div>
    </div>
  );
}
