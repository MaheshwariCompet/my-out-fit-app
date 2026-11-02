import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, RefreshCw, Check } from 'lucide-react';

export default function OutfitBuilder() {
  const navigate = useNavigate();
  const [selectedLayer, setSelectedLayer] = useState('coat');

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Smart Assembler</span>
        <button onClick={() => navigate('/planner')} className="text-xs text-neutral-500">Done</button>
      </div>

      <Card className="p-4 space-y-2">
        <span className="text-[10px] font-semibold text-[#C4623A] uppercase tracking-wider">Anchor Garment</span>
        <div className="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=200&q=80" alt="Coat" className="w-16 h-20 rounded-xl object-cover" />
          <div>
            <h2 className="font-serif text-sm font-bold">Tailored Camel Wool Coat</h2>
            <p className="text-xs text-neutral-500">Totême • Outerwear</p>
            <span className="text-[10px] font-semibold text-emerald-600">Ready in Wardrobe</span>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold uppercase text-neutral-500">Pairing Suggestions</span>
          <button className="flex items-center gap-1 text-[#C4623A]"><RefreshCw size={12} /> Shuffle</button>
        </div>

        {[
          { id: '1', title: 'Cashmere Crewneck', role: 'Mid Knitwear', match: '98% Drape Match', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=200&q=80' },
          { id: '2', title: 'Pleated Wool Trousers', role: 'Bottom', match: '96% Drape Match', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=200&q=80' },
          { id: '3', title: 'Suede Penny Loafers', role: 'Footwear', match: '94% Tone Match', img: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=200&q=80' }
        ].map(p => (
          <Card key={p.id} className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={p.img} alt={p.title} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <div className="text-xs font-semibold">{p.title}</div>
                <div className="text-[11px] text-neutral-500">{p.role} • {p.match}</div>
              </div>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              Selected
            </span>
          </Card>
        ))}
      </div>

      <Button fullWidth variant="primary" onClick={() => navigate('/planner')}>
        Save As Daily Look
      </Button>
    </div>
  );
}
