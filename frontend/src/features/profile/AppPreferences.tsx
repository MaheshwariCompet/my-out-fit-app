import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function AppPreferences() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-serif text-2xl font-bold">App Preferences</h1>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase text-neutral-500">Appearance & Theme</label>
        <div className="grid grid-cols-3 gap-2 text-xs font-medium">
          {[
            { id: 'light', label: 'Light', icon: <Sun size={16} /> },
            { id: 'dark', label: 'Dark', icon: <Moon size={16} /> },
            { id: 'system', label: 'System', icon: <Monitor size={16} /> }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id as any)}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                theme === t.id ? 'bg-[#1F2F4F] text-white font-bold' : 'bg-white dark:bg-[#1B1F27] border-[#E8E2D9] dark:border-[#2A313D]'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Button fullWidth variant="primary" onClick={() => navigate(-1)}>
        Save Preferences
      </Button>
    </div>
  );
}
