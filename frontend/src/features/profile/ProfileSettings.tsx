import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  User, Shield, Sliders, Globe, Bell, FileText, 
  Calendar, LogOut, ChevronRight, Sparkles, CheckCircle2 
} from 'lucide-react';

export default function ProfileSettings() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full px-2 sm:px-4">
      {/* Header */}
      <div className="pb-4 border-b border-[#E8E2D9] dark:border-[#2A313D]">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#C4623A]/10 text-[#C4623A] uppercase tracking-wider">
          Settings & Sovereignty
        </span>
        <h1 className="font-serif text-3xl font-bold mt-1 text-[#1F2F4F] dark:text-[#FAF8F5]">
          Profile & Preferences
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Member Stats & Pro Membership (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-6 text-center space-y-4 rounded-3xl border border-[#E8E2D9] dark:border-[#2A313D]">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-[#C4623A] p-1">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" 
                alt="Elena Rostova" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5">
                <h2 className="font-serif text-xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">Elena Rostova</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-[#C4623A]">PRO</span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">elena.rostova@myoutfit.app</p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E8E2D9] dark:border-[#2A313D] text-xs">
              <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                <div className="font-bold text-base text-[#1F2F4F] dark:text-[#FAF8F5]">42</div>
                <div className="text-[10px] text-neutral-400">Garments</div>
              </div>
              <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                <div className="font-bold text-base text-[#1F2F4F] dark:text-[#FAF8F5]">128</div>
                <div className="text-[10px] text-neutral-400">Outfits</div>
              </div>
              <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                <div className="font-bold text-base text-[#C4623A]">18</div>
                <div className="text-[10px] text-neutral-400">Days Active</div>
              </div>
            </div>

            <Button variant="danger" fullWidth onClick={() => navigate('/auth/sign-in')} className="flex items-center justify-center gap-2 text-xs">
              <LogOut size={15} /> Log Out
            </Button>
          </Card>

          <div className="p-4 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-3">
            <Shield size={20} className="shrink-0 text-emerald-600 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="font-semibold block">Privacy Guarantee</strong>
              "Your photos and measurements are encrypted and used only to power your outfits. You can delete them anytime."
            </div>
          </div>
        </div>

        {/* Right: Categorized Settings Navigation Matrix (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Account Details", desc: "Manage name, verified email & credentials", icon: <User size={20} />, route: "/profile/account" },
              { label: "Measurements & Fit", desc: "Anatomical calibration & ease allowances", icon: <Sliders size={20} />, route: "/profile/measurements" },
              { label: "Connected Calendars", desc: "Google & Outlook agenda dress matching", icon: <Calendar size={20} />, route: "/settings/calendars" },
              { label: "App Preferences & Theme", desc: "Light, dark, and sensory feedback tuning", icon: <Sliders size={20} />, route: "/profile/preferences" },
              { label: "Localization & Units", desc: "Units (°C/°F, cm/in), currency & sizing systems", icon: <Globe size={20} />, route: "/profile/localization" },
              { label: "Notification Settings", desc: "Morning dispatch hour & resting fiber reminders", icon: <Bell size={20} />, route: "/profile/notifications" },
              { label: "Privacy & Data Vault", desc: "Mindful cooldown lock, export archives & wipe", icon: <Shield size={20} />, route: "/profile/privacy" },
              { label: "Encryption Whitepaper", desc: "Review zero-knowledge biometric specifications", icon: <FileText size={20} />, route: "/profile/whitepaper" },
            ].map((item) => (
              <Card 
                key={item.label}
                interactive
                onClick={() => navigate(item.route)}
                className="p-4 flex items-center justify-between hover:border-[#C4623A] transition-all rounded-2xl group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#1F2F4F]/10 dark:bg-neutral-800 text-[#1F2F4F] dark:text-[#FAF8F5] flex items-center justify-center group-hover:bg-[#C4623A]/10 group-hover:text-[#C4623A] transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">{item.label}</h3>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-neutral-400 group-hover:text-[#C4623A] transition-colors" />
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}