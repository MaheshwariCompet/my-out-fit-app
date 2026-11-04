import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Bookmark, Sparkles, Check, Trash2 } from 'lucide-react';
import { useWardrobe } from '../../context/WardrobeContext';

export default function SavedOutfits() {
  const navigate = useNavigate();
  const { outfits, toggleSaveOutfit, selectOutfitForTryOn, markWornToday, hasWornToday } = useWardrobe();

  const savedList = outfits.filter(o => o.is_saved);

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full px-2 sm:px-4 pb-12">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <span className="text-[10px] font-bold text-[#C4623A] uppercase tracking-wider">Saved Capsules</span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
              Curated Rotations ({savedList.length})
            </h1>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={() => navigate('/planner/builder')}>
          + Build New Look
        </Button>
      </div>

      {savedList.length === 0 ? (
        <Card className="text-center py-16 space-y-3">
          <Bookmark size={32} className="mx-auto text-neutral-300" />
          <p className="text-sm text-neutral-500">No outfits saved yet. Bookmark looks from Home or the Planner to store them here.</p>
          <Button variant="primary" size="sm" onClick={() => navigate('/planner')}>
            Go to Planner
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedList.map(outfit => (
            <Card key={outfit.id} className="p-4 space-y-4 rounded-3xl border border-[#E8E2D9] dark:border-[#2A313D] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 relative">
                  <img 
                    src={outfit.pieces[0]?.image_url || 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80'} 
                    alt={outfit.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-3 left-3 bg-[#1F2F4F]/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-300">
                    {outfit.synergy_score}% Match
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSaveOutfit(outfit.id, true)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-[#C4623A] uppercase tracking-wider">{outfit.occasion}</span>
                  <h3 className="font-serif text-lg font-bold text-[#1F2F4F] dark:text-[#FAF8F5] truncate mt-0.5">{outfit.title}</h3>
                  <p className="text-xs text-neutral-500 line-clamp-1">{outfit.pieces.map(p => p.title).join(' • ')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8E2D9] dark:border-[#2A313D]">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    selectOutfitForTryOn(outfit);
                    navigate('/try-on');
                  }}
                  className="flex items-center justify-center gap-1.5 text-xs"
                >
                  <Sparkles size={14} className="text-[#C4623A]" /> 3D Try-On
                </Button>
                <Button 
                  size="sm" 
                  variant="primary"
                  onClick={() => markWornToday(outfit.id)}
                  className="flex items-center justify-center gap-1.5 text-xs"
                >
                  <Check size={14} /> Wear Today
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}