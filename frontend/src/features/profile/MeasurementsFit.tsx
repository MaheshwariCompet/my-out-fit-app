import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function MeasurementsFit() {
  const navigate = useNavigate();
  const [height, setHeight] = useState('174');
  const [bust, setBust] = useState('86');
  const [waist, setWaist] = useState('68');
  const [hip, setHip] = useState('94');
  const [showLabels, setShowLabels] = useState(false);

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="text-[10px] font-semibold text-[#C4623A] uppercase tracking-wider">Anatomical Form</span>
          <h1 className="font-serif text-2xl font-bold">Measurements & Fit</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <Card className="p-3">
          <label className="text-neutral-500 uppercase font-semibold">Height (cm)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full font-serif text-lg font-bold bg-transparent border-0 mt-1 focus:outline-none" />
        </Card>
        <Card className="p-3">
          <label className="text-neutral-500 uppercase font-semibold">Bust / Chest (cm)</label>
          <input type="number" value={bust} onChange={e => setBust(e.target.value)} className="w-full font-serif text-lg font-bold bg-transparent border-0 mt-1 focus:outline-none" />
        </Card>
        <Card className="p-3">
          <label className="text-neutral-500 uppercase font-semibold">Natural Waist (cm)</label>
          <input type="number" value={waist} onChange={e => setWaist(e.target.value)} className="w-full font-serif text-lg font-bold bg-transparent border-0 mt-1 focus:outline-none" />
        </Card>
        <Card className="p-3">
          <label className="text-neutral-500 uppercase font-semibold">High Hip (cm)</label>
          <input type="number" value={hip} onChange={e => setHip(e.target.value)} className="w-full font-serif text-lg font-bold bg-transparent border-0 mt-1 focus:outline-none" />
        </Card>
      </div>

      <Card className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="body-shape-display" className="font-semibold">Show body shape labels</label>
          <input 
            id="body-shape-display"
            type="checkbox" 
            checked={showLabels} 
            onChange={e => setShowLabels(e.target.checked)} 
            className="w-4 h-4 text-[#C4623A]" 
          />
        </div>
        <p className="text-[11px] text-neutral-500">Off by default. When disabled, uses descriptive tailoring fit terms rather than body shape labels.</p>
      </Card>

      <Button fullWidth variant="primary" onClick={() => navigate(-1)}>
        Update Measurements & Save
      </Button>
    </div>
  );
}
