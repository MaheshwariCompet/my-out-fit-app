import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function TrialSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center max-w-sm mx-auto p-4 space-y-6 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto">
        <Sparkles size={32} />
      </div>

      <div className="space-y-1">
        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 uppercase">
          Pro Stylist Pass Activated
        </span>
        <h1 className="font-serif text-3xl font-bold mt-2">Welcome to Elena's MyOutFit Pro</h1>
        <p className="text-xs text-neutral-500 max-w-xs mx-auto">
          Your 1-month complimentary pass is running. Enjoy seamless AI styling and personalized drape advice.
        </p>
      </div>

      <Card className="p-4 space-y-3 text-left text-xs">
        <div className="flex items-center gap-2">
          <Check size={16} className="text-[#C4623A]" />
          <span>Full access to 3D virtual try-on studio</span>
        </div>
        <div className="flex items-center gap-2">
          <Check size={16} className="text-[#C4623A]" />
          <span>Calendar & weather-aware morning outfit curations</span>
        </div>
        <div className="flex items-center gap-2">
          <Check size={16} className="text-[#C4623A]" />
          <span>Guaranteed billing reminder sent 3 days before renewal</span>
        </div>
      </Card>

      <Button 
        fullWidth 
        variant="primary" 
        onClick={() => navigate('/')} 
        className="flex items-center justify-center gap-2"
      >
        Go to Home Dashboard <ArrowRight size={16} />
      </Button>
    </div>
  );
}