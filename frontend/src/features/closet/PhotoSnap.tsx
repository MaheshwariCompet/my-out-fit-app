import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Camera, Sparkles, Check, RefreshCw } from 'lucide-react';

export default function PhotoSnap() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [segmenting, setSegmenting] = useState(false);
  const [autoRemoveBg, setAutoRemoveBg] = useState(true);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCapturedImage(url);
      setSegmenting(true);
      setTimeout(() => setSegmenting(false), 1200);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Photo Snap & Ingestion
        </span>
        <button onClick={() => navigate('/closet')} className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200">
          Cancel
        </button>
      </div>

      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl">
        {capturedImage ? (
          <img src={capturedImage} alt="Captured garment" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white/50 space-y-3 p-6">
            <Camera size={48} className="text-[#C4623A]" />
            <p className="text-xs text-center max-w-xs text-neutral-300">
              Position garment flat on a contrasting surface with natural lighting.
            </p>
          </div>
        )}

        {segmenting && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-3">
            <Sparkles size={32} className="text-[#C4623A] animate-spin" />
            <span className="text-xs font-medium">Removing background & isolating garment...</span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex gap-3">
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            ref={fileInputRef} 
            onChange={handleCapture} 
            className="hidden" 
          />
          <Button fullWidth variant="primary" onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2">
            <Camera size={16} /> {capturedImage ? 'Retake Photo' : 'Capture Flat Lay'}
          </Button>
        </div>
      </div>

      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="auto-remove-bg" className="text-xs font-semibold text-[#1F2F4F] dark:text-[#FAF8F5]">
            Auto-remove background
          </label>
          <input
            id="auto-remove-bg"
            type="checkbox"
            checked={autoRemoveBg}
            onChange={(e) => setAutoRemoveBg(e.target.checked)}
            className="w-4 h-4 text-[#C4623A] focus:ring-[#C4623A] rounded"
          />
        </div>
        <p className="text-[11px] text-neutral-500">
          Isolates piece automatically using client-side edge segmentation so it seamlessly pairs into flat-lay canvases.
        </p>
      </Card>

      {capturedImage && !segmenting && (
        <Button fullWidth variant="secondary" onClick={() => navigate('/closet')} className="flex items-center justify-center gap-2">
          <Check size={16} /> Save to Closet
        </Button>
      )}
    </div>
  );
}