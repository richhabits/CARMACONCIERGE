'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-uk-blue-500 text-white hover:bg-uk-blue-600 active:scale-[0.98] shadow-uk hover:shadow-uk-lg',
    secondary: 'bg-white text-uk-dark border-2 border-uk-blue-500 hover:bg-uk-blue-50 active:scale-[0.98] shadow-uk hover:shadow-uk-lg',
    outline: 'bg-transparent text-uk-dark border-2 border-gray-300 hover:border-uk-blue-500 active:scale-[0.98]',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
