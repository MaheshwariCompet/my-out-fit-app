import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Sparkles, RefreshCw, Luggage, History, Scissors, Layers, 
  Calendar as CalendarIcon, ArrowRight, Sun, CloudRain, Check 
} from 'lucide-react';

export default function PlannerScreen() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(25);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B'>('A');

  const scheduleDays = [
    { day: 'Mon', date: 23, title: 'Client Presentation', weather: '14°C Rain', count: '4 pieces' },
    { day: 'Tue', date: 24, title: 'Creative Studio Review', weather: '15°C Overcast', count: '3 pieces' },
    { day: 'Wed', date: 25, title: 'Midweek Strategy', weather: '18°C Mild', count: '4 pieces', isToday: true },
    { day: 'Thu', date: 26, title: 'Casual Offsite', weather: '17°C Clear', count: '3 pieces' },
    { day: 'Fri', date: 27, title: 'Gallery Opening', weather: '12°C Night', count: '3 pieces' },
    { day: 'Sat', date: 28, title: 'Weekend Market', weather: '16°C Sun', count: '2 pieces' },
    { day: 'Sun', date: 29, title: 'Sunday Brunch', weather: '18°C Clear', count: '3 pieces' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full px-2 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#C4623A]/10 text-[#C4623A] uppercase tracking-wider">
              October 23 – 29
            </span>
            <span className="text-xs text-neutral-500 font-medium">Autumn Minimalist • 7 of 7 Days Styled</span>
          </div>
          <h1 className="font-serif text-3xl font-bold mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">
            Weekly Outfit Planner
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="md" onClick={() => navigate('/planner/saved')} className="text-xs">
            Saved Plans (4)
          </Button>
          <Button variant="primary" size="md" onClick={() => navigate('/planner/new')} className="text-xs font-semibold">
            + New Plan
          </Button>
        </div>
      </div>

      {/* Date Navigator Bar */}
      <div className="grid grid-cols-7 gap-2">
        {scheduleDays.map((item) => {
          const isSelected = selectedDay === item.date;
          return (
            <button
              key={item.date}
              onClick={() => setSelectedDay(item.date)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                isSelected
                  ? 'bg-[#1F2F4F] text-white dark:bg-[#FAF8F5] dark:text-[#1F2F4F] shadow-md border-[#1F2F4F]'
                  : 'bg-white dark:bg-[#1B1F27] border-[#E8E2D9] dark:border-[#2A313D] hover:border-[#C4623A]/50 text-neutral-600 dark:text-neutral-300'
              }`}
            >
              <div className="text-[11px] opacity-75 font-semibold uppercase">{item.day}</div>
              <div className="font-serif text-lg font-bold my-0.5">{item.date}</div>
              <div className="text-[10px] truncate opacity-80">{item.weather}</div>
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Canvas & Styling Stage (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6 space-y-5 rounded-3xl border border-[#E8E2D9] dark:border-[#2A313D]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#C4623A] uppercase tracking-wider">
                  Wednesday, Oct 25 • Day Focus
                </span>
                <h2 className="font-serif text-xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
                  Midweek Strategy Presentation
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">Forecast: 18°C Mild Overcast • 2:00 PM Meeting</p>
              </div>
              <button 
                onClick={() => setSelectedOption(selectedOption === 'A' ? 'B' : 'A')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] text-xs font-semibold hover:border-[#C4623A]"
              >
                <RefreshCw size={14} className="text-[#C4623A]" /> Shuffle
              </button>
            </div>

            {/* Alternates Option Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setSelectedOption('A')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedOption === 'A' 
                    ? 'border-[#C4623A] bg-[#C4623A]/5 shadow-sm' 
                    : 'border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#121418] opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase text-[#C4623A]">Option A (Formal Editorial)</span>
                  {selectedOption === 'A' && <Check size={16} className="text-[#C4623A]" />}
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img 
                    src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80" 
                    alt="Camel Coat" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="font-serif font-bold text-sm mt-3 text-[#1F2F4F] dark:text-[#FAF8F5]">Tailored Camel & Pleated Trousers</div>
                <p className="text-xs text-neutral-500 mt-0.5">Italian virgin wool + cashmere crewneck in oat</p>
              </div>

              <div 
                onClick={() => setSelectedOption('B')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedOption === 'B' 
                    ? 'border-[#C4623A] bg-[#C4623A]/5 shadow-sm' 
                    : 'border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#121418] opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase text-neutral-400">Option B (Relaxed Studio)</span>
                  {selectedOption === 'B' && <Check size={16} className="text-[#C4623A]" />}
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img 
                    src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80" 
                    alt="Linen Shirt" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="font-serif font-bold text-sm mt-3 text-[#1F2F4F] dark:text-[#FAF8F5]">Relaxed Linen & Selvedge Denim</div>
                <p className="text-xs text-neutral-500 mt-0.5">Ecru linen overshirt + 13.5oz Kuroki denim</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button fullWidth variant="primary" onClick={() => navigate('/try-on')} size="lg" className="text-sm font-semibold">
                Confirm & Try on 3D Avatar
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/planner/create-look')} className="px-6 text-sm">
                Edit Layers
              </Button>
            </div>
          </Card>
        </div>

        {/* Right: Wardrobe Utilities Toolbox (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Wardrobe Intelligence Utilities
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card 
              interactive 
              onClick={() => navigate('/planner/travel-packing')}
              className="p-4 space-y-2 hover:border-[#C4623A] transition-all rounded-2xl"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#C4623A]/10 text-[#C4623A] flex items-center justify-center">
                <Luggage size={20} />
              </div>
              <div className="font-serif font-bold text-sm text-[#1F2F4F] dark:text-[#FAF8F5]">Travel Packing</div>
              <p className="text-[11px] text-neutral-500">10kg Carry-on weight calculator & packing checklist</p>
            </Card>

            <Card 
              interactive 
              onClick={() => navigate('/planner/wear-history')}
              className="p-4 space-y-2 hover:border-[#C4623A] transition-all rounded-2xl"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <History size={20} />
              </div>
              <div className="font-serif font-bold text-sm text-[#1F2F4F] dark:text-[#FAF8F5]">Wear History</div>
              <p className="text-[11px] text-neutral-500">12-Day deliberate styling streak & CPW tracker</p>
            </Card>

            <Card 
              interactive 
              onClick={() => navigate('/planner/fit-notes')}
              className="p-4 space-y-2 hover:border-[#C4623A] transition-all rounded-2xl"
            >
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
                <Scissors size={20} />
              </div>
              <div className="font-serif font-bold text-sm text-[#1F2F4F] dark:text-[#FAF8F5]">Fit Notes</div>
              <p className="text-[11px] text-neutral-500">3 alteration logs, waist ease, and tailor tickets</p>
            </Card>

            <Card 
              interactive 
              onClick={() => navigate('/planner/builder')}
              className="p-4 space-y-2 hover:border-[#C4623A] transition-all rounded-2xl"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <Layers size={20} />
              </div>
              <div className="font-serif font-bold text-sm text-[#1F2F4F] dark:text-[#FAF8F5]">Outfit Builder</div>
              <p className="text-[11px] text-neutral-500">Anchor garment assembler with smart layer drape</p>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}