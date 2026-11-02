import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('elena.rostova@myoutfit.app');
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center max-w-sm mx-auto p-4 space-y-6">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D] hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Security</span>
      </div>

      <div>
        <h1 className="font-serif text-2xl font-bold">Reset Password</h1>
        <p className="text-xs text-neutral-500 mt-1">
          We'll send secure password recovery instructions to your email address.
        </p>
      </div>

      {sent ? (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 text-xs flex items-start gap-2.5">
            <CheckCircle size={18} className="shrink-0 text-emerald-600 mt-0.5" />
            <span>Recovery link sent to <strong>{email}</strong>. Check your inbox and follow the steps.</span>
          </div>
          <Button fullWidth variant="primary" onClick={() => navigate('/auth/sign-in')}>
            Return to Sign In
          </Button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">Account Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#C4623A]"
              required
            />
          </div>
          <Button fullWidth variant="primary" type="submit">
            Send Recovery Link
          </Button>
          <div className="text-center text-xs text-neutral-500 pt-2">
            Remember password? <Link to="/auth/sign-in" className="text-[#C4623A] underline">Sign in</Link>
          </div>
        </form>
      )}
    </div>
  );
}