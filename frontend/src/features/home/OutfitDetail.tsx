import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Bookmark,
  Share2,
  Check,
  ArrowRight,
} from "lucide-react";
import SwapPiecesSheet from "../planner/SwapPiecesSheet";
import { useWardrobe, Garment } from "../../context/WardrobeContext";

export default function OutfitDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    outfits,
    swapGarmentInOutfit,
    toggleSaveOutfit,
    selectOutfitForTryOn,
    markWornToday,
    hasWornToday,
    streakCount,
  } = useWardrobe();

  const outfit = outfits.find((o) => o.id === (id || "outfit-1")) || outfits[0];
  const [isSwapOpen, setIsSwapOpen] = useState(false);
  const [garmentToSwap, setGarmentToSwap] = useState<Garment | null>(null);

  const handleOpenSwap = (garment?: Garment) => {
    setGarmentToSwap(garment || outfit.pieces[0]);
    setIsSwapOpen(true);
  };

  const handleApplySwap = (newGarment: Garment) => {
    if (garmentToSwap) {
      swapGarmentInOutfit(outfit.id, garmentToSwap.id, newGarment);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 px-2 sm:px-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="text-center">
          <span className="text-[10px] font-bold text-[#C4623A] uppercase tracking-wider">
            Curated Look
          </span>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
            {outfit.title}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toggleSaveOutfit(outfit.id, isSwapOpen)}
            className={`p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] transition-colors ${outfit.is_saved ? "text-[#C4623A] bg-[#C4623A]/10 border-[#C4623A]" : ""}`}
            aria-label="Save Look"
          >
            <Bookmark size={18} />
          </button>
        </div>
      </div>

      {/* Main Grid: Visual Canvas on Left, Details & Garments on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Dynamic Visual Flatlay */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="overflow-hidden p-0 border border-[#E8E2D9] dark:border-[#2A313D] shadow-lg rounded-3xl relative group">
            <div className="relative aspect-[4/5] w-full bg-neutral-900">
              <img
                src={
                  outfit.pieces[0]?.image_url ||
                  "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
                }
                alt={outfit.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#1F2F4F]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-300">
                  {outfit.synergy_score}% Synergy
                </span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white">
                  {outfit.occasion}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="font-serif text-2xl font-bold text-white drop-shadow-sm">
                  {outfit.title}
                </h2>
                <p className="text-xs text-neutral-200 mt-1">{outfit.notes}</p>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-[#1B1F27] flex gap-3">
              <Button
                fullWidth
                variant={hasWornToday ? "outline" : "primary"}
                onClick={() => markWornToday}
                className="flex items-center justify-center gap-2"
              >
                <Check
                  size={16}
                  className={hasWornToday ? "text-emerald-500" : ""}
                />
                {hasWornToday
                  ? `Wearing Today (${streakCount}-Day Streak!)`
                  : "Wear This Today"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  selectOutfitForTryOn(outfit);
                  navigate("/try-on");
                }}
                className="flex items-center justify-center gap-1.5 shrink-0"
              >
                <Sparkles size={16} className="text-[#C4623A]" /> 3D Try-On
              </Button>
            </div>
          </Card>
        </div>

        {/* Right: Garment Layer Breakdown with Interactive Swap */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
              Garments in this Look ({outfit.pieces.length})
            </h3>
            <button
              onClick={() => handleOpenSwap()}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#C4623A] hover:underline"
            >
              <RefreshCw size={13} /> Swap Layer
            </button>
          </div>

          <div className="space-y-3">
            {outfit.pieces.map((piece, idx) => (
              <Card
                key={piece.id}
                className="p-3.5 flex items-center justify-between rounded-2xl hover:border-[#C4623A] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-16 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                    <img
                      src={piece.image_url}
                      alt={piece.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#C4623A] tracking-wider">
                      Layer 0{idx + 1} • {piece.category}
                    </span>
                    <h4 className="text-xs font-bold text-[#1F2F4F] dark:text-[#FAF8F5] mt-0.5">
                      {piece.title}
                    </h4>
                    <p className="text-[11px] text-neutral-500">
                      {piece.brand} • {piece.purchase_price}
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleOpenSwap(piece)}
                  className="text-xs font-semibold text-[#C4623A] hover:bg-[#C4623A]/10"
                >
                  Swap
                </Button>
              </Card>
            ))}
          </div>

          <Card className="p-4 space-y-2 rounded-2xl bg-amber-500/10 border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong className="font-semibold block text-[#C4623A]">
              Thermal & Drape Cohesion
            </strong>
            This configuration provides optimal temperature comfort between 14°C
            and 18°C. Wool tailoring creates clean vertical lines over the soft
            cashmere knit.
          </Card>
        </div>
      </div>

      {/* Interactive Swap Sheet */}
      <SwapPiecesSheet
        isOpen={isSwapOpen}
        onClose={() => setIsSwapOpen(false)}
        currentPiece={garmentToSwap || outfit.pieces[0]}
        onApplySwap={(newPiece) => {
          handleApplySwap(newPiece);
          setIsSwapOpen(false);
        }}
      />
    </div>
  );
}
