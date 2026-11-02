import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Card } from './Card';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />
      <Card className="w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl z-10 border border-[#E8E2D9] dark:border-[#2A313D]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        {title && <h2 className="font-serif text-lg font-bold mb-4 text-[#1F2F4F] dark:text-[#FAF8F5]">{title}</h2>}
        {children}
      </Card>
    </div>
  );
};

export default Modal;