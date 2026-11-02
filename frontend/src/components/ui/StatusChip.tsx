import React from 'react';

interface StatusChipProps {
  status: 'ready' | 'in_laundry' | 'dry_clean' | string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const map: Record<string, { label: string; bg: string; dot: string; text: string }> = {
    ready: { label: 'Ready', bg: 'bg-emerald-50 dark:bg-emerald-950/30', dot: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300' },
    in_laundry: { label: 'In Laundry', bg: 'bg-amber-50 dark:bg-amber-950/30', dot: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-300' },
    dry_clean: { label: 'Dry Clean', bg: 'bg-indigo-50 dark:bg-indigo-950/30', dot: 'bg-indigo-500', text: 'text-indigo-700 dark:text-indigo-300' }
  };

  const curr = map[status] || { label: status, bg: 'bg-gray-100', dot: 'bg-gray-400', text: 'text-gray-700' };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${curr.bg} ${curr.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${curr.dot}`}></span>
      {curr.label}
    </span>
  );
};
