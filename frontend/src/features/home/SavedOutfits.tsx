import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Plus } from 'lucide-react';

export default function SavedOutfits() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const outfits = [
    { id: '1', title: 'Minimal Tailoring', desc: 'Coat + Trousers + Knit', synergy: 98, img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80' },
    { id: '2', title: 'Parisian Weekend', desc: 'Trench + Denim + Loafers', synergy: 94, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80' },
    { id: '3', title: 'Boardroom Wool', desc: 'Blazer + Pleated Trousers', synergy: 96, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80' }
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="text-[10px] font-semibold text-[#C4623A] uppercase tracking-wider">16 Looks Saved</span>
          <h1 className="font-serif text-2xl font-bold">Saved Outfits</h1>
        </div>
        <Button size="sm" onClick={() => navigate('/planner/create-look')}>+ Create</Button>
      </div>

      <div className="flex gap-2">
        {['All', 'Autumn Workwear', 'Weekend Casual'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs transition-all ${
              activeTab === tab ? 'bg-[#1F2F4F] text-white font-semibold' : 'bg-neutral-100 dark:bg-neutral-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {outfits.map(o => (
          <Card key={o.id} interactive onClick={() => navigate(`/outfit/${o.id}`)} className="p-2 space-y-2">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100">
              <img src={o.img} alt={o.title} className="w-full h-full object-cover" />
            </div>
            <div className="px-1">
              <span className="text-[10px] font-semibold text-emerald-600">{o.synergy}% Match</span>
              <h3 className="font-semibold text-xs truncate mt-0.5">{o.title}</h3>
              <p className="text-[11px] text-neutral-500">{o.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
