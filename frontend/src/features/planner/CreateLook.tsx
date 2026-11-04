import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  ArrowLeft, Plus, Trash2, ArrowUp, ArrowDown, 
  Sparkles, Check, RefreshCw 
} from 'lucide-react';
import { useWardrobe, Garment } from '../../context/WardrobeContext';

export default function CreateLook() {
  const navigate = useNavigate();
  const location = useLocation();
  const { outfits, garments, selectOutfitForTryOn } = useWardrobe();

  // Load the target outfit from location state if available
  const passedOutfitId = (location.state as any)?.outfitId;
  const targetOutfit = outfits.find(o => o.id === passedOutfitId) || outfits[0];

  const [lookTitle, setLookTitle] = useState(targetOutfit?.title || 'The Autumn Gallery Look');
  const [layers, setLayers] = useState<Garment[]>(targetOutfit?.pieces || garments.slice(0, 3));
  const [showAddPicker, setShowAddPicker] = useState(false);

  // Layer Reordering
  const moveLayer = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= layers.length) return;
    const updated = [...layers];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setLayers(updated);
  };

  // Remove Layer
  const removeLayer = (id: string) => {
    setLayers(layers.filter(l => l.id !== id));
  };

  // Add Layer from Vault
  const addPieceToLook = (garment: Garment) => {
    if (!layers.some(l => l.id === garment.id)) {
      setLayers([...layers, garment]);
    }
    setShowAddPicker(false);
  };

  // Try on this customized layer composition
  const handleTryOnCustom = () => {
    const customOutfit = {
      id: `custom-${Date.now()}`,
      title: lookTitle,
      occasion: 'Custom Layering',
      notes: `${layers.length} garments staged in custom arrangement`,
      synergy_score: 97,
      comfort_rating: 9.6,
      is_saved: true,
      pieces: layers
    };
    selectOutfitForTryOn(customOutfit);
    navigate('/try-on');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12 px-2 sm:px-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Outfit Layer Editor
        </span>
        <button onClick={() => navigate('/planner')} className="text-xs text-neutral-500 hover:text-black dark:hover:text-white">
          Cancel
        </button>
      </div>

      {/* Look Title */}
      <div className="space-y-1">
        <label className="text-[11px] font-semibold uppercase text-neutral-500">Look Nomenclature</label>
        <input 
          type="text" 
          value={lookTitle}
          onChange={e => setLookTitle(e.target.value)}
          className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-2xl font-serif text-lg font-bold focus:outline-none focus:border-[#C4623A]"
        />
      </div>

      {/* Layer Sequencing Stage */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs font-semibold text-neutral-500 uppercase">
          <span>Staged Layers ({layers.length} Garments)</span>
          <button 
            onClick={() => setShowAddPicker(true)}
            className="flex items-center gap-1 text-[#C4623A] font-bold hover:underline"
          >
            <Plus size={14} /> Add Piece from Closet
          </button>
        </div>

        {layers.length === 0 ? (
          <div className="p-8 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-3xl text-center space-y-2">
            <p className="text-xs text-neutral-400">No garments currently in this look.</p>
            <Button size="sm" onClick={() => setShowAddPicker(true)}>+ Add First Layer</Button>
          </div>
        ) : (
          layers.map((item, idx) => (
            <Card key={item.id} className="p-3.5 flex items-center justify-between rounded-2xl border border-[#E8E2D9] dark:border-[#2A313D]">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-mono font-bold text-neutral-400 w-6">0{idx + 1}</span>
                <img 
                  src={item.image_url || item.image_url || "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=200&q=80"} 
                  alt={item.title} 
                  className="w-12 h-14 rounded-xl object-cover shrink-0" 
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#1F2F4F] dark:text-[#FAF8F5] truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    {item.brand} • <span className="capitalize">{item.category}</span>
                  </div>
                </div>
              </div>

              {/* Functional Controls: Reorder Up/Down & Remove */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveLayer(idx, 'up')}
                  className="p-1.5 rounded-lg border border-[#E8E2D9] dark:border-[#2A313D] disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/5"
                  title="Move Layer Higher"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  disabled={idx === layers.length - 1}
                  onClick={() => moveLayer(idx, 'down')}
                  className="p-1.5 rounded-lg border border-[#E8E2D9] dark:border-[#2A313D] disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/5"
                  title="Move Layer Lower"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => removeLayer(item.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 ml-1"
                  title="Remove from Look"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Layer Modal Picker */}
      {showAddPicker && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] rounded-3xl w-full max-w-md p-5 space-y-4 max-h-[80vh] overflow-y-auto">
            <h3 className="font-serif font-bold text-base text-[#1F2F4F] dark:text-[#FAF8F5]">
              Add Piece from Your Wardrobe
            </h3>
            <div className="space-y-2">
              {garments.map(g => (
                <div 
                  key={g.id}
                  onClick={() => addPieceToLook(g)}
                  className="p-2.5 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] flex items-center justify-between cursor-pointer hover:border-[#C4623A] bg-white dark:bg-[#121418]"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={g.image_url || g.image_url} alt={g.title} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <div className="text-xs font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">{g.title}</div>
                      <div className="text-[10px] text-neutral-400">{g.brand} • {g.category}</div>
                    </div>
                  </div>
                  <Plus size={16} className="text-[#C4623A]" />
                </div>
              ))}
            </div>
            <Button variant="outline" fullWidth onClick={() => setShowAddPicker(false)}>
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Save & Try-On Actions */}
      <div className="space-y-2 pt-2">
        <Button 
          fullWidth 
          variant="primary" 
          onClick={handleTryOnCustom} 
          className="flex items-center justify-center gap-2"
        >
          <Sparkles size={16} /> Try on Avatar (3D View)
        </Button>
        <Button 
          fullWidth 
          variant="outline" 
          onClick={() => navigate('/planner')} 
          className="flex items-center justify-center gap-2"
        >
          <Check size={16} /> Save Look to Weekly Schedule
        </Button>
      </div>
    </div>
  );
}