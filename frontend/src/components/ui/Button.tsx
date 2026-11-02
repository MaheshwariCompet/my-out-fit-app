import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  size = 'md',
  className = '',
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-xl";
  
  const variants = {
    primary: "bg-[#C4623A] hover:bg-[#A84E29] text-white shadow-sm",
    secondary: "bg-[#1F2F4F] hover:bg-[#141F36] text-white dark:bg-[#FAF8F5] dark:text-[#1F2F4F]",
    outline: "border border-[#E8E2D9] dark:border-[#2A313D] bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-[#1F2F4F] dark:text-[#FAF8F5]",
    danger: "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 dark:bg-red-950/20 dark:border-red-800 dark:text-red-400",
    ghost: "bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-[#1F2F4F] dark:text-[#FAF8F5]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs min-h-[36px]",
    md: "px-4 py-2.5 text-sm min-h-[44px]",
    lg: "px-6 py-3.5 text-base min-h-[50px]"
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
