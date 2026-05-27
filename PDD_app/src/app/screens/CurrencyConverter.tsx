import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowDownUp } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function CurrencyConverter() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const convertedAmount = (parseFloat(amount) * 0.92).toFixed(2);

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white font-bold">Currency Converter</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <GlassCard>
          <label className="block text-sm text-muted-foreground mb-2">From</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 text-3xl font-bold bg-transparent focus:outline-none"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="px-4 py-2 bg-muted rounded-xl focus:outline-none font-medium"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
        </GlassCard>

        <div className="flex justify-center">
          <button className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
            <ArrowDownUp className="w-6 h-6 text-white" />
          </button>
        </div>

        <GlassCard className="bg-gradient-to-br from-primary/10 to-secondary/10">
          <label className="block text-sm text-muted-foreground mb-2">To</label>
          <div className="flex items-center gap-3">
            <div className="flex-1 text-3xl font-bold">{convertedAmount}</div>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="px-4 py-2 bg-muted rounded-xl focus:outline-none font-medium"
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
        </GlassCard>

        <div className="text-center text-sm text-muted-foreground">
          1 {fromCurrency} = {(1 * 0.92).toFixed(4)} {toCurrency}
        </div>

        <div>
          <h2 className="font-bold mb-3">Popular Rates</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { from: 'USD', to: 'EUR', rate: '0.92' },
              { from: 'USD', to: 'GBP', rate: '0.79' },
              { from: 'USD', to: 'JPY', rate: '148.50' },
              { from: 'EUR', to: 'GBP', rate: '0.86' },
            ].map((rate, index) => (
              <GlassCard key={index} className="text-center">
                <div className="font-bold mb-1">{rate.from} → {rate.to}</div>
                <div className="text-primary">{rate.rate}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
