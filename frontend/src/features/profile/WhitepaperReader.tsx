import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, ShieldCheck, Download } from 'lucide-react';

export default function WhitepaperReader() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-semibold text-neutral-400">Architecture v2.4</span>
        <button onClick={() => alert("Downloading PDF Whitepaper...")} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <Download size={16} />
        </button>
      </div>

      <div>
        <h1 className="font-serif text-2xl font-bold">Wardrobe Privacy & Biometric Encryption</h1>
        <p className="text-xs text-neutral-500 mt-1">4 min read • Updated October 2026</p>
      </div>

      <Card className="p-4 space-y-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
        <p><strong>01. Client-Side Cryptographic Vault:</strong> Your body geometry and wardrobe imagery are encrypted with AES-256 before synchronization.</p>
        <p><strong>02. Ephemeral 3D Silhouette Processing:</strong> Full-body scans are processed in sandboxed memory buffers and distilled into anonymized geometric drape vectors. Raw photos are scrubbed immediately.</p>
        <p><strong>03. Store In-App Direct Billing:</strong> Payments are processed directly through your platform store. MyOutFit never collects or stores credit card numbers.</p>
      </Card>
    </div>
  );
}
