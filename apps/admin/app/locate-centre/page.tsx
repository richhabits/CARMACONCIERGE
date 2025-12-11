'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';

export default function LocateCentrePage() {
  const [postcode, setPostcode] = useState('');
  const [centres, setCentres] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCentres([
      { id: 1, name: 'ABC Motors', address: '123 High Street, London', distance: '2.3 miles', rating: 4.8 },
      { id: 2, name: 'City Auto Services', address: '456 Main Road, London', distance: '3.1 miles', rating: 4.6 },
      { id: 3, name: 'QuickFix Garage', address: '789 Station Road, London', distance: '1.8 miles', rating: 4.9 },
    ]);
  };

  return (
    <div className="min-h-screen bg-uk-light">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-uk">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Link href="/" className="text-uk-blue-500 hover:text-uk-blue-600 font-medium text-sm">
              ← Back
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold text-uk-dark mb-2">Locate A Centre</h1>
        <p className="text-gray-600 mb-8">Find your nearest service centre</p>

        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-uk-lg p-8 mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              placeholder="Enter postcode (e.g. SW1A 1AA)"
              className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition uppercase"
              required
            />
            <button
              type="submit"
              className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-uk-lg"
            >
              Search 📍
            </button>
          </div>
        </form>

        {centres.length > 0 && (
          <div className="space-y-4">
            {centres.map((centre) => (
              <div key={centre.id} className="bg-white rounded-lg shadow-uk-lg p-6 hover:shadow-uk-xl transition-all border-l-4 border-uk-blue-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-uk-dark mb-2">{centre.name}</h3>
                    <p className="text-gray-600 mb-2">📍 {centre.address}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">Distance: <span className="font-semibold text-uk-dark">{centre.distance}</span></span>
                      <span className="text-gray-600">Rating: <span className="font-semibold text-uk-dark">★ {centre.rating}</span></span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 ml-6">
                    <button className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                      View Details
                    </button>
                    <button className="bg-white border-2 border-uk-blue-500 text-uk-blue-500 hover:bg-uk-blue-50 px-6 py-3 rounded-lg font-semibold transition">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
