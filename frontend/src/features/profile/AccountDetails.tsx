import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Shield, Trash2, Check } from 'lucide-react';
import { ActionConfirmationModal } from '../../components/ui/ActionConfirmationModal';

export default function AccountDetails() {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl border border-[#E8E2D9] dark:border-[#2A313D]">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-serif text-2xl font-bold">Account Details</h1>
      </div>

      <Card className="space-y-3 text-xs">
        <div className="space-y-1">
          <label className="text-neutral-500 font-semibold uppercase">Full Name</label>
          <div className="font-medium text-sm">Elena Rostova</div>
        </div>
        <div className="space-y-1">
          <label className="text-neutral-500 font-semibold uppercase">Primary Email</label>
          <div className="font-medium text-sm flex items-center gap-1.5">
            <span>elena.rostova@myoutfit.app</span>
            <span className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full font-semibold">Verified</span>
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        <h3 className="font-serif text-sm font-bold text-red-600">Danger Zone</h3>
        <Card className="p-4 border-red-200 dark:border-red-900 bg-red-500/5 space-y-2">
          <div className="text-xs font-semibold text-red-600">Delete Account & Purge Wardrobe</div>
          <p className="text-[11px] text-neutral-500">Irrevocably erase all 42 cataloged garments, 3D body scans, and history.</p>
          <Button variant="danger" size="sm" onClick={() => setShowDelete(true)}>
            Permanently Delete Everything
          </Button>
        </Card>
      </div>

      <ActionConfirmationModal 
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => navigate('/auth/sign-in')}
        title="Delete MyOutFit Account?"
        description="This action is permanent and immediate. Your 42 cataloged garments and 3D silhouette measurements will be permanently deleted from the vault."
        confirmWord="DELETE"
      />
    </div>
  );
}
