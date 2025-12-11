'use client';

import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-3">
      <div className="text-uk-blue-500 font-bold text-2xl">
        CARMA<span className="text-uk-orange-500">CONCIERGE</span>
      </div>
    </Link>
  );
}
