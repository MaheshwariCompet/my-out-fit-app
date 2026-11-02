import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, WifiOff, ShieldCheck, RefreshCw, HardDrive, Cpu } from 'lucide-react';

export default function SystemDiagnostics() {
  const navigate = useNavigate();
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button 
          type="button"
          onClick={() => navigate(-1)} 
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Diagnostic Simulator</span>
          <h1 className="font-serif text-2xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">System Edge States</h1>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-3">
        <WifiOff size={18} className="text-[#C4623A] shrink-0" />
        <div>
          <strong className="font-semibold">Local Fallback:</strong> No Internet connection detected. Operating in local cached vault mode.
        </div>
      </div>

      <Card className="text-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto">
          <ShieldCheck size={32} />
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Encrypted Enclave Active</span>
          <h2 className="font-serif text-xl font-bold mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">Your Wardrobe is Fully Safe</h2>
          <p className="text-xs text-neutral-500 mt-2 max-w-sm mx-auto">
            Your 42 cataloged garments and weekly outfit plan are cached securely in offline storage. Wardrobe mutations will queue and synchronize when connection restores.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <div className="text-[10px] text-neutral-500 uppercase font-medium">Local Inventory</div>
            <div className="font-bold text-sm mt-0.5 text-[#1F2F4F] dark:text-[#FAF8F5]">42 Garments</div>
            <span className="text-[10px] text-emerald-600">✓ 100% Cached</span>
          </div>
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <div className="text-[10px] text-neutral-500 uppercase font-medium">Queued Updates</div>
            <div className="font-bold text-sm mt-0.5 text-[#1F2F4F] dark:text-[#FAF8F5]">3 Actions</div>
            <span className="text-[10px] text-amber-600">Pending Sync</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Button fullWidth onClick={handleRetry} disabled={retrying} className="flex items-center justify-center gap-2">
            <RefreshCw size={16} className={retrying ? 'animate-spin' : ''} />
            {retrying ? 'Verifying Network...' : 'Retry Connection'}
          </Button>
          <Button variant="outline" fullWidth onClick={() => navigate('/closet')}>
            View Offline Saved Capsule
          </Button>
        </div>
      </Card>

      <Card className="p-4 space-y-2.5 text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D9] dark:border-[#2A313D]">
          <span className="font-semibold flex items-center gap-1.5 text-[#1F2F4F] dark:text-[#FAF8F5]">
            <HardDrive size={14} /> Offline Cache
          </span>
          <span className="text-neutral-500">14.8 MB (IndexedDB)</span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D9] dark:border-[#2A313D]">
          <span className="font-semibold flex items-center gap-1.5 text-[#1F2F4F] dark:text-[#FAF8F5]">
            <Cpu size={14} /> Neural Drape Provider
          </span>
          <span className="text-emerald-600 font-medium">Sandboxed Local WASM</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[#1F2F4F] dark:text-[#FAF8F5]">Session Token</span>
          <span className="text-neutral-500">Valid for 72h offline</span>
        </div>
      </Card>
    </div>
  );
}