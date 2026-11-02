import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Check, Sparkles, Sun, Bell, ArrowRight, RefreshCw, 
  Layers, Calendar, ChevronRight, Bookmark, Flame, ShieldCheck 
} from 'lucide-react';

export default function HomeScreen() {
  const navigate = useNavigate();
  const [worn, setWorn] = useState(false);
  const [streak, setStreak] = useState(12);
  const [shuffleIndex, setShuffleIndex] = useState(0);

  const heroLooks = [
    {
      title: "Relaxed Tailored Capsule",
      desc: "Cashmere crewneck in oat + charcoal pleated trousers + camel coat",
      badge: "Ideal for 18°C Mild breeze",
      synergy: "96% Synergy",
      img: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85",
      pieces: [
        { name: "Tailored Camel Coat", category: "Outerwear", brand: "Totême" },
        { name: "Cashmere Crewneck", category: "Knitwear", brand: "Arket" },
        { name: "Pleated Wool Trousers", category: "Bottoms", brand: "Studio Nicholson" },
        { name: "Suede Penny Loafers", category: "Footwear", brand: "Totême" }
      ]
    },
    {
      title: "Architectural Executive",
      desc: "Navy double-breasted blazer + crisp poplin shirt + raw denim",
      badge: "Curated for Client Presentation",
      synergy: "98% Synergy",
      img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=85",
      pieces: [
        { name: "Navy Wool Blazer", category: "Outerwear", brand: "Totême" },
        { name: "Crisp Poplin Shirt", category: "Tops", brand: "COS" },
        { name: "Japanese Selvedge Denim", category: "Bottoms", brand: "Kuroki Mill" },
        { name: "Minimalist Sneakers", category: "Footwear", brand: "Common Projects" }
      ]
    }
  ];

  const currentLook = heroLooks[shuffleIndex % heroLooks.length];

  const handleWearToday = () => {
    if (!worn) {
      setWorn(true);
      setStreak(s => s + 1);
    }
  };

  const handleShuffle = () => {
    setShuffleIndex(prev => prev + 1);
    setWorn(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full px-2 sm:px-4">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <div>
          <div className="text-xs text-neutral-500 font-medium tracking-wider uppercase flex items-center gap-2">
            <span>Wednesday, Oct 25</span>
            <span className="text-neutral-300">•</span>
            <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-semibold">
              <Sun size={14} /> 18°C Mild & Crisp
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">
            Good morning, Elena
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Here is your hand-curated composition tuned to today's schedule and atmospheric cadence.
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#1B1F27] hover:border-[#C4623A] transition-colors"
          >
            <RefreshCw size={14} className="text-[#C4623A]" /> Shuffle Look
          </button>

          <button 
            onClick={() => navigate('/notifications')}
            className="p-2.5 rounded-full border border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#1B1F27] relative hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="w-2.5 h-2.5 rounded-full bg-[#C4623A] absolute top-1.5 right-1.5 ring-2 ring-white dark:ring-[#121418]"></span>
          </button>
        </div>
      </div>

      {/* Main Responsive Grid Layout (Desktop 12-Column Split) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Today's Hero Look (7 Columns on Desktop) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="overflow-hidden p-0 border border-[#E8E2D9] dark:border-[#2A313D] shadow-md bg-neutral-900 text-white relative rounded-3xl">
            <div className="relative h-[380px] sm:h-[420px] w-full overflow-hidden group">
              <img 
                src={currentLook.img} 
                alt={currentLook.title} 
                className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm">
                  {currentLook.badge}
                </span>
                <span className="bg-[#1F2F4F]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-300">
                  {currentLook.synergy}
                </span>
              </div>

              {/* Title & Description Overlay */}
              <div className="absolute bottom-4 left-5 right-5">
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#E37E55]">
                  Curated Ensemble
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
                  {currentLook.title}
                </h2>
                <p className="text-xs text-neutral-200 mt-1 max-w-lg">
                  {currentLook.desc}
                </p>
              </div>
            </div>

            {/* Interactive Piece Breakdown Ribbon */}
            <div className="p-4 bg-[#FAF8F5] dark:bg-[#1B1F27] border-t border-[#E8E2D9] dark:border-[#2A313D] text-[#1F2F4F] dark:text-[#FAF8F5]">
              <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Garments Staged in Look
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {currentLook.pieces.map((piece, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-white dark:bg-[#121418] border border-[#E8E2D9] dark:border-[#2A313D] text-left">
                    <div className="text-[10px] text-neutral-400 font-medium uppercase">{piece.category}</div>
                    <div className="text-xs font-bold truncate mt-0.5">{piece.name}</div>
                    <div className="text-[10px] text-[#C4623A]">{piece.brand}</div>
                  </div>
                ))}
              </div>

              {/* Primary Call to Action Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 mt-2 border-t border-[#E8E2D9]/60 dark:border-[#2A313D]/60">
                <Button 
                  fullWidth 
                  onClick={handleWearToday}
                  variant={worn ? 'outline' : 'primary'}
                  size="lg"
                  className="flex items-center justify-center gap-2 text-sm font-semibold"
                >
                  <Check size={18} className={worn ? 'text-emerald-500' : ''} />
                  {worn ? `Wearing Today (${streak}-Day Deliberate Streak!)` : "I'm wearing this today"}
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/outfit/outfit-1')}
                  className="w-full sm:w-auto shrink-0 px-6"
                >
                  Layer Breakdown
                </Button>
                <Button 
                  variant="ghost"
                  size="lg"
                  onClick={() => navigate('/try-on')}
                  className="w-full sm:w-auto shrink-0 px-4 text-[#C4623A]"
                >
                  Try on Avatar
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Saved Outfits Strip (Below Hero on Desktop) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold">Saved Capsule Rotations</h3>
                <p className="text-xs text-neutral-500">Curated looks tuned for your recurring weekly calendar</p>
              </div>
              <button 
                onClick={() => navigate('/outfits/saved')}
                className="text-xs font-semibold text-[#C4623A] hover:underline flex items-center gap-1"
              >
                See all (16) <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card interactive onClick={() => navigate('/outfit/outfit-2')} className="p-3 flex gap-3 items-center group">
                <img 
                  src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=300&q=80" 
                  alt="Casual Friday" 
                  className="w-20 h-20 rounded-xl object-cover group-hover:scale-105 transition-transform" 
                />
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-[#C4623A] bg-[#C4623A]/10 px-2 py-0.5 rounded-full">
                    Casual Friday
                  </span>
                  <h4 className="font-bold text-xs truncate">Poplin & Ecru Denim</h4>
                  <p className="text-[11px] text-neutral-500">Crisp oversized silhouette • 94% Synergy</p>
                </div>
              </Card>

              <Card interactive onClick={() => navigate('/outfit/outfit-1')} className="p-3 flex gap-3 items-center group">
                <img 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80" 
                  alt="Dinner Date" 
                  className="w-20 h-20 rounded-xl object-cover group-hover:scale-105 transition-transform" 
                />
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                    Dinner Date
                  </span>
                  <h4 className="font-bold text-xs truncate">Navy Slip & Camel Wool</h4>
                  <p className="text-[11px] text-neutral-500">Draped silk and structured wool • 96% Synergy</p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Column: Schedule Context, Insights & Utilities (5 Columns on Desktop) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Today's Synced Agenda Context */}
          <Card 
            interactive 
            onClick={() => navigate('/planner')}
            className="p-4 space-y-2.5 border-l-4 border-l-[#C4623A] hover:border-[#C4623A] transition-all"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-[#C4623A] uppercase tracking-wider">
                Today's Schedule Agenda
              </span>
              <span className="text-[10px] text-neutral-400 font-medium">Google Sync</span>
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
                Client Presentation at 2:00 PM
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Layering recommended for air-conditioned conference studio.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#1F2F4F] dark:text-[#FAF8F5] pt-1 border-t border-[#E8E2D9] dark:border-[#2A313D]">
              <span>View event look breakdown</span>
              <ArrowRight size={14} className="text-[#C4623A]" />
            </div>
          </Card>

          {/* Weekly Wardrobe Rhythm Card */}
          <Card className="p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[#1F2F4F] dark:text-[#FAF8F5] block">Weekly Wardrobe Rhythm</span>
                <span className="text-neutral-500 text-[11px]">80% of weekly capsule documented</span>
              </div>
              <div className="flex items-center gap-1 text-[#C4623A] font-bold">
                <Flame size={16} /> {streak} Days
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 text-center text-xs font-medium">
              {[
                { day: 'Mon', date: '23', status: 'Done' },
                { day: 'Tue', date: '24', status: 'Done' },
                { day: 'Wed', date: '25', status: 'Today' },
                { day: 'Thu', date: '26', status: 'Open' },
                { day: 'Fri', date: '27', status: 'Open' }
              ].map((item, idx) => (
                <div 
                  key={item.day} 
                  className={`p-2.5 rounded-2xl border transition-all ${
                    item.status === 'Today' 
                      ? 'bg-[#1F2F4F] text-white font-bold border-[#1F2F4F] shadow-sm dark:bg-[#FAF8F5] dark:text-[#1F2F4F]' 
                      : item.status === 'Done'
                      ? 'bg-[#C4623A]/10 text-[#C4623A] border-[#C4623A]/20'
                      : 'bg-white dark:bg-[#121418] border-[#E8E2D9] dark:border-[#2A313D] text-neutral-400'
                  }`}
                >
                  <div className="text-[10px] opacity-75">{item.day}</div>
                  <div className="text-sm font-bold my-0.5">{item.date}</div>
                  <div className="text-[9px] uppercase tracking-wide">{item.status}</div>
                </div>
              ))}
            </div>

            <div 
              onClick={() => navigate('/insights')}
              className="flex items-center justify-between text-xs font-semibold text-[#C4623A] hover:underline cursor-pointer pt-2 border-t border-[#E8E2D9] dark:border-[#2A313D]"
            >
              <span>Explore Wardrobe Insights & Efficiency</span>
              <ChevronRight size={14} />
            </div>
          </Card>

          {/* Quick Access Utility Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Card 
              interactive 
              onClick={() => navigate('/closet/snap')} 
              className="p-3 text-center space-y-1 hover:border-[#C4623A]"
            >
              <div className="w-8 h-8 rounded-full bg-[#C4623A]/10 text-[#C4623A] flex items-center justify-center mx-auto">
                <Layers size={16} />
              </div>
              <div className="font-bold text-xs">Snap Garment</div>
              <div className="text-[10px] text-neutral-500">Auto background matting</div>
            </Card>

            <Card 
              interactive 
              onClick={() => navigate('/wishlist/check')} 
              className="p-3 text-center space-y-1 hover:border-[#C4623A]"
            >
              <div className="w-8 h-8 rounded-full bg-[#1F2F4F]/10 text-[#1F2F4F] dark:text-neutral-300 flex items-center justify-center mx-auto">
                <Bookmark size={16} />
              </div>
              <div className="font-bold text-xs">Pre-Purchase Check</div>
              <div className="text-[10px] text-neutral-500">24h Cooldown Audit</div>
            </Card>
          </div>

          {/* Pro Stylist Banner */}
          <div 
            onClick={() => navigate('/checkout')}
            className="p-4 rounded-3xl bg-gradient-to-br from-[#1F2F4F] to-[#141F36] text-white space-y-3 cursor-pointer shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-neutral-900 uppercase tracking-wider">
                Pro Stylist Pass
              </span>
              <Sparkles size={16} className="text-amber-300" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold">1-Month Free Trial Active</h4>
              <p className="text-xs text-neutral-300 mt-0.5">
                Unlimited AI outfit combinations tailored to your weather, agenda, and 3D silhouette.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-amber-300 pt-1 border-t border-white/10">
              <span>Manage Stylist Membership</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Privacy Guarantee Footer Note */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] text-[11px] text-neutral-500 flex items-start gap-2.5">
            <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <span>Your photos and measurements are encrypted and used only to power your outfits. You can delete them anytime.</span>
          </div>
        </div>

      </div>
    </div>
  );
}