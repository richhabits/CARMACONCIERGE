'use client';

import Link from 'next/link';
import { Logo } from './Logo';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export function Header({ title, showBack = false }: HeaderProps) {
  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Logo />
            </Link>
            {title && (
              <h1 className="text-xl font-semibold text-gray-900 hidden md:block">{title}</h1>
            )}
          </div>
          <div className="flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/profile" 
              className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              Profile
            </Link>
            {showBack && (
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                ← Back
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
