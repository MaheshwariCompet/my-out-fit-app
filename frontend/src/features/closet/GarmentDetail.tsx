import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusChip } from '../../components/ui/StatusChip';
import { ArrowLeft, Edit, Calendar, Sparkles, RefreshCw, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useWardrobe, Garment } from '../../context/WardrobeContext';

export default function GarmentDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { deleteGarment, outfits, selectOutfitForTryOn } = useWardrobe();

  const [garment, setGarment] = useState<Garment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGarment() {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);

        // Real Supabase API Hit for the specific item UUID
        const { data, error: fetchErr } = await supabase
          .from('closet_items')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchErr) throw fetchErr;

        setGarment({
          id: data.id,
          user_id: data.user_id,
          title: data.title,
          brand: data.brand || 'Atelier',
          category: data.category,
          status: data.status,
          purchase_price: Number(data.purchase_price) || 0,
          wear_count: data.wear_count || 0,
          color_name: data.color_name || 'Neutral',
          fabric_composition: data.fabric_composition || 'Natural Fiber Blend',
          care_instructions: data.care_instructions || 'Specialist care recommended',
          image_url: data.image_url || 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
        });
      } catch (err: any) {
        console.error('Failed to fetch garment:', err);
        setError(err.message || 'Garment not found');
      } finally {
        setLoading(false);
      }
    }

    fetchGarment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <RefreshCw className="animate-spin text-[#C4623A]" size={28} />
        <p className="text-xs text-neutral-500">Fetching garment specifications from vault...</p>
      </div>
    );
  }

  if (error || !garment) {
    return (
      <div className="text-center py-12 space-y-3">
        <p className="text-sm text-red-500">{error || 'Piece not found in closet.'}</p>
        <Button variant="outline" size="sm" onClick={() => navigate('/closet')}>
          Return to Closet
        </Button>
      </div>
    );
  }

  const cpw = garment.wear_count > 0 
    ? (garment.purchase_price / garment.wear_count).toFixed(2) 
    : garment.purchase_price.toFixed(2);

  // Dynamic pairings: Find real outfits in Supabase that include this garment
  const associatedOutfits = outfits.filter(o => o.pieces.some(p => p.id === garment.id));

  const handlePlanOutfit = () => {
    // Navigate to planner with this garment's context passed via state
    navigate('/planner', { state: { anchorGarmentId: garment.id } });
  };

  const handleTryOn = () => {
    // If this piece belongs to an outfit, use that outfit; otherwise make a virtual outfit
    const targetOutfit = associatedOutfits[0] || {
      id: `virtual-${garment.id}`,
      title: `${garment.title} Silhouette`,
      occasion: 'Individual Fitting',
      notes: `${garment.title} standalone test`,
      synergy_score: 95,
      comfort_rating: 9.5,
      is_saved: false,
      pieces: [garment]
    };
    selectOutfitForTryOn(targetOutfit);
    navigate('/try-on');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 px-2 sm:px-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Garment Specifications
        </span>
        <button 
          onClick={() => navigate(`/closet/item/${garment.id}/edit`)} 
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Edit Garment"
        >
          <Edit size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Image & Quick Metric Chips */}
        <div className="md:col-span-5 space-y-4">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-md border border-[#E8E2D9] dark:border-[#2A313D]">
            <img 
              src={garment.image_url} 
              alt={garment.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute top-4 left-4">
              <StatusChip status={garment.status} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card className="text-center p-3">
              <div className="text-[10px] text-neutral-500 uppercase font-medium">Lifetime Wears</div>
              <div className="font-serif text-xl font-bold mt-0.5 text-[#1F2F4F] dark:text-[#FAF8F5]">
                {garment.wear_count}
              </div>
            </Card>
            <Card className="text-center p-3">
              <div className="text-[10px] text-neutral-500 uppercase font-medium">Cost / Wear</div>
              <div className="font-serif text-xl font-bold mt-0.5 text-[#C4623A]">
                ${cpw}
              </div>
            </Card>
          </div>
        </div>

        {/* Right: Real Specifications & Actions */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <span className="text-[10px] font-bold text-[#C4623A] uppercase tracking-wider">
              {garment.brand} • {garment.category}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5] mt-0.5">
              {garment.title}
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Acquisition Value: ${garment.purchase_price.toFixed(2)}
            </p>
          </div>

          <Card className="space-y-3">
            <h2 className="font-serif text-sm font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
              Fabric & Care Details
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#E8E2D9] dark:border-[#2A313D]">
                <span className="text-neutral-500">Fabric Composition</span>
                <span className="font-semibold text-right text-[#1F2F4F] dark:text-[#FAF8F5]">
                  {garment.fabric_composition}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E8E2D9] dark:border-[#2A313D]">
                <span className="text-neutral-500">Color Palette</span>
                <span className="font-semibold text-[#1F2F4F] dark:text-[#FAF8F5]">
                  {garment.color_name}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Care Instructions</span>
                <span className="font-semibold text-right max-w-[220px] text-[#1F2F4F] dark:text-[#FAF8F5]">
                  {garment.care_instructions}
                </span>
              </div>
            </div>
          </Card>

          {/* Real Pairings from DB Outfits */}
          <div className="space-y-2">
            <h3 className="font-serif text-sm font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
              Cataloged Outfits Containing This Piece ({associatedOutfits.length})
            </h3>
            {associatedOutfits.length === 0 ? (
              <p className="text-xs text-neutral-400">Not assigned to any saved ensemble yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {associatedOutfits.map(outfit => (
                  <Card 
                    key={outfit.id} 
                    interactive 
                    onClick={() => navigate(`/outfit/${outfit.id}`)}
                    className="p-2.5 flex items-center gap-2.5"
                  >
                    <img 
                      src={outfit.pieces[0]?.image_url || outfit.pieces[0]?.image_url || garment.image_url} 
                      alt={outfit.title} 
                      className="w-12 h-12 rounded-xl object-cover shrink-0" 
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate text-[#1F2F4F] dark:text-[#FAF8F5]">
                        {outfit.title}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-semibold">
                        {outfit.synergy_score}% Match
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <Button 
              variant="outline" 
              onClick={handlePlanOutfit} 
              className="flex items-center justify-center gap-2 text-xs"
            >
              <Calendar size={16} /> Plan Outfit
            </Button>
            <Button 
              variant="primary" 
              onClick={handleTryOn} 
              className="flex items-center justify-center gap-2 text-xs font-semibold"
            >
              <Sparkles size={16} /> Try in 3D Studio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}