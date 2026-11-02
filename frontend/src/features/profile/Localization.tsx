import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Check } from 'lucide-react';

export default function Localization() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en-US');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [temp, setTemp] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [currency, setCurrency] = useState('USD');
  const [sizingStandard, setSizingStandard] = useState('EU');

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
          <span className="text-[10px] font-semibold text-[#C4623A] uppercase tracking-wider">Active Calibration</span>
          <h1 className="font-serif text-2xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">Locale & Units</h1>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Primary Language</label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { code: 'en-US', label: 'English (US)' },
            { code: 'en-GB', label: 'English (UK)' },
            { code: 'fr-FR', label: 'Français (France)' },
            { code: 'de-DE', label: 'Deutsch' },
            { code: 'hi-IN', label: 'Hindi (हिंदी)' },
            { code: 'ta-IN', label: 'Tamil (தமிழ்)' },
          ].map(l => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLang(l.code)}
              className={`p-3 rounded-xl border text-left flex justify-between items-center transition-all ${
                lang === l.code 
                  ? 'border-[#C4623A] bg-[#C4623A]/5 font-semibold text-[#C4623A]' 
                  : 'border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#1B1F27] text-[#1F2F4F] dark:text-[#FAF8F5]'
              }`}
            >
              <span>{l.label}</span>
              {lang === l.code && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Dimension & Fit Units</label>
        <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setUnit('metric')}
            className={`py-3 rounded-xl border transition-all ${
              unit === 'metric' 
                ? 'bg-[#1F2F4F] text-white dark:bg-white dark:text-[#1F2F4F]' 
                : 'border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#1B1F27] text-[#1F2F4F] dark:text-[#FAF8F5]'
            }`}
          >
            Metric (cm, kg)
          </button>
          <button
            type="button"
            onClick={() => setUnit('imperial')}
            className={`py-3 rounded-xl border transition-all ${
              unit === 'imperial' 
                ? 'bg-[#1F2F4F] text-white dark:bg-white dark:text-[#1F2F4F]' 
                : 'border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#1B1F27] text-[#1F2F4F] dark:text-[#FAF8F5]'
            }`}
          >
            Imperial (in, lbs)
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Atmosphere & Weather</label>
        <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTemp('celsius')}
            className={`py-3 rounded-xl border transition-all ${
              temp === 'celsius' 
                ? 'bg-[#1F2F4F] text-white dark:bg-white dark:text-[#1F2F4F]' 
                : 'border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#1B1F27] text-[#1F2F4F] dark:text-[#FAF8F5]'
            }`}
          >
            Celsius (°C)
          </button>
          <button
            type="button"
            onClick={() => setTemp('fahrenheit')}
            className={`py-3 rounded-xl border transition-all ${
              temp === 'fahrenheit' 
                ? 'bg-[#1F2F4F] text-white dark:bg-white dark:text-[#1F2F4F]' 
                : 'border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#1B1F27] text-[#1F2F4F] dark:text-[#FAF8F5]'
            }`}
          >
            Fahrenheit (°F)
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Garment Sizing Standard</label>
        <div className="grid grid-cols-4 gap-2 text-xs font-semibold">
          {['EU', 'US', 'UK', 'INT'].map(standard => (
            <button
              key={standard}
              type="button"
              onClick={() => setSizingStandard(standard)}
              className={`py-2.5 rounded-xl border transition-all ${
                sizingStandard === standard 
                  ? 'bg-[#C4623A] text-white' 
                  : 'border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#1B1F27] text-[#1F2F4F] dark:text-[#FAF8F5]'
              }`}
            >
              {standard}
            </button>
          ))}
        </div>
      </div>

      <Button fullWidth variant="primary" onClick={() => navigate(-1)}>
        Save Regional Settings
      </Button>
    </div>
  );
}