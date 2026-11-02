import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Upload, Check } from 'lucide-react';

export default function ManualAddGarment() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('Double-Breasted Wool Blazer');
  const [brand, setBrand] = useState('Totême');
  const [category, setCategory] = useState('outerwear');
  const [price, setPrice] = useState('480');
  const [color, setColor] = useState('Camel & Beige');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/closet');
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="text-[10px] font-semibold text-[#C4623A] uppercase tracking-wider">Archive Edition</span>
          <h1 className="font-serif text-2xl font-bold">Manual Add Garment</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card className="p-6 text-center border-dashed border-2 border-[#E8E2D9] dark:border-[#2A313D] space-y-2">
          <Upload size={32} className="mx-auto text-neutral-400" />
          <div className="text-xs font-semibold">Upload or Snap Garment</div>
          <p className="text-[11px] text-neutral-400">High-resolution studio or hanger view with auto-silhouette</p>
        </Card>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase text-neutral-500">Piece Title *</label>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#C4623A]" 
            required 
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase text-neutral-500">Brand / Maison (Optional)</label>
          <input 
            type="text" 
            value={brand} 
            onChange={e => setBrand(e.target.value)} 
            className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#C4623A]" 
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase text-neutral-500">Category</label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {['outerwear', 'tops', 'bottoms', 'knitwear', 'footwear', 'accessories'].map(cat => (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                className={`py-2 px-3 rounded-xl border capitalize ${
                  category === cat ? 'bg-[#1F2F4F] text-white font-semibold' : 'bg-white dark:bg-[#1B1F27] border-[#E8E2D9] dark:border-[#2A313D]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-neutral-500">Acquisition Price ($)</label>
            <input 
              type="number" 
              value={price} 
              onChange={e => setPrice(e.target.value)} 
              className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#C4623A]" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-neutral-500">Primary Tone</label>
            <input 
              type="text" 
              value={color} 
              onChange={e => setColor(e.target.value)} 
              className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#C4623A]" 
            />
          </div>
        </div>

        <Button type="submit" fullWidth variant="primary" className="mt-4">
          Save to Closet
        </Button>
      </form>
    </div>
  );
}
