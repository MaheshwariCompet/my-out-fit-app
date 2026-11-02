import React, { useState } from 'react';
import { BottomSheet } from '../../components/ui/BottomSheet';
import { Button } from '../../components/ui/Button';

interface SearchFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export default function SearchFilterSheet({ isOpen, onClose, onApply }: SearchFilterSheetProps) {
  const [selectedSeason, setSelectedSeason] = useState('Autumn');
  const [selectedStatus, setSelectedStatus] = useState('ready');
  const [selectedFabric, setSelectedFabric] = useState('Wool');

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Closet Search & Filters">
      <div className="space-y-4 text-xs">
        <div>
          <label className="font-semibold text-neutral-500 uppercase tracking-wider block mb-2">Availability Status</label>
          <div className="flex gap-2">
            {['all', 'ready', 'in_laundry', 'dry_clean'].map(s => (
              <button
                key={s}
                onClick={() => setSelectedStatus(s)}
                className={`px-3 py-1.5 rounded-full capitalize transition-all ${
                  selectedStatus === s ? 'bg-[#1F2F4F] text-white font-semibold' : 'bg-neutral-100 dark:bg-neutral-800'
                }`}
              >
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-semibold text-neutral-500 uppercase tracking-wider block mb-2">Seasonality</label>
          <div className="flex flex-wrap gap-2">
            {['All-Year', 'Spring', 'Summer', 'Autumn', 'Winter'].map(season => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  selectedSeason === season ? 'bg-[#C4623A] text-white font-semibold' : 'bg-neutral-100 dark:bg-neutral-800'
                }`}
              >
                {season}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-semibold text-neutral-500 uppercase tracking-wider block mb-2">Fabric & Weave</label>
          <div className="flex flex-wrap gap-2">
            {['Cashmere', 'Virgin Wool', 'Linen', 'Silk', 'Selvedge Denim', 'Cotton'].map(fabric => (
              <button
                key={fabric}
                onClick={() => setSelectedFabric(fabric)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  selectedFabric === fabric ? 'bg-[#1F2F4F] text-white font-semibold' : 'bg-neutral-100 dark:bg-neutral-800'
                }`}
              >
                {fabric}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex gap-2">
          <Button variant="outline" fullWidth onClick={onClose}>Reset</Button>
          <Button variant="primary" fullWidth onClick={() => { onApply({ selectedSeason, selectedStatus, selectedFabric }); onClose(); }}>
            Apply Filters
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
