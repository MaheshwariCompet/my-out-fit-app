import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Sparkles, RotateCw, CheckCircle, Info, ArrowLeft, Sun, Moon, Sliders } from 'lucide-react';

export default function TryOnScreen() {
  const navigate = useNavigate();
  const [viewAngle, setViewAngle] = useState<'front' | 'side' | 'back'>('front');
  const [lighting, setLighting] = useState<'natural' | 'dusk'>('natural');

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full px-2 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[#C4623A] uppercase tracking-wider">
                BETA 3D DRAPE
              </span>
              <span className="text-xs text-neutral-500 font-medium">Elena’s Biometric Twin #AT-882</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
              Virtual Try-On Studio
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="md" onClick={() => navigate('/try-on/scan-guide')} className="text-xs">
            Posing & Lighting Guide
          </Button>
          <Button variant="primary" size="md" onClick={() => navigate('/')} className="text-xs font-semibold">
            Wear Today
          </Button>
        </div>
      </div>

      {/* Split-Pane Studio (12 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 3D Viewport with Angle & Lighting Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="overflow-hidden p-0 relative bg-neutral-950 border-0 shadow-2xl rounded-3xl">
            <div className="relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[4/5] w-full">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85" 
                alt="3D Drape Simulation" 
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Lighting Badge */}
              <div className="absolute top-4 left-4 flex gap-2">
                <button 
                  onClick={() => setLighting(lighting === 'natural' ? 'dusk' : 'natural')}
                  className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white flex items-center gap-1.5 border border-white/20"
                >
                  {lighting === 'natural' ? <Sun size={12} className="text-amber-400" /> : <Moon size={12} className="text-indigo-400" />}
                  {lighting === 'natural' ? 'Natural Daylight Studio' : 'Atelier Dusk'}
                </button>
              </div>

              {/* 360 Rotation Pill */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-5 py-2 rounded-full text-xs flex items-center gap-2 border border-white/20 shadow-lg">
                <RotateCw size={14} className="animate-spin text-[#C4623A]" /> 
                <span>Drag or swipe to rotate 360° turntable</span>
              </div>
            </div>

            {/* View Angle Switcher */}
            <div className="grid grid-cols-3 bg-neutral-900 border-t border-neutral-800 p-2 text-xs font-semibold text-white">
              {(['front', 'side', 'back'] as const).map(angle => (
                <button
                  key={angle}
                  onClick={() => setViewAngle(angle)}
                  className={`py-2.5 rounded-xl capitalize transition-all ${
                    viewAngle === angle ? 'bg-[#C4623A] text-white shadow-md' : 'hover:bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {angle} View
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Fit Stress Map, Tolerances & Tailoring Insight (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-6 space-y-5 rounded-3xl border border-[#E8E2D9] dark:border-[#2A313D]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                  Calibrated Match
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
                  Fit & Drape Assessment
                </h3>
              </div>
              <span className="font-serif font-bold text-2xl text-emerald-600">98%</span>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              True to size across current biometric parameters. Slight relaxed shoulder drape allows seamless sweater layering. Fabric tension across torso and hem is optimal with zero pulling or bunching.
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                <div className="text-[10px] text-neutral-400 font-semibold uppercase">Torso Ease</div>
                <div className="font-bold text-base mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">+1.8 cm</div>
              </div>
              <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                <div className="text-[10px] text-neutral-400 font-semibold uppercase">Sleeve Break</div>
                <div className="font-bold text-base mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">Exact</div>
              </div>
              <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                <div className="text-[10px] text-neutral-400 font-semibold uppercase">Hemline</div>
                <div className="font-bold text-base mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">Ankle Grazing</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <strong className="font-semibold text-[#C4623A] block">Tailor Recommendation</strong>
              Trousers sit approximately 2cm above true waist. Loosen waistband hook 1 notch for relaxed sitting ease while maintaining crisp vertical pleat drape.
            </div>

            <div className="space-y-2 pt-2">
              <Button fullWidth variant="primary" size="lg" onClick={() => navigate('/')} className="text-sm font-semibold">
                Wear This Look Today
              </Button>
              <Button fullWidth variant="outline" size="lg" onClick={() => navigate('/planner')} className="text-sm">
                Save to Daily Planner
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}