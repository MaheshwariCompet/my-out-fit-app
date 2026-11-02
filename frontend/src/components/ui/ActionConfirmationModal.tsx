import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { AlertTriangle, X } from 'lucide-react';

export interface ActionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmWord?: string;
  destructive?: boolean;
}

export const ActionConfirmationModal: React.FC<ActionConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmWord,
  destructive = true
}) => {
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const canExecute = !confirmWord || inputVal.trim().toUpperCase() === confirmWord.toUpperCase();

  const handleConfirm = () => {
    onConfirm();
    setInputVal('');
    onClose();
  };

  const handleClose = () => {
    setInputVal('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <Card className="w-full max-w-sm space-y-4 p-5 relative border-red-200 dark:border-red-900 shadow-2xl">
        <button 
          type="button"
          onClick={handleClose} 
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center text-red-600">
          <AlertTriangle size={20} />
        </div>

        <div>
          <h2 className="font-serif text-lg font-bold text-[#1F2F4F] dark:text-[#FAF8F5]">
            {title}
          </h2>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
            {description}
          </p>
        </div>

        {confirmWord && (
          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              Type "{confirmWord}" to confirm
            </label>
            <input 
              type="text" 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={confirmWord}
              className="w-full bg-neutral-50 dark:bg-neutral-900 border border-[#E8E2D9] dark:border-[#2A313D] px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-red-500"
            />
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" fullWidth onClick={handleClose} size="sm">
            Cancel
          </Button>
          <Button 
            variant={destructive ? "danger" : "primary"} 
            fullWidth 
            size="sm"
            disabled={!canExecute}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ActionConfirmationModal;