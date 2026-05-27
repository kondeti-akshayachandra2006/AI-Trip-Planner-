import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Check } from 'lucide-react';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';

const plans = [
  {
    name: 'Basic',
    price: 25,
    coverage: 50000,
    features: ['Medical Coverage', 'Trip Cancellation', '24/7 Support'],
  },
  {
    name: 'Premium',
    price: 45,
    coverage: 100000,
    features: ['Medical Coverage', 'Trip Cancellation', 'Lost Baggage', 'Flight Delay', '24/7 Support'],
    popular: true,
  },
  {
    name: 'Elite',
    price: 75,
    coverage: 250000,
    features: ['Medical Coverage', 'Trip Cancellation', 'Lost Baggage', 'Flight Delay', 'Adventure Sports', 'Rental Car', '24/7 Support'],
  },
];

export default function TravelInsurance() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Travel Insurance</h1>
            <p className="text-white/80 text-sm">Protect your trip</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {plans.map((plan) => (
          <GlassCard
            key={plan.name}
            className={plan.popular ? 'border-2 border-primary' : ''}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary text-white text-sm rounded-full">
                Most Popular
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Coverage up to ${plan.coverage.toLocaleString()}
                </p>
              </div>
              <Shield className="w-8 h-8 text-primary" />
            </div>

            <div className="mb-4">
              <div className="text-3xl font-bold text-primary">${plan.price}</div>
              <div className="text-sm text-muted-foreground">per traveler</div>
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
              onClick={() => navigate('/payment')}
            >
              Select {plan.name}
            </Button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
