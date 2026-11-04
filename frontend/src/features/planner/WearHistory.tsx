import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Flame, Calendar, DollarSign, RefreshCw, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useWardrobe } from '../../context/WardrobeContext';

interface WearLog {
  id: string;
  date: string;
  context_title: string;
  weather_summary: string;
  streak_count: number;
  rating: number;
  outfits?: {
    title: string;
  };
}

export default function WearHistory() {
  const navigate = useNavigate();
  const { streakCount } = useWardrobe();
  const [logs, setLogs] = useState<WearLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('wear_history')
          .select(`
            id,
            date,
            context_title,
            weather_summary,
            streak_count,
            rating,
            outfits (
              title
            )
          `)
          .order('date', { ascending: false });

        if (error) throw error;
        setLogs((data as any) || []);
      } catch (err) {
        console.error('Failed to load wear history:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full px-2 sm:px-4 pb-12">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <span className="text-[10px] font-bold text-[#C4623A] uppercase tracking-wider">Mindful Consumption</span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
              Wardrobe Wear History
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#C4623A]/10 text-[#C4623A] px-3 py-1.5 rounded-2xl text-xs font-bold">
          <Flame size={16} /> {streakCount}-Day Active Streak
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <div className="text-[10px] uppercase font-bold text-neutral-400">Total Outfits Worn</div>
          <div className="font-serif text-2xl font-bold mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">{logs.length}</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-[10px] uppercase font-bold text-neutral-400">Current Streak</div>
          <div className="font-serif text-2xl font-bold mt-1 text-[#C4623A]">{streakCount} Days</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-[10px] uppercase font-bold text-neutral-400">CPW Optimization</div>
          <div className="font-serif text-2xl font-bold mt-1 text-emerald-600">+14.2%</div>
        </Card>
      </div>

      <div className="space-y-3">
        <h2 className="font-serif text-lg font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">Logged Wear Events</h2>
        {loading ? (
          <div className="text-center py-12"><RefreshCw size={24} className="animate-spin mx-auto text-[#C4623A]" /></div>
        ) : logs.length === 0 ? (
          <Card className="text-center py-12 text-neutral-500 text-xs">
            No wear events logged yet. Confirm your daily look by clicking "Wear Today".
          </Card>
        ) : (
          logs.map((log) => (
            <Card key={log.id} className="p-4 flex items-center justify-between rounded-2xl border border-[#E8E2D9] dark:border-[#2A313D]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
                    {log.outfits?.title || log.context_title}
                  </h3>
                  <p className="text-[11px] text-neutral-500">{log.date} • {log.weather_summary}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-[#C4623A]">Streak #{log.streak_count}</span>
                <div className="text-[10px] text-neutral-400">Verified Wear</div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}