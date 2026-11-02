import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', interactive = false, ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-[#1B1F27] border border-[#E8E2D9] dark:border-[#2A313D] rounded-2xl p-4 shadow-sm ${
        interactive ? 'cursor-pointer hover:border-[#C4623A] transition-all' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
