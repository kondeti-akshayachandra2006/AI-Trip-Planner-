import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';

const plans = [
  {
    name: 'Free',
    price: 0,
    features: ['Basic AI Itineraries', '3 Trips per Month', 'Standard Support'],
  },
  {
    name: 'Premium',
    price: 9.99,
    features: ['Unlimited AI Itineraries', 'Unlimited Trips', 'Priority Support', 'Advanced AI Features', 'Group Collaboration', 'Offline Access'],
    popular: true,
  },
  {
    name: 'Family',
    price: 19.99,
    features: ['All Premium Features', 'Up to 5 Family Members', 'Shared Itineraries', 'Family Budget Tracker', 'Dedicated Support'],
  },
];

export default function SubscriptionPlans() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Subscription Plans</h1>
            <p className="text-white/80 text-sm">Choose your plan</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {plans.map((plan) => (
          <GlassCard
            key={plan.name}
            className={`relative ${plan.popular ? 'border-2 border-primary' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary text-white text-sm rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Most Popular
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">${plan.price}</span>
                {plan.price > 0 && <span className="text-muted-foreground">/month</span>}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              variant={plan.popular ? 'gradient' : 'outline'}
              size="lg"
              className="w-full"
              onClick={() => plan.price > 0 && navigate('/payment')}
            >
              {plan.name === 'Premium' ? 'Current Plan' : plan.price === 0 ? 'Current' : 'Upgrade'}
            </Button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
