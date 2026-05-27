import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, PieChart, TrendingUp, TrendingDown } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const categories = [
  { name: 'Accommodation', amount: 1200, percentage: 40, color: 'bg-blue-500' },
  { name: 'Transportation', amount: 600, percentage: 20, color: 'bg-purple-500' },
  { name: 'Food & Dining', amount: 750, percentage: 25, color: 'bg-green-500' },
  { name: 'Activities', amount: 450, percentage: 15, color: 'bg-orange-500' },
];

export default function BudgetPlanner() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Budget Planner</h1>
            <p className="text-white/80 text-sm">Paris Trip</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <GlassCard className="bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Total Budget</span>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-1">$3,000</div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500 flex items-center gap-1">
              <TrendingDown className="w-4 h-4" />
              $500 saved
            </span>
          </div>
        </GlassCard>

        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">$2,400</div>
            <div className="text-sm text-muted-foreground">Spent</div>
          </GlassCard>
          <GlassCard className="text-center">
            <div className="text-2xl font-bold text-green-500 mb-1">$600</div>
            <div className="text-sm text-muted-foreground">Remaining</div>
          </GlassCard>
        </div>

        <div>
          <h2 className="font-bold mb-4">Budget Breakdown</h2>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-muted-foreground">${category.amount}</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/expenses')}
          className="w-full py-3 bg-muted rounded-2xl font-medium"
        >
          View Expense Tracker
        </button>
      </div>
    </div>
  );
}
