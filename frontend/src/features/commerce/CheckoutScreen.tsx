import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Check, Shield, Sparkles, RefreshCw } from 'lucide-react';

export default function CheckoutScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleStartTrial = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/auth/trial-success');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button 
          type="button"
          onClick={() => navigate(-1)} 
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Checkout</span>
        <button 
          type="button"
          onClick={() => navigate(-1)} 
          className="text-xs text-neutral-500 hover:text-black dark:hover:text-white"
        >
          Restore Purchases
        </button>
      </div>

      <div className="text-center space-y-1">
        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#C4623A]/10 text-[#C4623A] uppercase tracking-wider">
          1-Month Free Trial Included
        </span>
        <h1 className="font-serif text-3xl font-bold mt-2 text-[#1F2F4F] dark:text-[#FAF8F5]">Pro Stylist Pass</h1>
        <p className="text-xs text-neutral-500 max-w-xs mx-auto">
          Curated capsule engineering and continuous outfit intelligence for your wardrobe.
        </p>
      </div>

      <Card className="border-2 border-[#C4623A] space-y-4 relative overflow-hidden">
        <div className="flex justify-between items-baseline">
          <div>
            <div className="font-serif text-2xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
              $14.99 <span className="text-xs font-sans text-neutral-500 font-normal">/ month</span>
            </div>
            <div className="text-xs text-[#C4623A] font-semibold mt-0.5">First 30 days completely complimentary</div>
          </div>
          <Sparkles className="text-[#C4623A]" size={22} />
        </div>

        <div className="space-y-2.5 text-xs pt-2 border-t border-[#E8E2D9] dark:border-[#2A313D]">
          <div className="flex items-start gap-2.5">
            <Check size={16} className="text-[#C4623A] shrink-0 mt-0.5" />
            <span className="text-[#1F2F4F] dark:text-[#FAF8F5]">Unlimited AI outfit combinations tailored to local weather & calendar</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Check size={16} className="text-[#C4623A] shrink-0 mt-0.5" />
            <span className="text-[#1F2F4F] dark:text-[#FAF8F5]">Automated calendar sync for work meetings and formal event attire</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Check size={16} className="text-[#C4623A] shrink-0 mt-0.5" />
            <span className="text-[#1F2F4F] dark:text-[#FAF8F5]">Wardrobe gap audit and pre-purchase compatibility checks</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Check size={16} className="text-[#C4623A] shrink-0 mt-0.5" />
            <span className="text-[#1F2F4F] dark:text-[#FAF8F5]">Travel packing capsules with airline cabin weight calculations</span>
          </div>
        </div>
      </Card>

      <Card className="space-y-2.5 text-xs">
        <div className="font-semibold text-neutral-500 uppercase tracking-wider text-[10px]">Summary of Charges</div>
        <div className="flex justify-between text-neutral-500">
          <span>Subtotal</span>
          <span>$14.99 / mo</span>
        </div>
        <div className="flex justify-between text-emerald-600 font-medium">
          <span>1-Month Free Trial Discount</span>
          <span>-$14.99</span>
        </div>
        <div className="pt-2 border-t border-[#E8E2D9] dark:border-[#2A313D] flex justify-between font-bold text-sm text-[#1F2F4F] dark:text-[#FAF8F5]">
          <span>Total Due Today</span>
          <span>$0.00</span>
        </div>
        <p className="text-[11px] text-neutral-400 pt-1">
          No charge until trial concludes in 30 days. Guaranteed reminder notification sent 3 days before renewal.
        </p>
      </Card>

      <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-[11px] text-neutral-500 flex items-center gap-2.5">
        <Shield size={16} className="shrink-0 text-neutral-600 dark:text-neutral-300" />
        <span>Payments are processed directly through your App Store / Google Play account. Cancel anytime in Settings.</span>
      </div>

      <Button 
        fullWidth 
        variant="primary" 
        size="lg"
        disabled={loading}
        onClick={handleStartTrial}
        className="flex items-center justify-center gap-2"
      >
        {loading ? <RefreshCw className="animate-spin" size={18} /> : 'Start 1-Month Free Trial • Pay $0.00 Today'}
      </Button>
    </div>
  );
}