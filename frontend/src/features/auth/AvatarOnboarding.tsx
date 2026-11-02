import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Camera, Upload, ShieldCheck, Sun, UserCheck, Shirt, ArrowLeft } from 'lucide-react';

export default function AvatarOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'viewfinder' | 'processing'>('viewfinder');
  const [showLabels, setShowLabels] = useState(false);

  const startScan = () => {
    setStep('processing');
    setTimeout(() => {
      navigate('/auth/trial-success');
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto min-h-screen pb-12 pt-4">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Step 2 of 3 • Avatar Fitting</span>
        <button 
          onClick={() => navigate('/auth/trial-success')} 
          className="text-xs font-semibold text-neutral-500 hover:text-[#C4623A]"
        >
          Skip for now
        </button>
      </div>

      <div>
        <h1 className="font-serif text-2xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
          Create Your Sartorial Twin
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          A privacy-first 3D silhouette calibrated to your measurements, powering realistic fabric drape and outfit previews.
        </p>
      </div>

      {step === 'processing' ? (
        <Card className="p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full border-4 border-[#C4623A] border-t-transparent animate-spin mx-auto" />
          <h2 className="font-serif text-lg font-bold">Distilling Mesh Geometry</h2>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto">
            Extracting 68,000 anonymized parametric drape vertices. Raw images are scrubbed from memory buffers immediately.
          </p>
        </Card>
      ) : (
        <>
          {/* Viewfinder Target */}
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" 
              alt="Scanning Viewfinder" 
              className="w-full h-full object-cover opacity-60 filter contrast-125"
            />
            
            <div className="absolute inset-8 border border-white/30 rounded-2xl pointer-events-none flex items-center justify-center">
              <div className="w-32 h-64 border border-dashed border-white/60 rounded-full animate-pulse flex items-center justify-center">
                <span className="text-[10px] text-white/80 bg-black/50 px-2 py-0.5 rounded-full">Align body in frame</span>
              </div>
            </div>

            <div className="absolute top-4 left-4 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Viewfinder Ready
            </div>

            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <Button fullWidth variant="primary" onClick={startScan} className="flex items-center gap-2">
                <Camera size={16} /> Take Standing Photo
              </Button>
              <Button fullWidth variant="outline" onClick={startScan} className="bg-black/40 text-white border-white/20 backdrop-blur-md flex items-center gap-2">
                <Upload size={16} /> Upload Full-Body Photo
              </Button>
            </div>
          </div>

          {/* Guidelines */}
          <Card className="space-y-3">
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Studio Posing Guidelines</div>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Sun size={16} className="text-[#C4623A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#1F2F4F] dark:text-[#FAF8F5]">Natural, Even Daylight</span>
                  <span className="text-neutral-500">Stand facing balanced light to avoid heavy contour shadows.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <UserCheck size={16} className="text-[#C4623A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#1F2F4F] dark:text-[#FAF8F5]">Relaxed Upright Pose</span>
                  <span className="text-neutral-500">Feet hip-width apart and hands resting slightly away from thighs.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Shirt size={16} className="text-[#C4623A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#1F2F4F] dark:text-[#FAF8F5]">Fitted Base Layer</span>
                  <span className="text-neutral-500">Wear athletic wear or fitted attire so fabric measurements calibrate accurately.</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Preferences & Privacy */}
          <Card className="space-y-3 bg-[#FAF8F5] dark:bg-[#161A22] border-neutral-200">
            <div className="flex items-center justify-between">
              <label htmlFor="body-shape-toggle" className="text-xs font-semibold text-[#1F2F4F] dark:text-[#FAF8F5]">
                Show body shape labels
              </label>
              <input 
                id="body-shape-toggle"
                type="checkbox" 
                checked={showLabels} 
                onChange={(e) => setShowLabels(e.target.checked)} 
                className="w-4 h-4 rounded text-[#C4623A] focus:ring-[#C4623A]"
              />
            </div>
            <p className="text-[11px] text-neutral-500">
              When disabled, displays descriptive styling notes rather than categorical physical tags across outfits.
            </p>

            <div className="pt-2 border-t border-[#E8E2D9] dark:border-[#2A313D] flex items-start gap-2 text-[11px] text-neutral-500">
              <ShieldCheck size={14} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>Your photos and measurements are encrypted and used only to power your outfits. You can delete them anytime.</span>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}