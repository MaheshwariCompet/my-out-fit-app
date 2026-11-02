import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, PieChart, TrendingUp, Clock, AlertCircle } from 'lucide-react';

export default function WardrobeInsights() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="text-[10px] font-semibold text-[#C4623A] uppercase tracking-wider">Analytics & Balance</span>
          <h1 className="font-serif text-2xl font-bold">Wardrobe Insights</h1>
        </div>
      </div>

      <Card className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Closet Balance</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Equilibrium: High
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <span className="text-neutral-500">Tops & Shirts</span>
            <div className="font-bold text-sm mt-0.5">17 pcs (40%)</div>
          </div>
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <span className="text-neutral-500">Trousers & Bottoms</span>
            <div className="font-bold text-sm mt-0.5">11 pcs (25%)</div>
          </div>
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <span className="text-neutral-500">Outerwear</span>
            <div className="font-bold text-sm mt-0.5">8 pcs (20%)</div>
          </div>
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <span className="text-neutral-500">Footwear & Bags</span>
            <div className="font-bold text-sm mt-0.5">6 pcs (15%)</div>
          </div>
        </div>
      </Card>

      <Card className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Rotation Advisory</span>
        <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/10 text-xs text-amber-900 dark:text-amber-200">
          <AlertCircle size={16} className="text-[#C4623A] shrink-0 mt-0.5" />
          <span>3 pieces are currently resting after dry clean. Swap in your <strong>Selvedge Denim</strong> for tomorrow's casual look to balance rotation.</span>
        </div>
      </Card>

      <div className="space-y-3">
        <h2 className="font-serif text-sm font-bold">Revive Your Inactive Pieces</h2>
        <Card className="p-3 flex items-center justify-between">
          <div>
            <div className="font-semibold text-xs">Silk Slip Dress</div>
            <div className="text-[11px] text-neutral-500">Untouched for 48 days</div>
          </div>
          <Button size="sm" variant="outline" onClick={() => navigate('/planner/builder')}>
            Try in an outfit
          </Button>
        </Card>
      </div>
    </div>
  );
}
