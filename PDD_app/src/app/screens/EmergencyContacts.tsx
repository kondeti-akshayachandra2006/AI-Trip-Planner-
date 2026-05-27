import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, AlertCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const emergencyContacts = [
  { name: 'Emergency Services', number: '112', icon: AlertCircle, color: 'text-red-500' },
  { name: 'Police', number: '17', icon: Phone, color: 'text-blue-500' },
  { name: 'US Embassy Paris', number: '+33 1 43 12 22 22', icon: MapPin, color: 'text-green-500' },
  { name: 'Medical Emergency', number: '15', icon: Phone, color: 'text-red-500' },
];

export default function EmergencyContacts() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Emergency Contacts</h1>
            <p className="text-white/80 text-sm">Paris, France</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <GlassCard className="bg-red-500/10 border-red-500/20">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="font-bold">Quick Dial</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            In case of emergency, dial 112 for immediate assistance
          </p>
          <button className="w-full py-3 bg-red-500 text-white rounded-2xl font-bold">
            Call 112 Now
          </button>
        </GlassCard>

        <h2 className="font-bold mt-6 mb-3">Important Numbers</h2>
        {emergencyContacts.map((contact, index) => {
          const Icon = contact.icon;
          return (
            <GlassCard key={index}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${contact.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.number}</p>
                  </div>
                </div>
                <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </GlassCard>
          );
        })}

        <div className="mt-6">
          <h2 className="font-bold mb-3">Your Emergency Info</h2>
          <GlassCard className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Blood Type</span>
              <span className="font-medium">O+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Allergies</span>
              <span className="font-medium">None</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Emergency Contact</span>
              <span className="font-medium">+1 555-1234</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
