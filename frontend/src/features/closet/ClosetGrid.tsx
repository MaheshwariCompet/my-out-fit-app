import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { StatusChip } from '../../components/ui/StatusChip';
import { Button } from '../../components/ui/Button';
import { Search, Plus, Camera, Receipt, Edit3, SlidersHorizontal, RefreshCw } from 'lucide-react';
import SearchFilterSheet from './SearchFilterSheet';
import { useWardrobe } from '../../context/WardrobeContext';

export default function ClosetGrid() {
  const navigate = useNavigate();
  // Read live garments, loading state, and refresh from the Supabase store
  const { garments, loading, refreshData } = useWardrobe();

  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showFiltersSheet, setShowFiltersSheet] = useState(false);

  // Filter against the live garments array
  const filtered = garments.filter(g => {
    const matchCategory = activeTab === 'all' || g.category === activeTab;
    const matchStatus = statusFilter === 'all' || g.status === statusFilter;
    const matchSearch = 
      g.title.toLowerCase().includes(search.toLowerCase()) || 
      (g.brand && g.brand.toLowerCase().includes(search.toLowerCase())) ||
      (g.fabric_composition && g.fabric_composition.toLowerCase().includes(search.toLowerCase()));
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
            <span className="text-xs text-neutral-500 font-medium">
              {garments.length} Total Pieces in Rotation
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">
            My Digital Closet
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="md"
            onClick={() => refreshData()}
            className="flex items-center gap-2 text-xs"
            aria-label="Refresh from database"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </Button>
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

      {/* Search & Status Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input 
            type="text" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search fabrics, colors, or designers..."
            className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] pl-10 pr-4 py-2.5 rounded-2xl text-xs focus:outline-none focus:border-[#C4623A] transition-colors shadow-sm"
          />
        </div>

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
                  : 'bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] text-neutral-600 dark:text-neutral-300'
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
            {tab === 'all' ? `All Pieces (${garments.length})` : tab}
          </button>
        ))}
      </div>

      {/* Loading Skeleton */}
      {loading && garments.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} className="p-3 rounded-3xl bg-neutral-100 dark:bg-neutral-800 animate-pulse h-64" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-neutral-500 text-sm">No garments match your active filters.</p>
          <Button variant="outline" size="sm" onClick={() => { setActiveTab('all'); setStatusFilter('all'); setSearch(''); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        /* Real Supabase Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filtered.map(garment => {
            const wears = garment.wear_count || 0;
            const price = garment.purchase_price || 0;
            const costPerWear = (price / Math.max(wears, 1)).toFixed(2);

            return (
              <Card 
                key={garment.id}
                interactive
                onClick={() => navigate(`/closet/item/${garment.id}`)}
                className="p-3 space-y-3 group hover:shadow-lg transition-all duration-300 rounded-3xl border border-[#E8E2D9] dark:border-[#2A313D]"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative bg-neutral-100 dark:bg-neutral-800">
                  <img 
                    src={garment.image_url} 
                    alt={garment.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <StatusChip status={garment.status} />
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] text-white font-medium">
                    {wears} wears
                  </div>
                </div>

                <div className="px-1 space-y-1">
                  <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                    {garment.brand || 'Unbranded'}
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm text-[#1F2F4F] dark:text-[#FAF8F5] truncate group-hover:text-[#C4623A] transition-colors">
                    {garment.title}
                  </h3>
                  <div className="flex items-center justify-between pt-1 border-t border-[#E8E2D9]/60 dark:border-[#2A313D]/60 text-xs">
                    <span className="text-neutral-500 text-[11px] truncate max-w-[80px]">
                      {garment.fabric_composition || garment.category}
                    </span>
                    <span className="font-serif font-bold text-[#C4623A]">
                      ${costPerWear} <span className="text-[9px] font-sans font-normal text-neutral-400">/wear</span>
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Garment Modal */}
      {showAddMenu && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#FAF8F5] dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div>
              <span className="text-[10px] font-bold text-[#C4623A] uppercase tracking-wider">Intake Channel</span>
              <h2 className="font-serif text-xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5] mt-0.5">
                Add Garment to Closet
              </h2>
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
        onApply={() => {}} 
      />
    </div>
  );
}