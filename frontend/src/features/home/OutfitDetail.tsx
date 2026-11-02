import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Check, RefreshCw, Sparkles, Calendar, Layers } from 'lucide-react';
import SwapPiecesSheet from '../planner/SwapPiecesSheet';

export default function OutfitDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showSwap, setShowSwap] = useState(false);
  const [worn, setWorn] = useState(false);

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Outfit Detail</span>
        <button onClick={() => setShowSwap(true)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-900 shadow-md">
        <img 
          src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80" 
          alt="The Boardroom Sartorial" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md p-4 rounded-2xl">
          <span className="text-[10px] font-semibold text-[#C4623A] uppercase tracking-wider">Curated Ensemble</span>
          <h1 className="font-serif text-lg font-bold">The Boardroom Sartorial</h1>
          <p className="text-xs text-neutral-500 mt-0.5">Tailored Camel, Oat Cashmere & Pleated Trousers</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center p-3">
          <div className="text-[10px] text-neutral-500 uppercase font-medium">Synergy Score</div>
          <div className="font-serif text-xl font-bold mt-0.5 text-emerald-600">96%</div>
        </Card>
        <Card className="text-center p-3">
          <div className="text-[10px] text-neutral-500 uppercase font-medium">Total Cost / Wear</div>
          <div className="font-serif text-xl font-bold mt-0.5 text-[#C4623A]">$19.80</div>
        </Card>
      </div>

      <div className="space-y-3">
        <h2 className="font-serif text-sm font-bold">Garments in this Look</h2>
        {[
          { title: "Structured Camel Trench", brand: "Totême", tag: "Outerwear", img: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=200&q=80" },
          { title: "Cashmere Crewneck", brand: "Arket", tag: "Knitwear", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=200&q=80" },
          { title: "Pleated Wool Trousers", brand: "Studio Nicholson", tag: "Bottoms", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=200&q=80" },
        ].map((g, idx) => (
          <Card key={idx} className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={g.img} alt={g.title} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <div className="text-xs font-semibold">{g.title}</div>
                <div className="text-[11px] text-neutral-500">{g.brand} • {g.tag}</div>
              </div>
            </div>
            <button onClick={() => setShowSwap(true)} className="text-xs text-[#C4623A] font-semibold hover:underline">
              Swap piece
            </button>
          </Card>
        ))}
      </div>

      <div className="space-y-2 pt-2">
        <Button fullWidth variant={worn ? 'outline' : 'primary'} onClick={() => setWorn(true)}>
          <Check size={16} className="mr-2" /> {worn ? "Worn Today!" : "Wear This Look Today"}
        </Button>
        <Button fullWidth variant="ghost" onClick={() => navigate('/try-on')}>
          <Sparkles size={16} className="mr-2" /> Try on Avatar (3D View)
        </Button>
      </div>

      <SwapPiecesSheet isOpen={showSwap} onClose={() => setShowSwap(false)} onApplySwap={() => {}} />
    </div>
  );
}
