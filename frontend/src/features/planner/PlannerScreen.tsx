import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Sparkles, RefreshCw, Luggage, History, Scissors, Layers, 
  Check, Calendar as CalendarIcon, ArrowLeft
} from 'lucide-react';
import { useWardrobe, Outfit, Garment } from '../../context/WardrobeContext';

export default function PlannerScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { outfits, garments, selectOutfitForTryOn } = useWardrobe();

  const [selectedDay, setSelectedDay] = useState(25);
  const [selectedOptionKey, setSelectedOptionKey] = useState<'A' | 'B'>('A');

  // 1. Read anchorGarmentId if passed from GarmentDetail.tsx
  const anchorGarmentId = (location.state as any)?.anchorGarmentId;
  const anchorGarment = garments.find(g => g.id === anchorGarmentId);

  // 2. Build Option A dynamically around the chosen garment
  const [optionA, setOptionA] = useState<Outfit | null>(null);
  const [optionB, setOptionB] = useState<Outfit | null>(null);

  useEffect(() => {
    if (anchorGarment) {
      // Find complementary pieces for this anchor piece
      const complements = garments
        .filter(g => g.id !== anchorGarment.id && g.category !== anchorGarment.category)
        .slice(0, 3);

      const dynamicAnchorOutfit: Outfit = {
        id: `planned-${anchorGarment.id}`,
        title: `${anchorGarment.title} Composition`,
        occasion: 'Midweek Strategy Presentation',
        notes: `Hand-curated ensemble anchored by ${anchorGarment.brand} ${anchorGarment.title}`,
        synergy_score: 97,
        comfort_rating: 9.8,
        is_saved: true,
        pieces: [anchorGarment, ...complements]
      };

      setOptionA(dynamicAnchorOutfit);
      setOptionB(outfits[1] || outfits[0] || null);
      setSelectedOptionKey('A');
    } else {
      setOptionA(outfits[0] || null);
      setOptionB(outfits[1] || outfits[0] || null);
    }
  }, [anchorGarmentId, garments, outfits]);

  const activeSelectedOutfit: Outfit | null = selectedOptionKey === 'A' ? optionA : optionB;

  const scheduleDays = [
    { day: 'Mon', date: 23, title: 'Client Presentation', weather: '14°C Rain' },
    { day: 'Tue', date: 24, title: 'Creative Studio Review', weather: '15°C Overcast' },
    { day: 'Wed', date: 25, title: 'Midweek Strategy', weather: '18°C Mild', isToday: true },
    { day: 'Thu', date: 26, title: 'Casual Offsite', weather: '17°C Clear' },
    { day: 'Fri', date: 27, title: 'Gallery Opening', weather: '12°C Night' },
    { day: 'Sat', date: 28, title: 'Weekend Market', weather: '16°C Sun' },
    { day: 'Sun', date: 29, title: 'Sunday Brunch', weather: '18°C Clear' },
  ];

  const handleConfirmAndTryOn = () => {
    if (activeSelectedOutfit) {
      selectOutfitForTryOn(activeSelectedOutfit);
    }
    navigate('/try-on');
  };

  const handleEditLayers = () => {
    navigate('/planner/create-look', { 
      state: { outfitId: activeSelectedOutfit?.id, customOutfit: activeSelectedOutfit } 
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full px-2 sm:px-4">
      {/* Anchor Notification Banner */}
      {anchorGarment && (
        <div className="p-3.5 rounded-2xl bg-[#C4623A]/10 border border-[#C4623A]/30 text-xs flex items-center justify-between text-[#C4623A] animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C4623A] animate-ping" />
            <span>
              Anchored look configured for <strong>{anchorGarment.title}</strong> for Wednesday's Presentation.
            </span>
          </div>
          <button 
            onClick={() => navigate('/planner', { replace: true, state: {} })}
            className="text-[11px] font-bold underline"
          >
            Clear Anchor
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#C4623A]/10 text-[#C4623A] uppercase tracking-wider">
              October 23 – 29
            </span>
            <span className="text-xs text-neutral-500 font-medium">Synced with Calendar</span>
          </div>
          <h1 className="font-serif text-3xl font-bold mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">
            Weekly Outfit Planner
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="md" onClick={() => navigate('/planner/saved')} className="text-xs">
            Saved Plans ({outfits.length})
          </Button>
          <Button variant="primary" size="md" onClick={() => navigate('/planner/new')} className="text-xs font-semibold">
            + New Plan
          </Button>
        </div>
      </div>

      {/* Date Carousel */}
      <div className="grid grid-cols-7 gap-2">
        {scheduleDays.map((item) => {
          const isSelected = selectedDay === item.date;
          return (
            <button
              key={item.date}
              onClick={() => setSelectedDay(item.date)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                isSelected
                  ? 'bg-[#1F2F4F] text-white dark:bg-[#FAF8F5] dark:text-[#1F2F4F] shadow-md border-[#1F2F4F]'
                  : 'bg-white dark:bg-[#1B1F27] border-[#E8E2D9] dark:border-[#2A313D] text-neutral-600 dark:text-neutral-300'
              }`}
            >
              <div className="text-[11px] opacity-75 font-semibold uppercase">{item.day}</div>
              <div className="font-serif text-lg font-bold my-0.5">{item.date}</div>
              <div className="text-[10px] truncate opacity-80">{item.weather}</div>
            </button>
          );
        })}
      </div>

      {/* Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6 space-y-5 rounded-3xl border border-[#E8E2D9] dark:border-[#2A313D]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#C4623A] uppercase tracking-wider">
                  Wednesday, Oct {selectedDay} • Scheduled Canvas
                </span>
                <h2 className="font-serif text-xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
                  {activeSelectedOutfit ? activeSelectedOutfit.title : 'Midweek Strategy Presentation'}
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {activeSelectedOutfit?.notes || '18°C Mild Overcast • 2:00 PM Meeting'}
                </p>
              </div>

              <button 
                onClick={() => setSelectedOptionKey(selectedOptionKey === 'A' ? 'B' : 'A')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] text-xs font-semibold hover:border-[#C4623A]"
              >
                <RefreshCw size={14} className="text-[#C4623A]" /> Switch Option
              </button>
            </div>

            {/* Alternates Option Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {optionA && (
                <div 
                  onClick={() => setSelectedOptionKey('A')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedOptionKey === 'A' 
                      ? 'border-[#C4623A] bg-[#C4623A]/5 shadow-sm' 
                      : 'border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#121418] opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase text-[#C4623A]">
                      Option A {selectedOptionKey === 'A' ? '(Active)' : ''}
                    </span>
                    {selectedOptionKey === 'A' && <Check size={16} className="text-[#C4623A]" />}
                  </div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img 
                      src={optionA.pieces[0]?.image_url || (optionA.pieces[0] as any)?.img} 
                      alt={optionA.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="font-serif font-bold text-sm mt-3 text-[#1F2F4F] dark:text-[#FAF8F5]">
                    {optionA.title}
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                    {optionA.pieces.map(p => p.title).join(' + ')}
                  </p>
                </div>
              )}

              {optionB && (
                <div 
                  onClick={() => setSelectedOptionKey('B')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedOptionKey === 'B' 
                      ? 'border-[#C4623A] bg-[#C4623A]/5 shadow-sm' 
                      : 'border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#121418] opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase text-neutral-400">
                      Option B {selectedOptionKey === 'B' ? '(Active)' : ''}
                    </span>
                    {selectedOptionKey === 'B' && <Check size={16} className="text-[#C4623A]" />}
                  </div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img 
                      src={optionB.pieces[0]?.image_url || (optionB.pieces[0] as any)?.img} 
                      alt={optionB.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="font-serif font-bold text-sm mt-3 text-[#1F2F4F] dark:text-[#FAF8F5]">
                    {optionB.title}
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                    {optionB.pieces.map(p => p.title).join(' + ')}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                fullWidth 
                variant="primary" 
                onClick={handleConfirmAndTryOn} 
                size="lg" 
                className="text-sm font-semibold"
              >
                Confirm & Try on 3D Avatar
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleEditLayers} 
                className="px-6 text-sm shrink-0"
              >
                Edit Layers
              </Button>
            </div>
          </Card>
        </div>

        {/* Right: Utilities */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Wardrobe Intelligence Utilities
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card interactive onClick={() => navigate('/planner/travel-packing')} className="p-4 space-y-2 rounded-2xl">
              <div className="w-10 h-10 rounded-2xl bg-[#C4623A]/10 text-[#C4623A] flex items-center justify-center">
                <Luggage size={20} />
              </div>
              <div className="font-serif font-bold text-sm">Travel Packing</div>
              <p className="text-[11px] text-neutral-500">10kg Carry-on weight calculator & packing checklist</p>
            </Card>

            <Card interactive onClick={() => navigate('/planner/wear-history')} className="p-4 space-y-2 rounded-2xl">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <History size={20} />
              </div>
              <div className="font-serif font-bold text-sm">Wear History</div>
              <p className="text-[11px] text-neutral-500">12-Day deliberate styling streak & CPW tracker</p>
            </Card>

            <Card interactive onClick={() => navigate('/planner/fit-notes')} className="p-4 space-y-2 rounded-2xl">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
                <Scissors size={20} />
              </div>
              <div className="font-serif font-bold text-sm">Fit Notes</div>
              <p className="text-[11px] text-neutral-500">3 alteration logs, waist ease, and tailor tickets</p>
            </Card>

            <Card interactive onClick={() => navigate('/planner/builder')} className="p-4 space-y-2 rounded-2xl">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <Layers size={20} />
              </div>
              <div className="font-serif font-bold text-sm">Outfit Builder</div>
              <p className="text-[11px] text-neutral-500">Anchor garment assembler with smart layer drape</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}