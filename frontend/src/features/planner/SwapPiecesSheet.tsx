import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { X, Check } from 'lucide-react';
import { Garment, useWardrobe } from '../../context/WardrobeContext';

interface SwapSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentPiece?: Garment;
  onApplySwap: (newGarment: Garment) => void;
}

export default function SwapPiecesSheet({ isOpen, onClose, currentPiece, onApplySwap }: SwapSheetProps) {
  const { garments } = useWardrobe();
  const availableAlternatives = garments.filter(g => g.id !== currentPiece?.id);
  const [selectedGarment, setSelectedGarment] = useState<Garment>(availableAlternatives[0] || garments[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-[#FAF8F5] dark:bg-[#1B1F27] rounded-t-3xl sm:rounded-3xl w-full max-w-lg p-5 space-y-4 max-h-[90vh] overflow-y-auto border border-[#E8E2D9] dark:border-[#2A313D] shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D9] dark:border-[#2A313D]">
          <div>
            <span className="text-[10px] font-bold text-[#C4623A] uppercase tracking-wider">Wardrobe Curate</span>
            <h2 className="font-serif text-lg font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">Swap Layer Piece</h2>
            <p className="text-[11px] text-neutral-500">Select a replacement from your cataloged wardrobe</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Current vs Replacement Comparison */}
        <div className="grid grid-cols-2 gap-3 items-center">
          <Card className="p-2.5 text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-neutral-400">Current</span>
            <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100">
              <img src={currentPiece?.image_url} alt={currentPiece?.title} className="w-full h-full object-cover" />
            </div>
            <div className="text-xs font-bold truncate mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">{currentPiece?.title}</div>
            <div className="text-[10px] text-neutral-400">{currentPiece?.brand}</div>
          </Card>

          <Card className="p-2.5 text-center space-y-1 border-[#C4623A] bg-[#C4623A]/5">
            <span className="text-[10px] uppercase font-bold text-[#C4623A]">Selected Alternate</span>
            <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100">
              <img src={selectedGarment?.image_url} alt={selectedGarment?.title} className="w-full h-full object-cover" />
            </div>
            <div className="text-xs font-bold truncate mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">{selectedGarment?.title}</div>
            <div className="text-[10px] text-neutral-400">{selectedGarment?.brand}</div>
          </Card>
        </div>

        {/* Available Wardrobe Alternatives List */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-neutral-500 uppercase">Available Pieces in Closet</span>
          {availableAlternatives.map(item => {
            const isSelected = selectedGarment?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedGarment(item)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected 
                    ? 'border-[#C4623A] bg-white dark:bg-[#121418] shadow-sm' 
                    : 'border-[#E8E2D9] dark:border-[#2A313D] bg-white/60 dark:bg-[#1B1F27]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={item.image_url} alt={item.title} className="w-12 h-12 rounded-xl object-cover bg-neutral-100" />
                  <div>
                    <span className="text-[10px] font-bold text-[#C4623A] capitalize">{item.category} • {item.brand}</span>
                    <div className="text-xs font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">{item.title}</div>
                    <div className="text-[11px] text-neutral-500">{item.fabric_composition}</div>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#C4623A] text-white' : 'border border-neutral-300'}`}>
                  {isSelected && <Check size={12} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Confirm Action */}
        <div className="space-y-2 pt-2">
          <Button 
            fullWidth 
            variant="primary" 
            onClick={() => {
              if (selectedGarment) onApplySwap(selectedGarment);
            }}
          >
            Apply Swap & Update Look
          </Button>
          <Button fullWidth variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}