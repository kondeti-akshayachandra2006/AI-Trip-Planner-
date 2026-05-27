import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Bell, Globe, Shield, HelpCircle, LogOut } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../components/ThemeProvider';

export default function SettingsScreen() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white font-bold">Settings</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h2 className="font-bold mb-3">Preferences</h2>
          <div className="space-y-3">
            <GlassCard className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-primary" />
                <span className="font-medium">Dark Mode</span>
              </div>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`w-12 h-6 rounded-full transition-all ${
                  theme === 'dark' ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-all ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                ></div>
              </button>
            </GlassCard>

            <GlassCard className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <span className="font-medium">Notifications</span>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-all ${
                  notifications ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-all ${
                    notifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                ></div>
              </button>
            </GlassCard>

            <GlassCard className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <span className="font-medium">Language</span>
              </div>
              <span className="text-muted-foreground">English</span>
            </GlassCard>
          </div>
        </div>

        <div>
          <h2 className="font-bold mb-3">Account</h2>
          <div className="space-y-3">
            <GlassCard onClick={() => navigate('/subscription')} className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-medium">Subscription</span>
              </div>
              <span className="text-muted-foreground">→</span>
            </GlassCard>

            <GlassCard onClick={() => navigate('/support')} className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-primary" />
                <span className="font-medium">Help & Support</span>
              </div>
              <span className="text-muted-foreground">→</span>
            </GlassCard>

            <GlassCard className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-destructive" />
                <span className="font-medium text-destructive">Log Out</span>
              </div>
            </GlassCard>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          TripAI v1.0.0
        </div>
      </div>
    </div>
  );
}
