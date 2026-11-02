import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusChip } from '../../components/ui/StatusChip';
import { ArrowLeft, Edit, Calendar, Sparkles } from 'lucide-react';

export default function GarmentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const item = {
    id: id || "item-1",
    title: "Tailored Camel Wool Coat",
    brand: "Totême",
    collection: "Studio Collection 2023",
    price: 580,
    acquired: "Oct 2023",
    size: "42 EU",
    status: "ready",
    wears: 38,
    cpw: 15.26,
    synergyScore: 94,
    fabric: "100% Italian Virgin Wool (Cupro Lining)",
    color: "Camel Tan / Warm Earth",
    season: "Autumn / Winter (Core)",
    care: "Specialist Dry Clean Only • Rest 48h between wears",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    pairings: [
      { id: 'item-3', title: 'Cashmere Crewneck', tag: 'Top', wears: 24, img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=300&q=80' },
      { id: 'item-2', title: 'Pleated Trousers', tag: 'Bottom', wears: 31, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80' },
      { id: 'item-6', title: 'Suede Penny Loafers', tag: 'Shoes', wears: 18, img: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=300&q=80' }
    ]
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Garment Item Detail</span>
        <button 
          onClick={() => navigate(`/closet/item/${item.id}/edit`)} 
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Edit Garment"
        >
          <Edit size={16} />
        </button>
      </div>

      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-100 shadow-md">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4">
          <StatusChip status={item.status} />
        </div>
      </div>

      <div>
        <h1 className="font-serif text-2xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">{item.title}</h1>
        <p className="text-xs text-neutral-500 mt-0.5">{item.brand} • {item.collection}</p>
        <p className="text-xs text-neutral-400 mt-1">Original ${item.price} • Acquired {item.acquired} • {item.size}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center p-3">
          <div className="text-[10px] text-neutral-500 uppercase font-medium">Lifetime Wears</div>
          <div className="font-serif text-xl font-bold mt-0.5 text-[#1F2F4F] dark:text-[#FAF8F5]">{item.wears}</div>
        </Card>
        <Card className="text-center p-3">
          <div className="text-[10px] text-neutral-500 uppercase font-medium">Cost / Wear</div>
          <div className="font-serif text-xl font-bold mt-0.5 text-[#C4623A]">${item.cpw.toFixed(2)}</div>
        </Card>
        <Card className="text-center p-3">
          <div className="text-[10px] text-neutral-500 uppercase font-medium">Synergy Score</div>
          <div className="font-serif text-xl font-bold mt-0.5 text-[#1F2F4F] dark:text-[#FAF8F5]">{item.synergyScore}%</div>
        </Card>
      </div>

      <Card className="space-y-3">
        <h2 className="font-serif text-sm font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">Garment Specifications</h2>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-[#E8E2D9] dark:border-[#2A313D]">
            <span className="text-neutral-500">Fabric Composition</span>
            <span className="font-medium text-right text-[#1F2F4F] dark:text-[#FAF8F5]">{item.fabric}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#E8E2D9] dark:border-[#2A313D]">
            <span className="text-neutral-500">Color Palette</span>
            <span className="font-medium text-[#1F2F4F] dark:text-[#FAF8F5]">{item.color}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#E8E2D9] dark:border-[#2A313D]">
            <span className="text-neutral-500">Seasonality</span>
            <span className="font-medium text-[#1F2F4F] dark:text-[#FAF8F5]">{item.season}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-neutral-500">Care Instructions</span>
            <span className="font-medium text-right max-w-[200px] text-[#1F2F4F] dark:text-[#FAF8F5]">{item.care}</span>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <h2 className="font-serif text-sm font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">Frequent Pairings (From Closet)</h2>
        <div className="grid grid-cols-3 gap-3">
          {item.pairings.map(pair => (
            <Card key={pair.id} interactive onClick={() => navigate(`/closet/item/${pair.id}`)} className="p-2 space-y-1.5">
              <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100">
                <img src={pair.img} alt={pair.title} className="w-full h-full object-cover" />
              </div>
              <div className="text-[11px] font-semibold truncate text-[#1F2F4F] dark:text-[#FAF8F5]">{pair.title}</div>
              <div className="text-[10px] text-neutral-500">{pair.tag} • {pair.wears} Wears</div>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <Button variant="outline" onClick={() => navigate('/planner')} className="flex items-center justify-center gap-2">
          <Calendar size={16} /> Plan Outfit
        </Button>
        <Button variant="primary" onClick={() => navigate('/try-on')} className="flex items-center justify-center gap-2">
          <Sparkles size={16} /> Try in 3D Studio
        </Button>
      </div>
    </div>
  );
}