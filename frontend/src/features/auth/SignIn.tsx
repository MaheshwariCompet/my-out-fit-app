import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SignIn() {
  const navigate = useNavigate();
  const { loginAsGuest } = useAuth();
  const [email, setEmail] = useState('elena.rostova@myoutfit.app');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const handleGuest = () => {
    loginAsGuest();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center max-w-sm mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-[#C4623A]/10 text-[#C4623A] flex items-center justify-center mx-auto font-serif text-xl font-bold">
          M
        </div>
        <span className="text-[10px] font-semibold tracking-widest text-[#C4623A] uppercase">MyOutFit</span>
        <h1 className="font-serif text-3xl font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">Welcome back</h1>
        <p className="text-xs text-neutral-500">Sign in to your wardrobe sanctuary</p>
      </div>

      <div className="space-y-3">
        {/* Google First, Apple Second */}
        <button 
          type="button"
          onClick={() => navigate('/')} 
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#1B1F27] text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.24v3.15C3.26 21.36 7.34 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.59H1.24C.45 8.16 0 9.99 0 12s.45 3.84 1.24 5.41l4.04-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.59l4.04 3.15c.95-2.84 3.6-4.99 6.72-4.99z"/>
          </svg>
          Continue with Google
        </button>

        <button 
          type="button"
          onClick={() => navigate('/')} 
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] bg-white dark:bg-[#1B1F27] text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-5.99-9.13-10.74-19.46-14.24-30.98-3.5-11.52-5.25-22.36-5.25-32.53 0-14.46 3.64-26.68 10.92-36.67 7.28-9.99 16.51-15.08 27.69-15.27 4.9 0 10.37 1.24 16.42 3.73 6.05 2.49 10.15 3.79 12.3 3.9 1.74-.22 5.93-1.57 12.57-4.05 6.63-2.48 12.01-3.61 16.14-3.4 12.63.65 22.86 5.48 30.68 14.5-11.09 6.74-16.52 16.03-16.3 27.87.22 9.35 3.86 17.18 10.92 23.5 7.07 6.31 15.34 10.02 24.81 11.12-2.18 6.74-4.89 13.56-8.14 20.45zM119.22 33.15c0-7.39 2.66-14.29 7.98-20.71C132.52 6.02 139.15 1.52 147.1 0c.22 1.3.33 2.6.33 3.91 0 7.18-2.77 14.24-8.31 21.19-5.54 6.95-12.18 11.19-19.9 12.72v-4.67z"/>
          </svg>
          Continue with Apple
        </button>
      </div>

      <div className="flex items-center gap-2 my-2 text-[11px] text-neutral-400">
        <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800"></div>
        <span>Or continue with email</span>
        <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">Email address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#C4623A]"
            required
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-[11px]">
            <label className="font-semibold text-neutral-600 dark:text-neutral-400">Password</label>
            <Link to="/auth/forgot-password" className="text-[#C4623A] hover:underline">Forgot password?</Link>
          </div>
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#C4623A]"
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <Button type="submit" fullWidth variant="primary">
          Sign In
        </Button>
      </form>

      <div className="text-center">
        <button type="button" onClick={handleGuest} className="text-xs text-neutral-500 hover:text-black dark:hover:text-white font-medium">
          Browse as Guest
        </button>
      </div>

      <div className="text-center text-xs text-neutral-500">
        New to MyOutFit? <Link to="/auth/sign-up" className="text-[#C4623A] font-semibold underline">Create account</Link>
      </div>

      <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 text-[11px] text-neutral-500 flex items-start gap-2.5">
        <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
        <span>Your photos and measurements are encrypted and used only to power your outfits. You can delete them anytime.</span>
      </div>
    </div>
  );
}