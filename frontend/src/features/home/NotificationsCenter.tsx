import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { ArrowLeft, Bell, Shirt, Sparkles, Check } from 'lucide-react';

export default function NotificationsCenter() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const notifications = [
    { id: '1', title: 'Morning Outfit Inspiration', desc: '14°C Crisp and rain forecasted. We prepared The Boardroom Sartorial for your 2:00 PM presentation.', time: '8:30 AM', read: false },
    { id: '2', title: 'Resting Fiber Completed', desc: 'Your Totême Camel Wool Coat has rested 48h and is fully refreshed for your rotation.', time: 'Yesterday', read: true },
    { id: '3', title: '1-Month Pro Stylist Renewal', desc: 'Your trial renews in 3 days. Manage your settings or cancel anytime.', time: '2 days ago', read: true }
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-serif text-2xl font-bold">Notifications</h1>
        <button className="text-xs text-[#C4623A] font-semibold">Mark all read</button>
      </div>

      <div className="flex gap-2 text-xs">
        {['All', 'Outfits', 'Care & Wardrobe'].map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-full ${
              filter === t ? 'bg-[#1F2F4F] text-white font-semibold' : 'bg-neutral-100 dark:bg-neutral-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {notifications.map(n => (
          <Card key={n.id} className={`p-4 space-y-1 transition-all ${!n.read ? 'border-[#C4623A]/40 bg-[#C4623A]/5' : ''}`}>
            <div className="flex justify-between items-baseline text-xs">
              <span className="font-semibold text-sm">{n.title}</span>
              <span className="text-[10px] text-neutral-400">{n.time}</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">{n.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
