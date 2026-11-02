import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Sparkles, Link2, Clock, AlertCircle } from 'lucide-react';

interface AuditData {
  productUrl: string;
  title: string;
  brand: string;
  price: number;
  image: string;
  pairsCount: number;
  cpwProjected: number;
  harmonyIndex: number;
  pairingItems: Array<{ id: string; title: string; wears: number; img: string }>;
  recommendation: string;
}

export default function PrePurchaseCheck() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('https://atelier-studio.com/products/structured-blazer');
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState<AuditData | null>({
    productUrl: 'https://atelier-studio.com/products/structured-blazer',
    title: 'Structured Virgin Wool Blazer',
    brand: 'Totême',
    price: 240,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
    pairsCount: 4,
    cpwProjected: 4.80,
    harmonyIndex: 94,
    pairingItems: [
      { id: '1', title: 'Pleated Wool Trousers', wears: 38, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80' },
      { id: '2', title: 'Cashmere Crewneck', wears: 54, img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=300&q=80' },
      { id: '3', title: 'Crisp Poplin Shirt', wears: 62, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=300&q=80' },
      { id: '4', title: 'Selvedge Denim', wears: 89, img: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=300&q=80' },
    ],
    recommendation: 'Replaces 2 worn-out jackets in your autumn rotation. Seamless replacement with immediate day-to-day utility.'
  });

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button 
          type="button"
          onClick={() => navigate(-1)} 
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="text-[10px] font-semibold text-[#C4623A] uppercase tracking-wider">Wardrobe Verification</span>
          <h1 className="font-serif text-2xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">Pre-Purchase Check</h1>
        </div>
      </div>

      <form onSubmit={handleAudit} className="space-y-2">
        <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">Prospective Item URL</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Link2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="url" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste store link (Zara, Net-a-Porter, COS)..."
              className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] pl-9 pr-3 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#C4623A]"
              required
            />
          </div>
          <Button type="submit" size="sm" variant="secondary" disabled={loading} className="shrink-0 flex items-center gap-1.5">
            <Sparkles size={14} />
            {loading ? 'Evaluating...' : 'Check Match'}
          </Button>
        </div>
      </form>

      {audit && (
        <div className="space-y-4 animate-in fade-in">
          <Card className="flex gap-4 p-3 items-center">
            <img src={audit.image} alt={audit.title} className="w-20 h-24 rounded-xl object-cover bg-neutral-100 shrink-0" />
            <div className="space-y-1 min-w-0">
              <span className="text-[10px] uppercase font-semibold text-neutral-500">{audit.brand} • Verified Retailer</span>
              <h2 className="text-sm font-bold truncate text-[#1F2F4F] dark:text-[#FAF8F5]">{audit.title}</h2>
              <div className="text-sm font-semibold text-[#1F2F4F] dark:text-[#FAF8F5]">${audit.price}</div>
              <p className="text-[11px] text-neutral-500">100% Italian Super 120s Wool</p>
            </div>
          </Card>

          <Card className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">High Cohesion Match</span>
                <h3 className="font-semibold text-sm text-[#1F2F4F] dark:text-[#FAF8F5]">Pairs with {audit.pairsCount} pieces you already own</h3>
              </div>
              <div className="text-right">
                <div className="text-xs text-neutral-500">Harmony Index</div>
                <div className="font-bold text-base text-[#1F2F4F] dark:text-[#FAF8F5]">{audit.harmonyIndex}%</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-1">
              {audit.pairingItems.map((item) => (
                <div key={item.id} className="text-center space-y-1">
                  <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[10px] font-medium truncate text-[#1F2F4F] dark:text-[#FAF8F5]">{item.title}</div>
                  <div className="text-[9px] text-neutral-500">{item.wears} wears</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-3">
            <div className="flex justify-between items-baseline">
              <div>
                <div className="text-[10px] font-semibold text-neutral-500 uppercase">Longevity Projection</div>
                <div className="font-serif text-2xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
                  ${audit.cpwProjected.toFixed(2)} <span className="text-xs font-sans text-neutral-500 font-normal">/ estimated wear</span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                Top 10% Efficiency
              </span>
            </div>

            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div className="bg-[#C4623A] h-full w-[85%] rounded-full"></div>
            </div>

            <div className="flex justify-between text-[11px] text-neutral-500">
              <span>Projected: 50 wears</span>
              <span>Target: 2 Autumn Seasons</span>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <AlertCircle size={15} className="text-[#C4623A] shrink-0 mt-0.5" />
              <span>{audit.recommendation}</span>
            </div>
          </Card>

          <div className="p-3.5 rounded-2xl bg-[#C4623A]/10 border border-[#C4623A]/20 text-xs text-[#C4623A] flex items-center gap-2.5">
            <Clock size={16} className="shrink-0" />
            <span>A mindful 24-hour reflection window is enforced before checkout to curb impulse acquisitions.</span>
          </div>

          <div className="space-y-2 pt-1">
            <Button 
              fullWidth 
              variant="primary" 
              onClick={() => navigate('/wishlist')}
              className="flex items-center justify-center gap-2"
            >
              <Clock size={16} /> Save to Wishlist (24h Cooldown)
            </Button>
            <Button fullWidth variant="ghost" onClick={() => navigate(-1)}>
              Skip This Piece
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}