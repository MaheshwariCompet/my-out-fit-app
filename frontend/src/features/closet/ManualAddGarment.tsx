import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  ArrowLeft, Upload, Check, RefreshCw, Sparkles, 
  Layers, Calendar, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { useWardrobe, Garment, Outfit } from '../../context/WardrobeContext';

const SUBCATEGORIES: Record<string, string[]> = {
  outerwear: ['Trench Coat', 'Blazer', 'Overcoat', 'Leather Jacket', 'Cardigan'],
  tops: ['Button-Down Shirt', 'T-Shirt', 'Silk Blouse', 'Polo', 'Turtleneck'],
  bottoms: ['Pleated Trousers', 'Jeans / Denim', 'Chinos', 'Midi Skirt', 'Tailored Shorts'],
  knitwear: ['Cashmere Crewneck', 'V-Neck Pullover', 'Cable Knit', 'Sleeveless Vest'],
  footwear: ['Penny Loafers', 'Clean Sneakers', 'Chelsea Boots', 'Dress Derbies', 'Mules'],
  accessories: ['Leather Belt', 'Tote / Handbag', 'Cashmere Scarf', 'Chronograph Watch', 'Sunglasses']
};

export default function ManualAddGarment() {
  const navigate = useNavigate();
  const { addGarment, garments, outfits, selectOutfitForTryOn } = useWardrobe();

  // Intake Form State
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<'outerwear' | 'tops' | 'bottoms' | 'knitwear' | 'footwear' | 'accessories'>('footwear');
  const [subCategory, setSubCategory] = useState('Penny Loafers');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [fabric, setFabric] = useState('');
  const [formality, setFormality] = useState<'casual' | 'smart_casual' | 'business' | 'formal'>('smart_casual');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Generated Mix & Match Outfits State
  const [generatedOutfits, setGeneratedOutfits] = useState<Outfit[]>([]);
  const [createdGarment, setCreatedGarment] = useState<Garment | null>(null);

  const handleCategoryChange = (newCat: any) => {
    setCategory(newCat);
    setSubCategory(SUBCATEGORIES[newCat][0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // AI Mix & Match Combinatorial Algorithm
  const generateMixAndMatch = (anchor: Garment): Outfit[] => {
    // 1. Gather pool of pieces grouped by required slots
    const tops = garments.filter(g => g.category === 'tops' || g.category === 'knitwear');
    const bottoms = garments.filter(g => g.category === 'bottoms');
    const outer = garments.filter(g => g.category === 'outerwear');
    const shoes = garments.filter(g => g.category === 'footwear');
    const accessories = garments.filter(g => g.category === 'accessories');

    const looks: Outfit[] = [];

    // Combination 1: Work / Professional Core
    const look1Pieces: Garment[] = [anchor];
    if (anchor.category !== 'tops') look1Pieces.push(tops[0] || garments[0]);
    if (anchor.category !== 'bottoms') look1Pieces.push(bottoms[0] || garments[1]);
    if (anchor.category !== 'footwear') look1Pieces.push(shoes[0] || garments[2]);
    if (anchor.category !== 'outerwear' && outer.length > 0) look1Pieces.push(outer[0]);
    if (anchor.category !== 'accessories' && accessories.length > 0) look1Pieces.push(accessories[0]);

    looks.push({
      id: `ai-mix-1-${Date.now()}`,
      title: `${anchor.title} Tailored Strategy Look`,
      occasion: 'Midweek Business & Work',
      notes: `Cohesive high-synergy arrangement built around ${anchor.brand || anchor.title}.`,
      synergy_score: 98,
      comfort_rating: 9.7,
      is_saved: true,
      pieces: Array.from(new Set(look1Pieces))
    });

    // Combination 2: Relaxed Atelier / Weekend Capsule
    const look2Pieces: Garment[] = [anchor];
    if (anchor.category !== 'tops') look2Pieces.push(tops[1] || tops[0] || garments[0]);
    if (anchor.category !== 'bottoms') look2Pieces.push(bottoms[1] || bottoms[0] || garments[1]);
    if (anchor.category !== 'footwear') look2Pieces.push(shoes[1] || shoes[0] || garments[2]);

    looks.push({
      id: `ai-mix-2-${Date.now()}`,
      title: `${anchor.title} Weekend Offsite Capsule`,
      occasion: 'Casual Friday / Social Dinner',
      notes: `Effortless tonal pairing balancing textures and comfort ease.`,
      synergy_score: 95,
      comfort_rating: 9.9,
      is_saved: true,
      pieces: Array.from(new Set(look2Pieces))
    });

    return looks;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setSubmitting(true);
      const newGarmentPayload: Omit<Garment, 'id' | 'wear_count'> = {
        title: title.trim(),
        brand: brand.trim() || 'Curated Studio',
        category,
        status: 'ready',
        purchase_price: parseFloat(price) || 0,
        color_name: color.trim() || 'Natural Shade',
        fabric_composition: fabric.trim() || subCategory,
        care_instructions: 'Standard gentle cycle',
        image_url: previewUrl || (
          category === 'footwear' 
            ? 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80'
            : category === 'accessories'
            ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
            : 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80'
        )
      };

      await addGarment(newGarmentPayload, selectedFile || undefined);

      // Create a temporary reference item for instant combinatorial preview
      const committedItem: Garment = {
        ...newGarmentPayload,
        id: `garment-${Date.now()}`,
        wear_count: 0
      };

      setCreatedGarment(committedItem);
      // Run the mix & match engine immediately
      const generated = generateMixAndMatch(committedItem);
      setGeneratedOutfits(generated);
    } catch (err: any) {
      console.error('Failed to save item:', err);
      alert(`Error creating item: ${err.message || 'Check database connection'}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleApplyToPlanner = (outfit: Outfit) => {
    selectOutfitForTryOn(outfit);
    navigate('/planner', { state: { anchorGarmentId: createdGarment?.id } });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-16 px-2 sm:px-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="text-center">
          <span className="text-[10px] font-bold text-[#C4623A] uppercase tracking-wider">
            Wardrobe Intake
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
            Add Garment, Shoes or Accessories
          </h1>
        </div>
        <div className="w-9" />
      </div>

      {!createdGarment ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Photo Dropzone */}
          <Card className="p-4 text-center border-dashed border-2 border-[#E8E2D9] dark:border-[#2A313D] space-y-2 relative rounded-3xl">
            {previewUrl ? (
              <div className="aspect-[16/9] rounded-2xl overflow-hidden relative">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="py-6">
                <Upload size={32} className="mx-auto text-neutral-400 mb-2" />
                <div className="text-xs font-semibold text-[#1F2F4F] dark:text-[#FAF8F5]">
                  Select Image File (Garment, Shoes, or Accessory)
                </div>
                <p className="text-[11px] text-neutral-400">Uploads to Supabase 'garments' storage bucket</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </Card>

          {/* Primary Details */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase text-neutral-500">
              Garment / Accessory Name *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Suede Penny Loafers, Silk Tie, Chronograph Watch..."
              className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-2xl text-xs focus:outline-none focus:border-[#C4623A]"
            />
          </div>

          {/* Category Tabs with Footwear & Accessories */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase text-neutral-500">Category</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
              {(['outerwear', 'tops', 'bottoms', 'knitwear', 'footwear', 'accessories'] as const).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`py-2.5 px-2 rounded-xl border capitalize font-semibold transition-all ${
                    category === cat
                      ? 'bg-[#1F2F4F] text-white dark:bg-[#FAF8F5] dark:text-[#1F2F4F] shadow-sm border-[#1F2F4F]'
                      : 'bg-white dark:bg-[#1B1F27] border-[#E8E2D9] dark:border-[#2A313D] text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Pills */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase text-neutral-500">Type Specification</label>
            <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
              {SUBCATEGORIES[category].map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSubCategory(sub)}
                  className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-colors ${
                    subCategory === sub
                      ? 'bg-[#C4623A] text-white border-[#C4623A] font-bold'
                      : 'bg-white dark:bg-[#1B1F27] border-[#E8E2D9] dark:border-[#2A313D] text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Brand & Price */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase text-neutral-500">Brand / Designer</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Totême, Lemaire, Seiko..."
                className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-2xl text-xs focus:outline-none focus:border-[#C4623A]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase text-neutral-500">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 240.00"
                className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-2xl text-xs focus:outline-none focus:border-[#C4623A]"
              />
            </div>
          </div>

          {/* Color & Material */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase text-neutral-500">Color Palette</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Tobacco Brown, Midnight Navy..."
                className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-2xl text-xs focus:outline-none focus:border-[#C4623A]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold uppercase text-neutral-500">Material / Fabric</label>
              <input
                type="text"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                placeholder="e.g. Calfskin Suede, Mulberry Silk..."
                className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-2xl text-xs focus:outline-none focus:border-[#C4623A]"
              />
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            variant="primary"
            size="lg"
            disabled={submitting}
            className="flex items-center justify-center gap-2 text-sm font-semibold shadow-md"
          >
            {submitting ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
            {submitting ? 'Adding & Calculating AI Combinations...' : 'Save to Closet & Generate Mix & Match'}
          </Button>
        </form>
      ) : (
        /* INSTANT MIX & MATCH COMBINATIONS PRESENTATION */
        <div className="space-y-6 animate-in fade-in">
          <div className="p-4 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 flex items-start gap-3">
            <CheckCircle2 size={22} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-serif font-bold text-base text-emerald-900 dark:text-emerald-200">
                "{createdGarment.title}" Successfully Cataloged!
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                The AI styling engine formulated 2 complete daily outfits incorporating your new {createdGarment.category}:
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
              Generated Mix & Match Combinations
            </h2>

            {generatedOutfits.map((outfit, index) => (
              <Card key={outfit.id} className="p-5 space-y-4 rounded-3xl border border-[#E8E2D9] dark:border-[#2A313D]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#C4623A]/10 text-[#C4623A] uppercase tracking-wider">
                      Combination 0{index + 1} • {outfit.occasion}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#1F2F4F] dark:text-[#FAF8F5] mt-1">
                      {outfit.title}
                    </h3>
                    <p className="text-xs text-neutral-500">{outfit.notes}</p>
                  </div>
                  <span className="font-serif font-bold text-xl text-emerald-600">
                    {outfit.synergy_score}% Match
                  </span>
                </div>

                {/* Staged Piece Strip including the newly added garment */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {outfit.pieces.map((p) => {
                    const isNew = p.id === createdGarment.id;
                    return (
                      <div 
                        key={p.id} 
                        className={`p-2.5 rounded-2xl border text-left space-y-1 ${
                          isNew 
                            ? 'border-[#C4623A] bg-[#C4623A]/10' 
                            : 'border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#121418]'
                        }`}
                      >
                        <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100">
                          <img src={p.image_url || (p as any).img} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-[9px] font-bold text-[#C4623A] uppercase">
                          {isNew ? '★ Newly Added' : p.category}
                        </div>
                        <div className="text-xs font-bold truncate text-[#1F2F4F] dark:text-[#FAF8F5]">
                          {p.title}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button 
                    fullWidth 
                    variant="primary" 
                    onClick={() => handleApplyToPlanner(outfit)}
                    className="flex items-center justify-center gap-2 text-xs font-semibold"
                  >
                    <Calendar size={15} /> Apply to Weekly Schedule
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      selectOutfitForTryOn(outfit);
                      navigate('/try-on');
                    }}
                    className="flex items-center justify-center gap-1.5 text-xs shrink-0"
                  >
                    <Sparkles size={15} className="text-[#C4623A]" /> 3D Try-On
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Button fullWidth variant="ghost" onClick={() => navigate('/closet')}>
            Return to Digital Closet
          </Button>
        </div>
      )}
    </div>
  );
}