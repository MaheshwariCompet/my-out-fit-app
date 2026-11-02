import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Calendar, Check } from 'lucide-react';

export default function ConnectedCalendars() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="text-[10px] font-semibold text-[#C4623A] uppercase tracking-wider">Event-Aware Styling</span>
          <h1 className="font-serif text-2xl font-bold">Connected Calendars</h1>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        {[
          { name: "Google Calendar", email: "elena.rostova@gmail.com", connected: true },
          { name: "Microsoft Outlook", email: "elena.rostova@corporate.com", connected: true },
          { name: "Apple Calendar", email: "elena.rostova@icloud.com", connected: false }
        ].map((c, idx) => (
          <Card key={idx} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-[#C4623A]" />
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-[11px] text-neutral-500">{c.email}</div>
              </div>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.connected ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-neutral-100 text-neutral-500'}`}>
              {c.connected ? 'Connected' : 'Connect'}
            </span>
          </Card>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 text-xs text-neutral-500">
        Calendar agenda context is processed on-device to match your morning outfit recommendations to meetings and events.
      </div>

      <Button fullWidth variant="primary" onClick={() => navigate(-1)}>
        Done
      </Button>
    </div>
  );
}
