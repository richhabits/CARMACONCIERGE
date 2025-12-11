'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', hover = false, padding = 'md' }: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-10',
  };

  return (
    <div className={`bg-white rounded-lg shadow-uk-lg ${paddingClasses[padding]} ${hover ? 'hover:shadow-uk-xl transition-all' : ''} ${className}`}>
      {children}
    </div>
  );
}
