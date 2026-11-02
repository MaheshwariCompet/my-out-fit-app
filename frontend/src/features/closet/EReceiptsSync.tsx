import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Copy, Check, ShieldCheck } from 'lucide-react';

export default function EReceiptsSync() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const inboundEmail = "elena.closet@myoutfit.app";

  const handleCopy = () => {
    navigator.clipboard.writeText(inboundEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="text-[10px] font-semibold text-[#C4623A] uppercase tracking-wider">Automated Intake</span>
          <h1 className="font-serif text-2xl font-bold">E-Receipts & Sync</h1>
        </div>
      </div>

      <Card className="space-y-3">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Your Wardrobe Inbound Address</span>
        <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-mono">
          <span>{inboundEmail}</span>
          <button 
            type="button"
            onClick={handleCopy} 
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#C4623A]"
            aria-label="Copy Email"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <p className="text-[11px] text-neutral-500">
          Forward order confirmations from Zara, Totême, Net-a-Porter, COS, etc. AI automatically extracts purchase dates, fabrics, prices, and care instructions.
        </p>
      </Card>

      <Card className="space-y-3">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Recent Parsed Purchases</div>
        {[
          { title: "Totême Silk Blouse", brand: "Totême", date: "Delivered Oct 24", price: "$240", status: "Ready" },
          { title: "Japanese Selvedge Denim", brand: "Kuroki Mill", date: "Delivered Oct 18", price: "$185", status: "Ready" },
          { title: "Cashmere Beanie", brand: "Arket", date: "Delivered Oct 12", price: "$75", status: "Ready" }
        ].map((item, idx) => (
          <div key={idx} className="flex justify-between items-center py-2.5 border-b border-[#E8E2D9] dark:border-[#2A313D] text-xs last:border-b-0">
            <div>
              <div className="font-semibold text-[#1F2F4F] dark:text-[#FAF8F5]">{item.title}</div>
              <div className="text-[11px] text-neutral-500">{item.brand} • {item.date}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">{item.price}</div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{item.status}</span>
            </div>
          </div>
        ))}
      </Card>

      <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 text-xs text-neutral-500 flex items-start gap-2.5">
        <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
        <span>Only retail receipt emails are parsed. Personal emails are never read, analyzed, or stored on external servers.</span>
      </div>

      <Button fullWidth variant="primary" onClick={() => navigate('/closet')}>
        Done (Return to Closet)
      </Button>
    </div>
  );
}