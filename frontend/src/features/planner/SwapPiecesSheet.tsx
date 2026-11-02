import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { X, Check } from 'lucide-react';

interface SwapSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySwap: (newItemId: string) => void;
}

export default function SwapPiecesSheet({ isOpen, onClose, onApplySwap }: SwapSheetProps) {
  const [selectedId, setSelectedId] = useState('alt-1');

  if (!isOpen) return null;

  const currentPiece = {
    title: 'Camel Trench',
    brand: 'Khaite',
    matchScore: 96,
    temp: '14°C',
    img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=300&q=80',
  };

  const alternatives = [
    {
      id: 'alt-1',
      title: 'Double-Breasted Wool Blazer',
      brand: 'Totême',
      tone: 'Midnight Navy',
      thermal: '15°C Suitable',
      matchScore: 98,
      img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'alt-2',
      title: 'Houndstooth Wool Overcoat',
      brand: 'Studio Nicholson',
      tone: 'Charcoal / Ecru',
      thermal: '11°C Extra Warm',
      matchScore: 94,
      img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'alt-3',
      title: 'Belted Alpaca Cardigan',
      brand: 'Lemaire',
      tone: 'Soft Heather Taupe',
      thermal: '16°C Cozy Layer',
      matchScore: 91,
      img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'alt-4',
      title: 'Crisp Poplin Overshirt',
      brand: 'The Row',
      tone: 'Optical White',
      thermal: '18°C Mild',
      matchScore: 88,
      img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=300&q=80',
    },
  ];

  const activeAlternative = alternatives.find((a) => a.id === selectedId) || alternatives[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-[#FAF8F5] dark:bg-[#1B1F27] rounded-t-3xl sm:rounded-3xl w-full max-w-lg p-5 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D9] dark:border-[#2A313D]">
          <div>
            <span className="text-[10px] font-semibold text-[#C4623A] uppercase tracking-wider">
              Wardrobe Curate
            </span>
            <h2 className="font-serif text-lg font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
              Swap Layer / Garment
            </h2>
            <p className="text-[11px] text-neutral-500">
              Replace current outerwear for Wednesday's Midweek Strategy look
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-neutral-500 dark:text-neutral-400"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Current vs Alternative Visual Comparison */}
        <div className="grid grid-cols-2 gap-3 items-center">
          <Card className="p-2.5 text-center space-y-1">
            <span className="text-[10px] uppercase font-semibold text-neutral-400">Current</span>
            <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100">
              <img
                src={currentPiece.img}
                alt={currentPiece.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs font-semibold truncate mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">
              {currentPiece.title}
            </div>
            <div className="text-[10px] text-neutral-400">{currentPiece.brand}</div>
            <span className="inline-block text-[10px] font-medium text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
              {currentPiece.matchScore}% Cohesion • {currentPiece.temp}
            </span>
          </Card>

          <Card className="p-2.5 text-center space-y-1 border-[#C4623A] bg-[#C4623A]/5">
            <span className="text-[10px] uppercase font-semibold text-[#C4623A]">+2% Match Boost</span>
            <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100">
              <img
                src={activeAlternative.img}
                alt={activeAlternative.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs font-semibold truncate mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">
              {activeAlternative.title}
            </div>
            <div className="text-[10px] text-neutral-400">{activeAlternative.brand}</div>
            <span className="inline-block text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              {activeAlternative.matchScore}% Synergy • {activeAlternative.thermal}
            </span>
          </Card>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto text-[11px] font-medium pb-1">
          <button
            type="button"
            className="px-3 py-1 rounded-full bg-[#1F2F4F] text-white whitespace-nowrap"
          >
            All Compatible (6)
          </button>
          <button
            type="button"
            className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 whitespace-nowrap"
          >
            Outerwear
          </button>
          <button
            type="button"
            className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 whitespace-nowrap"
          >
            Blazers
          </button>
        </div>

        {/* Compatible Options List */}
        <div className="space-y-2">
          {alternatives.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-[#C4623A] bg-white dark:bg-[#121418] shadow-sm'
                    : 'border-[#E8E2D9] dark:border-[#2A313D] bg-white/60 dark:bg-[#1B1F27]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-12 h-12 rounded-xl object-cover bg-neutral-100"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold text-[#C4623A]">
                        {item.matchScore}% Match
                      </span>
                      <span className="text-[10px] text-neutral-400">• {item.brand}</span>
                    </div>
                    <div className="text-xs font-semibold text-[#1F2F4F] dark:text-[#FAF8F5]">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      {item.tone} • Thermal: {item.thermal}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-[#1F2F4F] dark:bg-white text-white dark:text-[#1F2F4F]'
                      : 'border border-neutral-300 dark:border-neutral-700'
                  }`}
                >
                  {isSelected && <Check size={12} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stylist Insight Note */}
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
          <strong className="font-semibold block text-[#C4623A]">Stylist Insight</strong>
          Swapping to the Totême Navy Blazer elevates tailoring contrast for your executive client presentation at 2:00 PM.
        </div>

        {/* Action CTAs */}
        <div className="space-y-2 pt-1">
          <Button
            type="button"
            fullWidth
            variant="primary"
            onClick={() => {
              onApplySwap(selectedId);
              onClose();
            }}
          >
            Apply Swap & Update Look
          </Button>
          <Button type="button" fullWidth variant="ghost" onClick={onClose}>
            Keep Original Piece
          </Button>
        </div>
      </div>
    </div>
  );
}