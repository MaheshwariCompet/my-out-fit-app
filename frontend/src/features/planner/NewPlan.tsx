import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function NewPlan() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('London Autumn Journey');
  const [archetype, setArchetype] = useState('Travel Capsule');
  const [capacity, setCapacity] = useState('12');

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="text-[10px] font-semibold text-[#C4623A] uppercase tracking-wider">Step 1 to 4</span>
          <h1 className="font-serif text-2xl font-bold">New Wardrobe Plan</h1>
        </div>
      </div>

      <div className="space-y-4 text-xs">
        <div className="space-y-1">
          <label className="font-semibold uppercase text-neutral-500">Plan Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-xl font-medium"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold uppercase text-neutral-500">Plan Archetype</label>
          <div className="grid grid-cols-3 gap-2">
            {['Weekly Rotation', 'Travel Capsule', 'Special Event'].map(arch => (
              <button
                key={arch}
                onClick={() => setArchetype(arch)}
                className={`py-2 px-3 rounded-xl border text-center transition-all ${
                  archetype === arch ? 'bg-[#1F2F4F] text-white font-semibold' : 'bg-white dark:bg-[#1B1F27] border-[#E8E2D9] dark:border-[#2A313D]'
                }`}
              >
                {arch}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-semibold uppercase text-neutral-500">Capsule Capacity (Target Garments)</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { count: '8', desc: 'Ultra Minimal' },
              { count: '12', desc: 'Versatile Fit' },
              { count: '16', desc: 'Extended Stay' }
            ].map(c => (
              <button
                key={c.count}
                onClick={() => setCapacity(c.count)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  capacity === c.count ? 'border-[#C4623A] bg-[#C4623A]/10 text-[#C4623A] font-bold' : 'border-[#E8E2D9] dark:border-[#2A313D]'
                }`}
              >
                <div className="text-lg font-bold">{c.count}</div>
                <div className="text-[10px] text-neutral-500 font-normal">{c.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <Button fullWidth variant="primary" onClick={() => navigate('/planner/saved')} className="mt-4">
          Generate Weekly Plan
        </Button>
      </div>
    </div>
  );
}
