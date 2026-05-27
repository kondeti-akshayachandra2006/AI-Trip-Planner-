import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import GlassCard from '../components/GlassCard';

export default function PaymentGateway() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Payment</h1>
            <p className="text-white/80 text-sm">Secure checkout</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <GlassCard className="bg-gradient-to-br from-primary/10 to-secondary/10">
          <h3 className="font-bold mb-3">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hotel Plaza Athénée</span>
              <span className="font-bold">$450</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Fee</span>
              <span className="font-bold">$25</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">$475</span>
              </div>
            </div>
          </div>
        </GlassCard>

        <div>
          <h3 className="font-bold mb-3">Payment Method</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { id: 'card', label: 'Card' },
              { id: 'paypal', label: 'PayPal' },
              { id: 'apple', label: 'Apple Pay' },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`py-3 rounded-2xl border-2 transition-all ${
                  paymentMethod === method.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border'
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <Input
              placeholder="1234 5678 9012 3456"
              label="Card Number"
              icon={<CreditCard className="w-5 h-5" />}
            />
            <Input
              placeholder="John Doe"
              label="Cardholder Name"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="MM/YY" label="Expiry Date" />
              <Input placeholder="CVV" label="CVV" type="password" />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span>Your payment is secured with SSL encryption</span>
        </div>

        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={() => navigate('/confirmation')}
        >
          Pay $475
        </Button>
      </div>
    </div>
  );
}
