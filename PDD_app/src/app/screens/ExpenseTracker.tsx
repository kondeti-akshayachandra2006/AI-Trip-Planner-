import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, DollarSign, Calendar } from 'lucide-react';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';

const expenses = [
  { id: 1, name: 'Hotel Booking', amount: 450, category: 'Accommodation', date: 'Jun 15' },
  { id: 2, name: 'Eiffel Tower Tickets', amount: 25, category: 'Activities', date: 'Jun 16' },
  { id: 3, name: 'Dinner at Le Jules Verne', amount: 80, category: 'Food', date: 'Jun 16' },
  { id: 4, name: 'Metro Pass', amount: 15, category: 'Transportation', date: 'Jun 17' },
];

export default function ExpenseTracker() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-white font-bold">Expense Tracker</h1>
              <p className="text-white/80 text-sm">Track all expenses</p>
            </div>
          </div>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <GlassCard className="bg-gradient-to-br from-primary/10 to-secondary/10 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Total Expenses</div>
              <div className="text-3xl font-bold">$570</div>
            </div>
            <DollarSign className="w-12 h-12 text-primary opacity-20" />
          </div>
        </GlassCard>

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold">Recent Expenses</h2>
          <button className="text-primary text-sm">Filter</button>
        </div>

        <div className="space-y-3">
          {expenses.map((expense) => (
            <GlassCard key={expense.id}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{expense.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{expense.category}</span>
                    <span>•</span>
                    <Calendar className="w-3 h-3" />
                    <span>{expense.date}</span>
                  </div>
                </div>
                <div className="text-xl font-bold text-primary">${expense.amount}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
