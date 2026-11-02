import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Clock, ShieldCheck, Plus, Sparkles, ExternalLink, CheckCircle } from 'lucide-react';

const WISHLIST_ITEMS = [
  {
    id: "wish-1",
    title: "Tailored Trench",
    brand: "Sandro Studio",
    price: 380,
    pairsCount: 5,
    cooldownHoursLeft: 14,
    img: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "wish-2",
    title: "Silk Crepe Slip",
    brand: "Cocoa Hue",
    price: 195,
    pairsCount: 3,
    cooldownHoursLeft: 6,
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "wish-3",
    title: "Leather Loafers",
    brand: "Totême",
    price: 260,
    pairsCount: 7,
    cooldownHoursLeft: 0,
    img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "wish-4",
    title: "Alpaca Knit Sweater",
    brand: "Sézane",
    price: 210,
    pairsCount: 4,
    cooldownHoursLeft: 21,
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80"
  }
];

export default function WishlistScreen() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full px-2 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[#C4623A] uppercase tracking-wider">
              Mindful Consumption
            </span>
            <span className="text-xs text-neutral-500 font-medium">4 Prospective Pieces • 24h Reflection Buffer</span>
          </div>
          <h1 className="font-serif text-3xl font-bold mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">
            Curated Wishlist
          </h1>
        </div>

        <Button 
          variant="primary" 
          size="md" 
          onClick={() => navigate('/wishlist/check')} 
          className="flex items-center gap-2 text-xs font-semibold shadow-sm"
        >
          <Plus size={16} /> Pre-Purchase URL Check
        </Button>
      </div>

      {/* Mindful Cooldown Explainer Banner */}
      <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <Clock size={20} className="shrink-0 text-[#C4623A] mt-0.5" />
        <div className="space-y-0.5">
          <strong className="font-semibold block text-[#C4623A]">Mindful Reflection Cooldown Enforced</strong>
          Newly saved pieces stay locked for 24 hours to prevent impulsive purchases. During this window, you can test how each piece pairs against your 42 registered garments.
        </div>
      </div>

      {/* 4-Column Grid for Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {WISHLIST_ITEMS.map((item) => (
          <Card key={item.id} className="p-4 space-y-3 rounded-3xl border border-[#E8E2D9] dark:border-[#2A313D] flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {item.cooldownHoursLeft > 0 ? (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] text-white flex items-center gap-1.5 shadow-md">
                    <Clock size={12} className="text-amber-400" />
                    <span>{item.cooldownHoursLeft}h cooldown left</span>
                  </div>
                ) : (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-600 text-[11px] text-white flex items-center gap-1.5 shadow-md">
                    <CheckCircle size={12} />
                    <span>Ready to review</span>
                  </div>
                )}
              </div>

              <div>
                <span className="inline-block text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full mb-1">
                  Pairs with {item.pairsCount} items in your closet
                </span>
                <h3 className="font-serif font-bold text-base text-[#1F2F4F] dark:text-[#FAF8F5]">{item.title}</h3>
                <p className="text-xs text-neutral-500">{item.brand} • ${item.price}</p>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                fullWidth 
                onClick={() => navigate('/try-on')}
                className="text-xs"
              >
                Try on Avatar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}