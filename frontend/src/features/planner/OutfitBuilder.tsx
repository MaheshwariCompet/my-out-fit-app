import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  ArrowLeft, RefreshCw, Sparkles, Check, 
  Calendar, Layers, Plus, Filter, Shirt 
} from 'lucide-react';
import { useWardrobe, Garment, Outfit } from '../../context/WardrobeContext';

export default function OutfitBuilder() {
  const navigate = useNavigate();
  const { garments, selectOutfitForTryOn } = useWardrobe();

  // Active selections across slots
  const [selectedTop, setSelectedTop] = useState<Garment | null>(
    garments.find(g => g.category === 'tops' || g.category === 'knitwear') || null
  );
  const [selectedBottom, setSelectedBottom] = useState<Garment | null>(
    garments.find(g => g.category === 'bottoms') || null
  );
  const [selectedOuter, setSelectedOuter] = useState<Garment | null>(
    garments.find(g => g.category === 'outerwear') || null
  );
  const [selectedShoes, setSelectedShoes] = useState<Garment | null>(
    garments.find(g => g.category === 'footwear') || null
  );
  const [selectedAccessory, setSelectedAccessory] = useState<Garment | null>(
    garments.find(g => g.category === 'accessories') || null
  );

  const [activeSlot, setActiveSlot] = useState<'outerwear' | 'tops' | 'bottoms' | 'footwear' | 'accessories'>('tops');

  // Intelligent Shuffle for a full ensemble
  const handleShuffleCombinations = () => {
    const randomPick = (cat: string) => {
      const items = garments.filter(g => g.category === cat);
      return items.length > 0 ? items[Math.floor(Math.random() * items.length)] : null;
    };

    setSelectedTop(randomPick('tops') || randomPick('knitwear'));
    setSelectedBottom(randomPick('bottoms'));
    setSelectedOuter(randomPick('outerwear'));
    setSelectedShoes(randomPick('footwear'));
    setSelectedAccessory(randomPick('accessories'));
  };

  const stagedPieces = [selectedOuter, selectedTop, selectedBottom, selectedShoes, selectedAccessory].filter(
    (g): g is Garment => Boolean(g)
  );

  const synergyScore = stagedPieces.length >= 4 ? 98 : stagedPieces.length === 3 ? 94 : 88;

  const currentOutfit: Outfit = {
    id: `custom-mix-${Date.now()}`,
    title: `${selectedTop?.title || 'Bespoke'} & ${selectedBottom?.title || 'Tailored'} Mix`,
    occasion: 'Weekly Planned Ensemble',
    notes: `Curated mix & match containing ${stagedPieces.length} active layers.`,
    synergy_score: synergyScore,
    comfort_rating: 9.6,
    is_saved: true,
    pieces: stagedPieces
  };

  const handleApplyToPlan = () => {
    selectOutfitForTryOn(currentOutfit);
    navigate('/planner');
  };

  const handleTryOn3D = () => {
    selectOutfitForTryOn(currentOutfit);
    navigate('/try-on');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full px-2 sm:px-4 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <span className="text-[10px] font-bold text-[#C4623A] uppercase tracking-wider">
              Combinatorial Studio
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
              AI Mix & Match Combinations
            </h1>
          </div>
        </div>

        <button
          onClick={handleShuffleCombinations}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#C4623A] text-[#C4623A] font-semibold text-xs hover:bg-[#C4623A]/10 transition-colors"
        >
          <RefreshCw size={14} /> Smart Shuffle Wardrobe
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive 5-Slot Staging Rack (7 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Staged Ensemble ({stagedPieces.length} Pieces) • Synergy Score: <span className="text-emerald-600 font-bold">{synergyScore}%</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { slot: 'outerwear', label: '01. Outerwear', item: selectedOuter, setItem: setSelectedOuter },
              { slot: 'tops', label: '02. Top / Knit', item: selectedTop, setItem: setSelectedTop },
              { slot: 'bottoms', label: '03. Bottoms', item: selectedBottom, setItem: setSelectedBottom },
              { slot: 'footwear', label: '04. Shoes', item: selectedShoes, setItem: setSelectedShoes },
              { slot: 'accessories', label: '05. Accessories', item: selectedAccessory, setItem: setSelectedAccessory }
            ].map(({ slot, label, item, setItem }) => {
              const isActive = activeSlot === slot;
              return (
                <Card
                  key={slot}
                  onClick={() => setActiveSlot(slot as any)}
                  className={`p-3 space-y-2 cursor-pointer transition-all rounded-2xl relative ${
                    isActive 
                      ? 'border-2 border-[#C4623A] bg-[#C4623A]/5 shadow-sm' 
                      : 'border border-[#E8E2D9] dark:border-[#2A313D] hover:border-neutral-400'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase text-neutral-400">
                    <span>{label}</span>
                    {item && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setItem(null); }}
                        className="text-neutral-400 hover:text-red-500"
                        title="Remove piece"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                    {item ? (
                      <img src={item.image_url || (item as any).img} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-[11px] text-neutral-400 text-center p-2">
                        + Select {slot}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate text-[#1F2F4F] dark:text-[#FAF8F5]">
                      {item ? item.title : 'Empty Slot'}
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate">
                      {item ? item.brand : 'Tap to populate'}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex gap-3 pt-2">
            <Button fullWidth variant="primary" size="lg" onClick={handleApplyToPlan} className="text-xs font-semibold">
              <Calendar size={16} className="mr-1.5" /> Apply Look to Weekly Planner
            </Button>
            <Button variant="outline" size="lg" onClick={handleTryOn3D} className="text-xs font-semibold shrink-0 px-6">
              <Sparkles size={16} className="mr-1.5 text-[#C4623A]" /> 3D Try-On
            </Button>
          </div>
        </div>

        {/* Right: Wardrobe Picker for the Selected Slot (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-[#E8E2D9] dark:border-[#2A313D]">
            <span className="text-xs font-bold text-[#1F2F4F] dark:text-[#FAF8F5] uppercase tracking-wider">
              Pick {activeSlot.toUpperCase()} from Closet
            </span>
            <span className="text-[11px] text-neutral-400">
              {garments.filter(g => g.category === activeSlot || (activeSlot === 'tops' && g.category === 'knitwear')).length} available
            </span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {garments
              .filter(g => g.category === activeSlot || (activeSlot === 'tops' && g.category === 'knitwear'))
              .map(garment => (
                <div
                  key={garment.id}
                  onClick={() => {
                    if (activeSlot === 'outerwear') setSelectedOuter(garment);
                    if (activeSlot === 'tops') setSelectedTop(garment);
                    if (activeSlot === 'bottoms') setSelectedBottom(garment);
                    if (activeSlot === 'footwear') setSelectedShoes(garment);
                    if (activeSlot === 'accessories') setSelectedAccessory(garment);
                  }}
                  className="p-3 rounded-2xl border border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#1B1F27] hover:border-[#C4623A] transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={garment.image_url || (garment as any).img} 
                      alt={garment.title} 
                      className="w-12 h-12 rounded-xl object-cover" 
                    />
                    <div>
                      <div className="text-xs font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">{garment.title}</div>
                      <div className="text-[11px] text-neutral-500">{garment.brand} • {garment.color_name}</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#C4623A]">+ Select</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}