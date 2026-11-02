import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Clock } from 'lucide-react';

export default function NotificationPrefs() {
  const navigate = useNavigate();
  const [dispatchHour, setDispatchHour] = useState('07:30');
  const [morningAlerts, setMorningAlerts] = useState(true);
  const [laundryAlerts, setLaundryAlerts] = useState(true);
  const [trialReminder, setTrialReminder] = useState(true);

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="text-[10px] font-semibold text-[#C4623A] uppercase tracking-wider">Quiet Cadence</span>
          <h1 className="font-serif text-2xl font-bold">Notifications</h1>
        </div>
      </div>

      <Card className="p-4 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <div>
            <div className="font-semibold">Morning Outfit Inspiration</div>
            <div className="text-neutral-500">Delivered quietly before your morning routine</div>
          </div>
          <input type="checkbox" checked={morningAlerts} onChange={e => setMorningAlerts(e.target.checked)} className="w-4 h-4 text-[#C4623A]" />
        </div>

        <div className="pt-2 border-t border-[#E8E2D9] dark:border-[#2A313D] flex justify-between items-center text-xs">
          <span className="text-neutral-500">Dispatch Hour</span>
          <input type="time" value={dispatchHour} onChange={e => setDispatchHour(e.target.value)} className="bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg" />
        </div>
      </Card>

      <Card className="p-4 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <div>
            <div className="font-semibold">1-Month Trial Renewal Reminder</div>
            <div className="text-neutral-500">Guaranteed reminder notification sent 3 days before renewal</div>
          </div>
          <input type="checkbox" checked={trialReminder} disabled className="w-4 h-4 text-[#C4623A] opacity-80" />
        </div>
      </Card>

      <Button fullWidth variant="primary" onClick={() => navigate(-1)}>
        Save Notification Preferences
      </Button>
    </div>
  );
}
