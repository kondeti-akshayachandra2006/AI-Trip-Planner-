import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const categories = [
  {
    name: 'Essentials',
    items: [
      { id: 1, name: 'Passport', checked: true },
      { id: 2, name: 'Travel Insurance', checked: true },
      { id: 3, name: 'Flight Tickets', checked: false },
      { id: 4, name: 'Hotel Confirmations', checked: false },
    ],
  },
  {
    name: 'Clothing',
    items: [
      { id: 5, name: 'Comfortable Shoes', checked: true },
      { id: 6, name: 'Light Jacket', checked: false },
      { id: 7, name: 'Casual Outfits', checked: false },
    ],
  },
];

export default function SmartPackingChecklist() {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState(categories);

  const toggleItem = (categoryIndex: number, itemId: number) => {
    setChecklist(prev => {
      const newChecklist = [...prev];
      const category = newChecklist[categoryIndex];
      const item = category.items.find(i => i.id === itemId);
      if (item) item.checked = !item.checked;
      return newChecklist;
    });
  };

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-white font-bold">Packing Checklist</h1>
              <p className="text-white/80 text-sm">Paris Trip</p>
            </div>
          </div>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <GlassCard className="bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Progress</div>
              <div className="text-2xl font-bold">3/7 packed</div>
            </div>
            <div className="text-4xl">📦</div>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-3">
            <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: '43%' }}></div>
          </div>
        </GlassCard>

        {checklist.map((category, categoryIndex) => (
          <div key={category.name}>
            <h2 className="font-bold mb-3">{category.name}</h2>
            <GlassCard className="space-y-3">
              {category.items.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => toggleItem(categoryIndex, item.id)}
                >
                  <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center ${
                    item.checked ? 'bg-primary border-primary' : 'border-border'
                  }`}>
                    {item.checked && <div className="text-white text-xs">✓</div>}
                  </div>
                  <span className={item.checked ? 'line-through text-muted-foreground' : ''}>
                    {item.name}
                  </span>
                </label>
              ))}
            </GlassCard>
          </div>
        ))}

        <button className="w-full py-3 border-2 border-dashed border-border rounded-2xl text-muted-foreground flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Add Custom Item
        </button>
      </div>
    </div>
  );
}
