import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Plus, Calendar } from 'lucide-react';

export default function SavedPlans() {
  const navigate = useNavigate();

  const plans = [
    { id: '1', title: 'Autumn Minimalist', range: 'Oct 23 – Oct 29', status: 'Active', items: '8 garments' },
    { id: '2', title: 'Paris Voyage Capsule', range: 'Oct 30 – Nov 5', status: 'Upcoming', items: '8 garments' },
    { id: '3', title: 'Executive & Board Week', range: 'Oct 16 – Oct 22', status: 'Completed', items: '10 garments' }
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-serif text-2xl font-bold">Saved Plans</h1>
        <Button size="sm" onClick={() => navigate('/planner/new')}>+ New Plan</Button>
      </div>

      <div className="space-y-3">
        {plans.map(p => (
          <Card key={p.id} interactive onClick={() => navigate(`/planner/plan/${p.id}`)} className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-sm">{p.title}</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800">{p.status}</span>
              </div>
              <p className="text-xs text-neutral-500">{p.range} • {p.items}</p>
            </div>
            <span className="text-neutral-400">›</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
