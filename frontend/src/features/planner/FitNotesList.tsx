import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Plus, Scissors } from 'lucide-react';

export default function FitNotesList() {
  const navigate = useNavigate();

  const notes = [
    { id: '1', garment: 'Pleated Wool Trousers', brand: 'Studio Nicholson', changes: ['Hemmed -2.5cm', 'Waist Taken In -1.5cm'], tailor: 'Maison St. Germain' },
    { id: '2', garment: 'Tailored Camel Wool Coat', brand: 'Totême', changes: ['Sleeve hem taken up 1.5cm'], tailor: 'Atelier Montaigne' }
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-serif text-2xl font-bold">Fit & Tailoring Notes</h1>
        <Button size="sm" onClick={() => navigate('/planner/fit-note/new')}>+ Add Note</Button>
      </div>

      <div className="space-y-3">
        {notes.map(n => (
          <Card key={n.id} interactive onClick={() => navigate(`/planner/fit-note/${n.id}`)} className="p-4 space-y-2">
            <div className="flex justify-between items-baseline">
              <div className="font-serif font-bold text-sm">{n.garment}</div>
              <span className="text-[10px] text-neutral-500">{n.brand}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {n.changes.map((c, idx) => (
                <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 font-medium">
                  {c}
                </span>
              ))}
            </div>
            <div className="text-[11px] text-neutral-400">Tailor: {n.tailor}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
