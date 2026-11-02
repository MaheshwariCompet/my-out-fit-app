import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function AddEditFitNote() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [garment, setGarment] = useState('Pleated Wool Trousers');
  const [alterations, setAlterations] = useState('Hemmed -2.5cm, Waist Taken In -1.5cm');
  const [tailor, setTailor] = useState('Maison St. Germain Tailoring');

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-serif text-2xl font-bold">{id === 'new' ? 'New Fit Note' : 'Edit Fit Note'}</h1>
      </div>

      <div className="space-y-4 text-xs">
        <div className="space-y-1">
          <label className="font-semibold uppercase text-neutral-500">Garment</label>
          <input 
            type="text" 
            value={garment} 
            onChange={e => setGarment(e.target.value)} 
            className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-xl text-xs" 
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold uppercase text-neutral-500">Alterations Applied</label>
          <textarea 
            rows={3} 
            value={alterations} 
            onChange={e => setAlterations(e.target.value)} 
            className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] p-3 rounded-xl text-xs" 
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold uppercase text-neutral-500">Tailor Studio</label>
          <input 
            type="text" 
            value={tailor} 
            onChange={e => setTailor(e.target.value)} 
            className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-xl text-xs" 
          />
        </div>

        <Button fullWidth variant="primary" onClick={() => navigate('/planner/fit-notes')}>
          Save Fit Note
        </Button>
      </div>
    </div>
  );
}
