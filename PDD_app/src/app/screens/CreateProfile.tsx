import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User, MapPin, Phone } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';

export default function CreateProfile() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    age: user?.age?.toString() || '',
    gender: user?.gender || '',
    country: user?.country || '',
    travelStyle: user?.travelStyle || '',
    budget: user?.budget || '',
    bio: user?.bio || '',
  });
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleContinue = async () => {
    setError('');
    setIsSaving(true);
    try {
      await updateProfile({
        name: profile.name,
        age: Number(profile.age) || null,
        gender: profile.gender,
        country: profile.country,
        travelStyle: profile.travelStyle,
        budget: profile.budget,
        bio: profile.bio,
      });
      navigate('/home');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Could not save profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background p-6 flex flex-col">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Profile</h1>
          <p className="text-muted-foreground">Tell us a bit about yourself</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shadow-lg">
              <Camera className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4 mb-auto">
          <Input
            placeholder="Full Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            icon={<User className="w-5 h-5" />}
          />

          <Input
            type="number"
            placeholder="Age"
            value={profile.age}
            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
          />

          <Input
            placeholder="Gender"
            value={profile.gender}
            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
          />

          <Input
            placeholder="Country"
            value={profile.country}
            onChange={(e) => setProfile({ ...profile, country: e.target.value })}
            icon={<MapPin className="w-5 h-5" />}
          />

          <Input
            placeholder="Travel Style (Luxury, Adventure, Budget, Family, Romantic)"
            value={profile.travelStyle}
            onChange={(e) => setProfile({ ...profile, travelStyle: e.target.value })}
          />

          <Input
            placeholder="Budget (e.g. Moderate, Premium, Budget)"
            value={profile.budget}
            onChange={(e) => setProfile({ ...profile, budget: e.target.value })}
          />

          <Input
            placeholder="Tell us about your travel preferences"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />
        </div>

        {error ? <div className="text-sm text-red-500 mb-3">{error}</div> : null}

        <Button variant="gradient" size="lg" className="w-full mt-8" onClick={handleContinue} disabled={isSaving}>
          {isSaving ? 'Saving profile...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
