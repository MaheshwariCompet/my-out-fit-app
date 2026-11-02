import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { ArrowLeft, Flame, Calendar } from 'lucide-react';

export default function WearHistory() {
  const navigate = useNavigate();

  const logs = [
    { date: "Today • Oct 24", title: "Client Presentation", outfit: "Camel Coat, Cashmere Knit, Charcoal Trousers", temp: "14°C Clear" },
    { date: "Yesterday • Oct 23", title: "Casual Studio Day", outfit: "Overshirt, Poplin Shirt, Selvedge Denim", temp: "16°C Mild" },
    { date: "Oct 22", title: "Boardroom Sartorial", outfit: "Navy Blazer, Silk Blouse, Wool Trousers", temp: "15°C Overcast" }
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-serif text-2xl font-bold">Wear History</h1>
      </div>

      <Card className="p-5 flex items-center gap-4 bg-gradient-to-r from-[#C4623A]/10 to-transparent border-[#C4623A]/20">
        <div className="w-12 h-12 rounded-full bg-[#C4623A] text-white flex items-center justify-center font-bold">
          <Flame size={24} />
        </div>
        <div>
          <div className="text-xs text-[#C4623A] font-semibold uppercase">12-Day Deliberate Styling Streak</div>
          <div className="font-serif text-lg font-bold">Consistent Wardrobe Rotation</div>
        </div>
      </Card>

      <div className="space-y-3">
        <h2 className="font-serif text-sm font-bold">Wear Timeline</h2>
        {logs.map((log, idx) => (
          <Card key={idx} className="p-4 space-y-1">
            <div className="flex justify-between items-baseline text-xs">
              <span className="font-semibold text-neutral-400">{log.date}</span>
              <span className="text-[10px] text-neutral-500">{log.temp}</span>
            </div>
            <div className="font-serif text-sm font-bold">{log.title}</div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">{log.outfit}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
