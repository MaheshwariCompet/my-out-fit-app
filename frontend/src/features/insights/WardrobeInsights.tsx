import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, PieChart, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import { useWardrobe } from '../../context/WardrobeContext';

export default function WardrobeInsights() {
  const navigate = useNavigate();
  const { garments } = useWardrobe();

  const total = garments.length || 1;
  const categories = {
    tops: garments.filter(g => g.category === 'tops' || g.category === 'knitwear').length,
    bottoms: garments.filter(g => g.category === 'bottoms').length,
    outerwear: garments.filter(g => g.category === 'outerwear').length,
    footwear: garments.filter(g => g.category === 'footwear').length,
    accessories: garments.filter(g => g.category === 'accessories').length,
  };

  const dormantPieces = garments.filter(g => (g.wear_count || 0) <= 2);

  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full px-2 sm:px-4 pb-12">
      <div className="flex items-center gap-3 pb-3 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <button 
          type="button" 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="text-[10px] font-bold text-[#C4623A] uppercase tracking-wider">Algorithmic Balance</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
            Wardrobe Insights & Health
          </h1>
        </div>
      </div>

      <Card className="space-y-4 p-5 rounded-3xl">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-[#1F2F4F] dark:text-[#FAF8F5] uppercase tracking-wider">
            Category Balance Matrix ({garments.length} Total Pieces)
          </span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            High Capsule Equilibrium
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
            <span className="text-[10px] text-neutral-400 font-semibold uppercase">Tops & Knits</span>
            <div className="font-bold text-base mt-1">{categories.tops} ({Math.round((categories.tops/total)*100)}%)</div>
          </div>
          <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
            <span className="text-[10px] text-neutral-400 font-semibold uppercase">Bottoms</span>
            <div className="font-bold text-base mt-1">{categories.bottoms} ({Math.round((categories.bottoms/total)*100)}%)</div>
          </div>
          <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
            <span className="text-[10px] text-neutral-400 font-semibold uppercase">Outerwear</span>
            <div className="font-bold text-base mt-1">{categories.outerwear} ({Math.round((categories.outerwear/total)*100)}%)</div>
          </div>
          <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
            <span className="text-[10px] text-neutral-400 font-semibold uppercase">Footwear</span>
            <div className="font-bold text-base mt-1">{categories.footwear} ({Math.round((categories.footwear/total)*100)}%)</div>
          </div>
          <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
            <span className="text-[10px] text-neutral-400 font-semibold uppercase">Accessories</span>
            <div className="font-bold text-base mt-1">{categories.accessories} ({Math.round((categories.accessories/total)*100)}%)</div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
            Dormant Pieces to Revive ({dormantPieces.length})
          </h2>
          <span className="text-xs text-neutral-400">Garments with ≤ 2 wears</span>
        </div>

        {dormantPieces.length === 0 ? (
          <p className="text-xs text-neutral-500">All cataloged garments are actively in your weekly rotation.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dormantPieces.map(piece => (
              <Card key={piece.id} className="p-3 flex items-center justify-between rounded-2xl">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={piece.image_url} alt={piece.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-[#1F2F4F] dark:text-[#FAF8F5] truncate">{piece.title}</h3>
                    <p className="text-[10px] text-neutral-400">{piece.brand} • {piece.wear_count} lifetime wears</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => navigate('/planner', { state: { anchorGarmentId: piece.id } })}
                  className="text-xs shrink-0"
                >
                  Plan In Look
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}