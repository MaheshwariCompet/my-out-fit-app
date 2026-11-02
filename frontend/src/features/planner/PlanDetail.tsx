import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Calendar, FileDown } from 'lucide-react';

export default function PlanDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const days = [
    { day: "Mon, Oct 23", agenda: "Client Presentation", outfit: "Tailored Warmth", status: "Worn" },
    { day: "Tue, Oct 24", agenda: "Creative Studio Review", outfit: "Structured Modernity", status: "Worn" },
    { day: "Wed, Oct 25", agenda: "Midweek Strategy", outfit: "The Architectural Blend", status: "Today" },
    { day: "Thu, Oct 26", agenda: "Casual Offsite", outfit: "Refined Ease", status: "Upcoming" }
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Plan Detail</span>
        <button onClick={() => alert("Downloading Lookbook PDF...")} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <FileDown size={16} />
        </button>
      </div>

      <div>
        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 uppercase">
          Active Plan
        </span>
        <h1 className="font-serif text-2xl font-bold mt-2">Autumn Minimalist</h1>
        <p className="text-xs text-neutral-500">Oct 23 – Oct 29 • 7 Days Planned • 8 Garments • 98% Versatility</p>
      </div>

      <div className="space-y-3">
        <h2 className="font-serif text-sm font-bold">Weekly Itinerary</h2>
        {days.map((d, idx) => (
          <Card key={idx} className="p-4 space-y-1">
            <div className="flex justify-between items-baseline text-xs">
              <span className="font-bold">{d.day}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                d.status === 'Today' ? 'bg-[#C4623A] text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
              }`}>{d.status}</span>
            </div>
            <div className="text-xs text-neutral-500">{d.agenda}</div>
            <div className="text-sm font-semibold pt-1">{d.outfit}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
