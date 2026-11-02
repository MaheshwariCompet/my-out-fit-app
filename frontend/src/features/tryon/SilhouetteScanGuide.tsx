import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Sun, UserCheck, Shirt } from 'lucide-react';

export default function SilhouetteScanGuide() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-serif text-2xl font-bold">Silhouette Scanning Guide</h1>
      </div>

      <Card className="p-4 space-y-4 text-xs">
        <div className="flex items-start gap-3">
          <Sun size={20} className="text-[#C4623A] shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-sm">Natural, Even Ambient Light</div>
            <p className="text-neutral-500 mt-0.5">Stand facing natural daylight or dispersed indoor lighting; avoid harsh backlight.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <UserCheck size={20} className="text-[#C4623A] shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-sm">Relaxed Upright Pose</div>
            <p className="text-neutral-500 mt-0.5">Keep shoulders easy, heels hip-width apart, and hands resting slightly away from thighs.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Shirt size={20} className="text-[#C4623A] shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-sm">Fitted Base Layer</div>
            <p className="text-neutral-500 mt-0.5">Wear fitted athletic wear or base layer garments so measurements calibrate accurately.</p>
          </div>
        </div>
      </Card>

      <Button fullWidth variant="primary" onClick={() => navigate('/try-on')}>
        Ready to Scan
      </Button>
    </div>
  );
}
