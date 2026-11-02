import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Shield, Download, FileText, Trash2 } from 'lucide-react';

export default function PrivacyDataVault() {
  const navigate = useNavigate();
  const [cooldown, setCooldown] = useState(true);

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-serif text-2xl font-bold">Privacy & Data Vault</h1>
      </div>

      <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 text-xs text-neutral-600 dark:text-neutral-300 flex items-start gap-2.5">
        <Shield size={18} className="text-emerald-600 shrink-0 mt-0.5" />
        <span>"Your photos and measurements are encrypted and used only to power your outfits. You can delete them anytime."</span>
      </div>

      <Card className="p-4 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold">Mindful Reflection Cooldown (24 Hours)</span>
          <input type="checkbox" checked={cooldown} onChange={e => setCooldown(e.target.checked)} className="w-4 h-4 text-[#C4623A]" />
        </div>
        <p className="text-[11px] text-neutral-500">Buffers newly saved wishlist items for 24 hours to curb impulse purchases.</p>
      </Card>

      <div className="space-y-2">
        <Card interactive onClick={() => navigate('/profile/whitepaper')} className="p-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <FileText size={18} className="text-[#C4623A]" />
            <div>
              <div className="font-semibold">Review Encryption Whitepaper</div>
              <div className="text-[11px] text-neutral-500">Technical specifications and biometric hashing</div>
            </div>
          </div>
          <span className="text-neutral-400">›</span>
        </Card>

        <Card interactive onClick={() => alert("Downloading JSON archive...")} className="p-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Download size={18} className="text-[#C4623A]" />
            <div>
              <div className="font-semibold">Download Complete Archive</div>
              <div className="text-[11px] text-neutral-500">Export JSON & garment image archives in ZIP</div>
            </div>
          </div>
          <span className="text-neutral-400">›</span>
        </Card>
      </div>

      <Button fullWidth variant="primary" onClick={() => navigate(-1)}>
        Save Privacy Settings
      </Button>
    </div>
  );
}
