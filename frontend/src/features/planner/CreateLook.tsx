import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Sparkles, RefreshCw, Layers, Check } from 'lucide-react';

export default function CreateLook() {
  const navigate = useNavigate();
  const [lookTitle, setLookTitle] = useState('The Autumn Gallery Look');

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Flat-Lay Canvas</span>
        <button onClick={() => navigate('/planner')} className="text-xs text-neutral-500">Cancel</button>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-semibold uppercase text-neutral-500">Look Nomenclature</label>
        <input 
          type="text" 
          value={lookTitle}
          onChange={e => setLookTitle(e.target.value)}
          className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-xl font-serif text-lg font-bold"
        />
      </div>

      {/* Flat Lay Layer Sequence */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold text-neutral-500 uppercase">
          <span>Staged Layers (4 Garments)</span>
          <button className="flex items-center gap-1 text-[#C4623A]"><RefreshCw size={12} /> Auto-Order</button>
        </div>

        {[
          { layer: "01", type: "Outerwear", title: "Structured Camel Trench", brand: "Totême", img: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=200&q=80" },
          { layer: "02", type: "Base Layer", title: "Totême Silk Blouse", brand: "Totême", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=200&q=80" },
          { layer: "03", type: "Trousers", title: "Pleated Wool Trousers", brand: "Studio Nicholson", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=200&q=80" },
          { layer: "04", type: "Footwear", title: "Suede Penny Loafers", brand: "Totême", img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=200&q=80" }
        ].map(item => (
          <Card key={item.layer} className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-neutral-400">{item.layer}</span>
              <img src={item.img} alt={item.title} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <div className="text-xs font-semibold">{item.title}</div>
                <div className="text-[11px] text-neutral-500">{item.brand} • {item.type}</div>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">Ready</span>
          </Card>
        ))}
      </div>

      <Card className="p-4 space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-neutral-500 uppercase">Look Cohesion</span>
          <span className="font-bold text-emerald-600 text-sm">96% Cohesive</span>
        </div>
        <p className="text-neutral-500">Harmonized drape and balanced earth tone palette across textures. Mid-weight thermal block ideal for 14°C crisp weather.</p>
      </Card>

      <div className="space-y-2 pt-2">
        <Button fullWidth variant="primary" onClick={() => navigate('/outfits/saved')}>
          <Check size={16} className="mr-2" /> Save to Outfits
        </Button>
        <Button fullWidth variant="outline" onClick={() => navigate('/try-on')}>
          <Sparkles size={16} className="mr-2" /> Try on Avatar (3D View)
        </Button>
      </div>
    </div>
  );
}
