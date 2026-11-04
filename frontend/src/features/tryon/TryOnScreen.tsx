import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Sparkles, RotateCw, Check, Sun, Moon, ArrowLeft, 
  Eye, EyeOff, Camera, Sliders, RefreshCw, Smile, Users, Info
} from 'lucide-react';
import { useWardrobe } from '../../context/WardrobeContext';

export default function TryOnScreen() {
  const navigate = useNavigate();
  const { activeOutfit, markWornToday, hasWornToday, streakCount } = useWardrobe();

  // Mode & Personalization State
  const [studioMode, setStudioMode] = useState<'mirror_image' | 'capsule_doll'>('mirror_image');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // 1. Mirror Image Measurement Attributes
  const [height, setHeight] = useState(174);
  const [waist, setWaist] = useState(68);
  const [bust, setBust] = useState(88);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  // 2. Playful Avatar (Virtual Doll) Emotes (Computed dynamically)
  const [mascotEmote, setMascotEmote] = useState<'happy' | 'chic' | 'cozy'>('happy');

  const [activeLayers, setActiveLayers] = useState<string[]>(() => 
    activeOutfit?.pieces?.map(p => p.id) || []
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sync Layers when outfit changes
  useEffect(() => {
    if (activeOutfit?.pieces) {
      setActiveLayers(activeOutfit.pieces.map(p => p.id));
    }
  }, [activeOutfit]);

  // Mascot dynamic emote based on clothing layers
  useEffect(() => {
    if (activeLayers.length >= 3) {
      setMascotEmote('chic'); // Layered styling
    } else {
      setMascotEmote('cozy'); // Relaxed
    }
  }, [activeLayers]);

  // Image upload simulation for biometric mapping
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarImage(URL.createObjectURL(file));
    }
  };

  // Rendering 3D Turntable on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const heightLimit = canvas.height;
    ctx.clearRect(0, 0, width, heightLimit);

    // Studio Background
    const bgGrad = ctx.createRadialGradient(width/2, heightLimit*0.4, 10, width/2, heightLimit/2, width*0.7);
    bgGrad.addColorStop(0, studioMode === 'mirror_image' ? '#1E293B' : '#312E81');
    bgGrad.addColorStop(1, '#0F172A');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, heightLimit);

    // Perspective Platform Turntable
    ctx.save();
    ctx.translate(width / 2, heightLimit * 0.88);
    ctx.scale(1, 0.3);
    ctx.beginPath();
    ctx.arc(0, 0, 160, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#C4623A';
    ctx.stroke();

    // 360 platform tickmarks
    for (let i = 0; i < 12; i++) {
      const angleRad = ((i * 30 + rotationAngle) * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angleRad) * 140, Math.sin(angleRad) * 140);
      ctx.lineTo(Math.cos(angleRad) * 155, Math.sin(angleRad) * 155);
      ctx.strokeStyle = 'rgba(196, 98, 58, 0.4)';
      ctx.stroke();
    }
    ctx.restore();

    // Begin Rendering 3D Characters
    ctx.save();
    ctx.translate(width / 2, heightLimit * 0.48);

    const rad = (rotationAngle * Math.PI) / 180;
    const xPerspective = Math.sin(rad);

    if (studioMode === 'mirror_image') {
      // Human-biometric generation based on height, waist, bust sliders
      const heightOffset = (height - 174) * 0.85; 
      const widthMultiplier = (waist / 68) * 1.02;
      const chestVolume = (bust / 88) * 1.05;

      // Soft Shadow on Platform
      ctx.beginPath();
      ctx.ellipse(0, 200 - heightOffset, 45 * widthMultiplier, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fill();

      // Human Base Skin Core & Shading
      // Head and User Photo overlay simulation
      ctx.beginPath();
      ctx.arc(0, -180 + heightOffset, 22, 0, Math.PI * 2);
      ctx.fillStyle = '#E2B897';
      ctx.fill();

      // Face profile features based on rotation
      ctx.beginPath();
      ctx.arc(xPerspective * 8, -180 + heightOffset, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#C48A58';
      ctx.fill();

      // Hair
      ctx.beginPath();
      ctx.arc(0, -186 + heightOffset, 24, Math.PI, Math.PI * 2);
      ctx.fillStyle = '#312A25';
      ctx.fill();

      // 1. Leg draping based on Waist slider
      const hasLeggings = activeLayers.some(id => activeOutfit?.pieces?.find(p => p.id === id)?.category === 'bottoms');
      if (hasLeggings) {
        ctx.beginPath();
        ctx.moveTo(-24 * widthMultiplier, -20 + heightOffset);
        ctx.lineTo(24 * widthMultiplier, -20 + heightOffset);
        ctx.lineTo(16 + xPerspective * 8, 190 - heightOffset);
        ctx.lineTo(3, 190 - heightOffset);
        ctx.lineTo(0, 20);
        ctx.lineTo(-3, 190 - heightOffset);
        ctx.lineTo(-16 + xPerspective * 8, 190 - heightOffset);
        ctx.closePath();
        ctx.fillStyle = '#D97706'; // Warm leggings tone
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#B45309';
        ctx.stroke();
      }

      // 2. Chest & Torso fit based on Bust slider
      const hasTops = activeLayers.some(id => activeOutfit?.pieces?.find(p => p.id === id)?.category === 'tops' || activeOutfit?.pieces?.find(p => p.id === id)?.category === 'knitwear');
      if (hasTops) {
        ctx.beginPath();
        ctx.moveTo(-32 * chestVolume, -145 + heightOffset);
        ctx.lineTo(32 * chestVolume, -145 + heightOffset);
        ctx.lineTo(26 * widthMultiplier, -20 + heightOffset);
        ctx.lineTo(-26 * widthMultiplier, -20 + heightOffset);
        ctx.closePath();
        ctx.fillStyle = '#F472B6'; // Pink custom shirt
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#EC4899';
        ctx.stroke();

        // Sleeve dynamic adjustments
        ctx.beginPath();
        ctx.moveTo(-32 * chestVolume, -145 + heightOffset);
        ctx.lineTo(-44 - xPerspective * 10, -10 + heightOffset);
        ctx.lineTo(-32 - xPerspective * 10, -10 + heightOffset);
        ctx.lineTo(-18, -120 + heightOffset);
        ctx.fillStyle = '#DB2777';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(32 * chestVolume, -145 + heightOffset);
        ctx.lineTo(44 + xPerspective * 10, -10 + heightOffset);
        ctx.lineTo(32 + xPerspective * 10, -10 + heightOffset);
        ctx.lineTo(18, -120 + heightOffset);
        ctx.fillStyle = '#DB2777';
        ctx.fill();
      }

      // 3. Shoes
      const hasShoes = activeLayers.some(id => activeOutfit?.pieces?.find(p => p.id === id)?.category === 'footwear');
      if (hasShoes) {
        ctx.beginPath();
        ctx.ellipse(-12 + xPerspective * 8, 192 - heightOffset, 12, 6, 0, 0, Math.PI * 2);
        ctx.ellipse(12 + xPerspective * 8, 192 - heightOffset, 12, 6, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#4B5563';
        ctx.fill();
      }

    } else {
      // Dynamic Virtual Doll Mascots 
      // Playful expressive doll modeling

      // Mascot Round Body Shape
      ctx.beginPath();
      ctx.arc(0, -20, 68, 0, Math.PI * 2);
      ctx.fillStyle = '#C4623A'; // Orange capsule character
      ctx.fill();

      // Big Doll Ears
      ctx.beginPath();
      ctx.arc(-55, -75, 20, 0, Math.PI * 2);
      ctx.arc(55, -75, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#A04E2B';
      ctx.fill();

      // Giant Doll Head / Eyes
      ctx.beginPath();
      ctx.arc(0, -90, 48, 0, Math.PI * 2);
      ctx.fillStyle = '#C4623A';
      ctx.fill();

      // Doll Expressions based on clothing layers
      if (mascotEmote === 'chic') {
        // Star eyes (chic layered)
        ctx.font = 'bold 22px Arial';
        ctx.fillStyle = '#FAF8F5';
        ctx.fillText('★', -28, -90);
        ctx.fillText('★', 10, -90);
      } else {
        // Big happy circle eyes (happy status)
        ctx.beginPath();
        ctx.arc(-16, -92, 6, 0, Math.PI * 2);
        ctx.arc(16, -92, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#1F2F4F';
        ctx.fill();
      }

      // Warm smiling mouth & blushing
      ctx.beginPath();
      ctx.arc(-24, -78, 6, 0, Math.PI * 2);
      ctx.arc(24, -78, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#F472B6'; // blushing
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, -82, 8, 0, Math.PI);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#1F2F4F';
      ctx.stroke();

      // Staging apparel shrunk to fit tiny round mascot:
      const hasTops = activeLayers.some(id => activeOutfit?.pieces?.find(p => p.id === id)?.category === 'tops');
      if (hasTops) {
        ctx.beginPath();
        ctx.moveTo(-44, -18);
        ctx.bezierCurveTo(-50, 48, 50, 48, 44, -18);
        ctx.closePath();
        ctx.fillStyle = '#F472B6'; // Pink tiny shirt on Doll
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#EC4899';
        ctx.stroke();
      }

      const hasLeggings = activeLayers.some(id => activeOutfit?.pieces?.find(p => p.id === id)?.category === 'bottoms');
      if (hasLeggings) {
        // tiny pants
        ctx.beginPath();
        ctx.moveTo(-32, 28);
        ctx.lineTo(32, 28);
        ctx.lineTo(24, 100);
        ctx.lineTo(0, 36);
        ctx.lineTo(-24, 100);
        ctx.closePath();
        ctx.fillStyle = '#D97706';
        ctx.fill();
      }
    }

    ctx.restore();
  }, [studioMode, rotationAngle, height, waist, bust, activeLayers, activeOutfit, mascotEmote]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotationAngle(prev => (prev + deltaX * 0.9 + 360) % 360);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full px-2 sm:px-4 pb-12 animate-in fade-in">
      {/* Upper Navigation Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C4623A]/10 text-[#C4623A] uppercase tracking-wider">
              {studioMode === 'mirror_image' ? 'Advanced Biometric Mesh' : 'Doll Playhouse Mode'}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
              {studioMode === 'mirror_image' ? 'The "Mirror Image" Studio' : 'The Capsule Virtual Doll'}
            </h1>
          </div>
        </div>

        {/* Dynamic Multi-Mode Switcher Panel */}
        <div className="flex bg-[#E8E2D9] dark:bg-[#2A313D] p-1 rounded-2xl gap-1">
          <button
            onClick={() => setStudioMode('mirror_image')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              studioMode === 'mirror_image' ? 'bg-[#1F2F4F] text-white shadow-sm' : 'text-neutral-600 dark:text-neutral-400'
            }`}
          >
            <Users size={13} /> Mirror Image (Photo-to-3D)
          </button>
          <button
            onClick={() => setStudioMode('capsule_doll')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              studioMode === 'capsule_doll' ? 'bg-[#1F2F4F] text-white shadow-sm' : 'text-neutral-600 dark:text-neutral-400'
            }`}
          >
            <Smile size={13} /> Playful Virtual Doll
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Fitting Window (7 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="overflow-hidden p-0 relative rounded-3xl border border-[#E8E2D9] dark:border-[#2A313D] shadow-2xl bg-neutral-950 select-none">
            <canvas 
              ref={canvasRef}
              width={640}
              height={520}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full h-[440px] sm:h-[480px] cursor-grab active:cursor-grabbing block"
            />

            {/* Platform Angle Indicator Overlay */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] text-white flex items-center gap-2 border border-white/10">
              <RotateCw size={13} className="text-[#C4623A] animate-spin-slow" />
              <span>Rotational Orbital: {Math.round(rotationAngle)}° ({
                rotationAngle < 45 || rotationAngle > 315 ? 'Front View' :
                rotationAngle >= 45 && rotationAngle <= 135 ? 'Right Profile' :
                rotationAngle > 135 && rotationAngle < 225 ? 'Rear View' : 'Left Profile'
              })</span>
            </div>

            {/* Biometric Avatar Personalization Overlay HUD */}
            {studioMode === 'mirror_image' && (
              <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-lg p-4 rounded-3xl border border-white/10 text-white w-52 space-y-3 z-10">
                <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Sliders size={11} /> Mirror Configuration
                </div>

                {/* selfie input capture */}
                <div className="flex items-center gap-2 pb-2.5 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/20 overflow-hidden flex items-center justify-center relative shrink-0">
                    {avatarImage ? (
                      <img src={avatarImage} alt="User selfie" className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={14} className="text-neutral-400" />
                    )}
                  </div>
                  <div className="text-[10px] min-w-0">
                    <div className="font-semibold truncate">Upload Face Selfie</div>
                    <label className="text-emerald-400 hover:underline cursor-pointer font-bold block mt-0.5">
                      Choose file
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="space-y-2 text-[10px]">
                  <div className="space-y-0.5">
                    <div className="flex justify-between">
                      <span className="opacity-70">Height</span>
                      <span className="font-bold text-emerald-400">{height}cm</span>
                    </div>
                    <input 
                      type="range" min="150" max="200" value={height} 
                      onChange={e => setHeight(parseInt(e.target.value))}
                      className="w-full accent-emerald-500" 
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between">
                      <span className="opacity-70">Waist</span>
                      <span className="font-bold text-emerald-400">{waist}cm</span>
                    </div>
                    <input 
                      type="range" min="50" max="120" value={waist} 
                      onChange={e => setWaist(parseInt(e.target.value))}
                      className="w-full accent-emerald-500" 
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between">
                      <span className="opacity-70">Bust</span>
                      <span className="font-bold text-emerald-400">{bust}cm</span>
                    </div>
                    <input 
                      type="range" min="65" max="130" value={bust} 
                      onChange={e => setBust(parseInt(e.target.value))}
                      className="w-full accent-emerald-500" 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Playful Emotive mascot speech bubble */}
            {studioMode === 'capsule_doll' && (
              <div className="absolute bottom-4 left-4 bg-[#C4623A] text-white p-3 rounded-2xl border border-white/10 max-w-[240px] shadow-lg text-[11px] font-semibold animate-bounce-slow">
                <div className="text-[9px] uppercase tracking-wider text-amber-200 mb-0.5 flex items-center gap-1">
                  <span>🌦️ Wed 18°C Mild Overcast</span>
                </div>
                "{mascotEmote === 'chic' ? 'Feeling fancy in these layered combinations!' : 'This outfit feels cozy for mild weather!'}"
              </div>
            )}

            {/* Platform turn-guides */}
            <div className="absolute bottom-4 right-4 flex gap-1">
              {[0, 90, 180, 270].map(deg => (
                <button
                  key={deg}
                  onClick={() => setRotationAngle(deg)}
                  className={`w-8 h-8 rounded-full text-[10px] font-bold border transition-colors ${
                    Math.abs(rotationAngle - deg) < 15 
                      ? 'bg-[#C4623A] text-white border-[#C4623A]' 
                      : 'bg-black/40 text-white border-white/10'
                  }`}
                >
                  {deg}°
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Apparel Fitting and Actions Grid (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-5 space-y-4 rounded-3xl border border-[#E8E2D9] dark:border-[#2A313D]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                  Biometric Outfit Fitted
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
                  Active Layer Pieces
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                {activeOutfit?.synergy_score || 96}% Drape
              </span>
            </div>

            <p className="text-xs text-neutral-500">
              Toggle the eye visibility to add or take off pieces on the 3D model:
            </p>

            {/* Staged Garment List */}
            <div className="space-y-2.5">
              {activeOutfit?.pieces?.map((piece, idx) => {
                const isSelected = activeLayers.includes(piece.id);
                return (
                  <div 
                    key={piece.id}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'border-[#C4623A] bg-[#C4623A]/5' 
                        : 'border-[#E8E2D9] dark:border-[#2A313D] opacity-45 bg-neutral-50 dark:bg-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img 
                        src={piece.image_url || (piece as any).img} 
                        alt={piece.title} 
                        className="w-10 h-10 rounded-xl object-cover bg-neutral-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase font-bold text-[#C4623A]">
                          Layer 0{idx + 1} • {piece.category}
                        </span>
                        <h4 className="text-xs font-bold text-[#1F2F4F] dark:text-[#FAF8F5] truncate">
                          {piece.title}
                        </h4>
                        <div className="text-[10px] text-neutral-400 truncate">{piece.brand}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => 
                        setActiveLayers(prev => 
                          prev.includes(piece.id) ? prev.filter(p => p !== piece.id) : [...prev, piece.id]
                        )
                      }
                      className={`p-2 rounded-xl transition-colors ${
                        isSelected 
                          ? 'bg-[#1F2F4F] text-white dark:bg-[#FAF8F5] dark:text-[#1F2F4F]' 
                          : 'border border-neutral-300 text-neutral-400'
                      }`}
                    >
                      {isSelected ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-[11px] text-blue-800 dark:text-blue-300 rounded-2xl flex gap-2">
              <Info size={16} className="shrink-0" />
              <span>
                {studioMode === 'mirror_image' 
                  ? 'Mesh dynamically wraps based on accurate body proportions.' 
                  : 'The doll expresses moods matching Wednesday\'s 18°C Mild forecast!'}
              </span>
            </div>

            {/* Wear Today Confirmation */}
            <div className="space-y-2 pt-1">
              <Button 
                fullWidth 
                variant={hasWornToday ? "outline" : "primary"}
                onClick={() => activeOutfit && markWornToday(activeOutfit.id)}
                className="text-xs font-semibold h-11 flex items-center justify-center"
              >
                <Check size={16} className={hasWornToday ? "text-emerald-500 mr-1.5" : "mr-1.5"} />
                {hasWornToday ? `Wear Confirmed (${streakCount}-Day Streak!)` : "Wear This Outfit Today"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}