import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Trash2, Archive, Check } from 'lucide-react';

export default function EditGarment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('Structured Camel Trench Coat');
  const [brand, setBrand] = useState('Totême');
  const [status, setStatus] = useState('ready');

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Edit Garment</span>
        <button onClick={() => navigate('/closet')} className="text-red-500 hover:text-red-600">
          <Trash2 size={18} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase text-neutral-500">Piece Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-xl text-xs" 
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase text-neutral-500">Availability Status</label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {['ready', 'in_laundry', 'dry_clean'].map(s => (
              <button
                type="button"
                key={s}
                onClick={() => setStatus(s)}
                className={`py-2 px-3 rounded-xl border capitalize ${
                  status === s ? 'bg-[#1F2F4F] text-white font-semibold' : 'bg-white dark:bg-[#1B1F27] border-[#E8E2D9] dark:border-[#2A313D]'
                }`}
              >
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <Card className="p-3 flex items-center justify-between cursor-pointer text-xs" onClick={() => navigate('/closet')}>
          <div className="flex items-center gap-2">
            <Archive size={16} className="text-[#C4623A]" />
            <span>Archive Garment to Off-Season Storage</span>
          </div>
          <span className="text-neutral-400">›</span>
        </Card>

        <Button fullWidth variant="primary" onClick={() => navigate(-1)}>
          Save Garment Changes
        </Button>
      </div>
    </div>
  );
}
