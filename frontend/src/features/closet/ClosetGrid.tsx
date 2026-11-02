import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { StatusChip } from '../../components/ui/StatusChip';
import { Button } from '../../components/ui/Button';
import { Search, Plus, Filter, Camera, Receipt, Edit3, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import SearchFilterSheet from './SearchFilterSheet';

const GARMENTS = [
  {
    id: "item-1",
    title: "Tailored Camel Wool Coat",
    brand: "Totême",
    category: "outerwear",
    status: "ready",
    price: 580,
    wears: 38,
    color: "Camel Tan",
    fabric: "100% Virgin Wool",
    img: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-2",
    title: "Pleated Virgin Wool Trousers",
    brand: "Studio Nicholson",
    category: "bottoms",
    status: "ready",
    price: 360,
    wears: 38,
    color: "Charcoal Melange",
    fabric: "Italian Wool",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-3",
    title: "Cashmere Crewneck",
    brand: "Arket",
    category: "knitwear",
    status: "ready",
    price: 150,
    wears: 54,
    color: "Oatmeal Heather",
    fabric: "100% Cashmere",
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-4",
    title: "Relaxed Linen Overshirt",
    brand: "COS",
    category: "tops",
    status: "in_laundry",
    price: 95,
    wears: 24,
    color: "Ecru Linen",
    fabric: "French Linen",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-5",
    title: "Japanese Selvedge Denim",
    brand: "Kuroki Mill",
    category: "bottoms",
    status: "ready",
    price: 185,
    wears: 42,
    color: "Indigo Raw",
    fabric: "13.5oz Cotton",
    img: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-6",
    title: "Suede Penny Loafers",
    brand: "Totême",
    category: "footwear",
    status: "ready",
    price: 220,
    wears: 42,
    color: "Tobacco Brown",
    fabric: "Calfskin Suede",
    img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-7",
    title: "Double-Breasted Wool Blazer",
    brand: "Totême",
    category: "outerwear",
    status: "ready",
    price: 480,
    wears: 29,
    color: "Midnight Navy",
    fabric: "Super 120s Wool",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "item-8",
    title: "Silk Crepe Slip Dress",
    brand: "Cocoa Hue",
    category: "tops",
    status: "ready",
    price: 195,
    wears: 16,
    color: "Ivory Silk",
    fabric: "100% Silk Crepe",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
  }
];

export default function ClosetGrid() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showFiltersSheet, setShowFiltersSheet] = useState(false);

  const filtered = GARMENTS.filter(g => {
    const matchCategory = activeTab === 'all' || g.category === activeTab;
    const matchStatus = statusFilter === 'all' || g.status === statusFilter;
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase()) || 
                        g.brand.toLowerCase().includes(search.toLowerCase()) ||
                        g.fabric.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full px-2 sm:px-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#C4623A]/10 text-[#C4623A] uppercase tracking-wider">
              Capsule Collection
            </span>
            <span className="text-xs text-neutral-500 font-medium">42 Total Pieces • 84% Rotation Health</span>
          </div>
          <h1 className="font-serif text-3xl font-bold mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">
            My Digital Closet
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="md"
            onClick={() => setShowFiltersSheet(true)}
            className="flex items-center gap-2 text-xs"
          >
            <SlidersHorizontal size={15} /> Filters
          </Button>
          <Button 
            variant="primary" 
            size="md"
            onClick={() => setShowAddMenu(true)}
            className="flex items-center gap-2 shadow-sm text-xs font-semibold"
          >
            <Plus size={16} /> Add Garment
          </Button>
        </div>
      </div>

      {/* Search & Quick Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input 
            type="text" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search fabrics (cashmere, silk), colors, or designers..."
            className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] pl-10 pr-4 py-2.5 rounded-2xl text-xs focus:outline-none focus:border-[#C4623A] transition-colors shadow-sm"
          />
        </div>

        {/* Status Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Statuses' },
            { id: 'ready', label: 'Ready to Wear' },
            { id: 'in_laundry', label: 'In Laundry' },
            { id: 'dry_clean', label: 'Resting / Dry Clean' }
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setStatusFilter(s.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                statusFilter === s.id
                  ? 'bg-[#1F2F4F] text-white dark:bg-[#FAF8F5] dark:text-[#1F2F4F] shadow-sm'
                  : 'bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] text-neutral-600 dark:text-neutral-300 hover:border-neutral-400'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-medium border-b border-[#E8E2D9] dark:border-[#2A313D]">
        {['all', 'outerwear', 'tops', 'bottoms', 'knitwear', 'footwear', 'accessories'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2.5 px-3 border-b-2 font-semibold capitalize whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'border-[#C4623A] text-[#C4623A]'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            {tab === 'all' ? 'All Pieces (42)' : tab}
          </button>
        ))}
      </div>

      {/* Responsive Grid: 2 cols on mobile, 3 on tablet, 4 on desktop, 5 on wide monitors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {filtered.map(garment => {
          const costPerWear = (garment.price / Math.max(garment.wears, 1)).toFixed(2);
          return (
            <Card 
              key={garment.id}
              interactive
              onClick={() => navigate(`/closet/item/${garment.id}`)}
              className="p-3 space-y-3 group hover:shadow-lg transition-all duration-300 rounded-3xl border border-[#E8E2D9] dark:border-[#2A313D]"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative bg-neutral-100 dark:bg-neutral-800">
                <img 
                  src={garment.img} 
                  alt={garment.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5">
                  <StatusChip status={garment.status} />
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] text-white font-medium">
                  {garment.wears} wears
                </div>
              </div>

              <div className="px-1 space-y-1">
                <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  {garment.brand}
                </div>
                <h3 className="font-semibold text-xs sm:text-sm text-[#1F2F4F] dark:text-[#FAF8F5] truncate group-hover:text-[#C4623A] transition-colors">
                  {garment.title}
                </h3>
                <div className="flex items-center justify-between pt-1 border-t border-[#E8E2D9]/60 dark:border-[#2A313D]/60 text-xs">
                  <span className="text-neutral-500 text-[11px]">{garment.fabric}</span>
                  <span className="font-serif font-bold text-[#C4623A]">${costPerWear} <span className="text-[9px] font-sans font-normal text-neutral-400">/wear</span></span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Garment Modal */}
      {showAddMenu && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#FAF8F5] dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div>
              <span className="text-[10px] font-bold text-[#C4623A] uppercase tracking-wider">Seamless Intake</span>
              <h2 className="font-serif text-xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5] mt-0.5">
                Add Garment to Closet
              </h2>
              <p className="text-xs text-neutral-500 mt-1">Choose your preferred intake method:</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => { setShowAddMenu(false); navigate('/closet/snap'); }}
                className="p-4 rounded-2xl border border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#121418] hover:border-[#C4623A] flex flex-col items-center gap-2.5 transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-full bg-[#C4623A]/10 text-[#C4623A] flex items-center justify-center">
                  <Camera size={20} />
                </div>
                <span className="text-xs font-semibold">Photo Snap</span>
              </button>
              <button 
                onClick={() => { setShowAddMenu(false); navigate('/closet/e-receipts'); }}
                className="p-4 rounded-2xl border border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#121418] hover:border-[#C4623A] flex flex-col items-center gap-2.5 transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-full bg-[#1F2F4F]/10 dark:bg-neutral-800 text-[#1F2F4F] dark:text-neutral-200 flex items-center justify-center">
                  <Receipt size={20} />
                </div>
                <span className="text-xs font-semibold">E-Receipts</span>
              </button>
              <button 
                onClick={() => { setShowAddMenu(false); navigate('/closet/add-manual'); }}
                className="p-4 rounded-2xl border border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#121418] hover:border-[#C4623A] flex flex-col items-center gap-2.5 transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                  <Edit3 size={20} />
                </div>
                <span className="text-xs font-semibold">Manual Add</span>
              </button>
            </div>

            <Button variant="outline" fullWidth onClick={() => setShowAddMenu(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <SearchFilterSheet 
        isOpen={showFiltersSheet} 
        onClose={() => setShowFiltersSheet(false)} 
        onApply={(f) => console.log(f)} 
      />
    </div>
  );
}