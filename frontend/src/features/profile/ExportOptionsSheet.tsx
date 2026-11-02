import React, { useState } from 'react';
import { BottomSheet } from '../../components/ui/BottomSheet';
import { Button } from '../../components/ui/Button';
import { FileText, FileSpreadsheet } from 'lucide-react';

export default function ExportOptionsSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [format, setFormat] = useState<'pdf' | 'csv'>('pdf');

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Export Options">
      <div className="space-y-3 text-xs">
        <div 
          onClick={() => setFormat('pdf')}
          className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer ${format === 'pdf' ? 'border-[#C4623A] bg-[#C4623A]/5' : ''}`}
        >
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-[#C4623A]" />
            <div>
              <div className="font-semibold">Curated Lookbook (PDF)</div>
              <div className="text-[11px] text-neutral-500">Editorial document with flat-lay outfits</div>
            </div>
          </div>
          <span className="font-bold text-[#C4623A]">{format === 'pdf' ? '●' : '○'}</span>
        </div>

        <div 
          onClick={() => setFormat('csv')}
          className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer ${format === 'csv' ? 'border-[#C4623A] bg-[#C4623A]/5' : ''}`}
        >
          <div className="flex items-center gap-3">
            <FileSpreadsheet size={20} className="text-[#C4623A]" />
            <div>
              <div className="font-semibold">Wardrobe Inventory (CSV)</div>
              <div className="text-[11px] text-neutral-500">Raw inventory table with cost-per-wear</div>
            </div>
          </div>
          <span className="font-bold text-[#C4623A]">{format === 'csv' ? '●' : '○'}</span>
        </div>

        <Button fullWidth variant="primary" onClick={() => { alert(`Downloading ${format.toUpperCase()}...`); onClose(); }}>
          Generate & Download {format.toUpperCase()}
        </Button>
      </div>
    </BottomSheet>
  );
}
