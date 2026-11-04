import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Camera, Check, ShieldCheck, Sun, UserCheck, Shirt } from 'lucide-react';

export default function SilhouetteScanGuide() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12 px-2 sm:px-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="text-[10px] font-bold text-[#C4623A] uppercase tracking-wider">Calibration Guide</span>
          <h1 className="font-serif text-2xl font-bold">Posing & Lighting Guidelines</h1>
        </div>
      </div>

      <Card className="space-y-4 p-5 rounded-3xl">
        <div className="flex items-start gap-3">
          <Sun size={20} className="text-[#C4623A] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-xs">Balanced Ambient Light</h3>
            <p className="text-[11px] text-neutral-500">Stand directly facing natural daylight to eliminate hard body contour shadows.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <UserCheck size={20} className="text-[#C4623A] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-xs">Neutral Upright Stance</h3>
            <p className="text-[11px] text-neutral-500">Feet hip-width apart and arms resting 10cm away from your sides.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Shirt size={20} className="text-[#C4623A] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-xs">Fitted Base Layer</h3>
            <p className="text-[11px] text-neutral-500">Form-fitting athletic wear allows the algorithm to extract exact millimeter tolerances.</p>
          </div>
        </div>
      </Card>

      <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-[11px] text-neutral-500 flex items-start gap-2.5">
        <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
        <span>Raw viewfinder imagery is processed in memory and never persisted to external cloud servers.</span>
      </div>

      <Button 
        fullWidth 
        variant="primary" 
        size="lg" 
        onClick={() => navigate('/auth/avatar-onboarding')}
        className="flex items-center justify-center gap-2"
      >
        <Camera size={18} /> I'm Ready to Scan
      </Button>
    </div>
  );
}