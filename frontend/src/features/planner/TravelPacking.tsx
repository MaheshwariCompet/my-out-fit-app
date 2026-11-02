import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Luggage, Check, Share2, Calendar } from 'lucide-react';

interface PackingGarment {
  id: string;
  category: 'Outerwear' | 'Tops' | 'Bottoms' | 'Shoes & Essentials';
  title: string;
  detail: string;
  weightKg: number;
  packed: boolean;
}

export default function TravelPacking() {
  const navigate = useNavigate();
  const [items, setItems] = useState<PackingGarment[]>([
    { id: '1', category: 'Outerwear', title: 'Structured Camel Trench', detail: 'Signature top layer', weightKg: 1.4, packed: true },
    { id: '2', category: 'Tops', title: 'Cashmere Crewneck', detail: 'Oatmeal heather', weightKg: 0.6, packed: true },
    { id: '3', category: 'Tops', title: 'Crisp Poplin Shirt', detail: 'Bright white tailored', weightKg: 0.4, packed: true },
    { id: '4', category: 'Tops', title: 'Silk Blouse', detail: 'Midnight navy drape', weightKg: 0.3, packed: false },
    { id: '5', category: 'Bottoms', title: 'Pleated Wool Trousers', detail: 'Charcoal wide cut', weightKg: 0.9, packed: true },
    { id: '6', category: 'Bottoms', title: 'Selvedge Denim', detail: 'Indigo straight leg', weightKg: 0.8, packed: false },
    { id: '7', category: 'Shoes & Essentials', title: 'Suede Penny Loafers', detail: 'Tobacco brown', weightKg: 1.2, packed: true },
    { id: '8', category: 'Shoes & Essentials', title: 'Cashmere Scarf', detail: 'Heather taupe', weightKg: 0.2, packed: true }
  ]);

  const togglePacked = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  };

  const packedCount = items.filter(i => i.packed).length;
  const currentWeight = items.reduce((acc, i) => acc + (i.packed ? i.weightKg : 0), 0);
  const maxWeight = 10.0;

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button 
          type="button"
          onClick={() => navigate(-1)} 
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="text-[10px] font-semibold text-[#C4623A] uppercase tracking-wider">Upcoming Voyage</span>
          <h1 className="font-serif text-2xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">Paris, France</h1>
          <p className="text-xs text-neutral-500">Oct 28 – Nov 2 • 5 Days • 14°C Crisp / Light Rain</p>
        </div>
      </div>

      <Card className="space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold flex items-center gap-1.5 text-[#1F2F4F] dark:text-[#FAF8F5]">
            <Luggage size={16} className="text-[#C4623A]" /> Cabin Baggage Allowance
          </span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            {currentWeight.toFixed(1)} / {maxWeight.toFixed(1)} kg
          </span>
        </div>
        <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#1F2F4F] dark:bg-[#FAF8F5] h-full transition-all duration-300 rounded-full" 
            style={{ width: `${Math.min((currentWeight / maxWeight) * 100, 100)}%` }}
          />
        </div>
        <div className="text-[11px] text-neutral-500">
          8 versatile pieces selected to configure 12 curated looks for your itinerary.
        </div>
      </Card>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-serif text-base font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">Wardrobe Checklist</h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
            {packedCount} of {items.length} packed
          </span>
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <div 
              key={item.id}
              onClick={() => togglePacked(item.id)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                item.packed 
                  ? 'bg-white dark:bg-[#1B1F27] border-[#E8E2D9] dark:border-[#2A313D]' 
                  : 'bg-neutral-50/50 dark:bg-neutral-900/30 border-dashed border-neutral-300 dark:border-neutral-700 opacity-70'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                  item.packed ? 'bg-[#1F2F4F] text-white dark:bg-white dark:text-[#1F2F4F]' : 'border border-neutral-300 dark:border-neutral-700'
                }`}>
                  {item.packed && <Check size={14} />}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1F2F4F] dark:text-[#FAF8F5]">{item.title}</div>
                  <div className="text-[11px] text-neutral-500">{item.detail} • {item.weightKg} kg</div>
                </div>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                item.packed 
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' 
                  : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
              }`}>
                {item.packed ? 'Packed' : 'To Pack'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <Button fullWidth variant="primary" className="flex items-center justify-center gap-2">
          <Share2 size={16} /> Export Packing Checklist
        </Button>
        <Button fullWidth variant="outline" onClick={() => navigate('/planner')} className="flex items-center justify-center gap-2">
          <Calendar size={16} /> Sync All Looks to Daily Planner
        </Button>
      </div>
    </div>
  );
}