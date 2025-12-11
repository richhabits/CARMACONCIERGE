'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';

export default function SearchByTyreSizePage() {
  const [width, setWidth] = useState('');
  const [profile, setProfile] = useState('');
  const [diameter, setDiameter] = useState('');
  const [tyres, setTyres] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setTyres([
        { id: 1, brand: 'Michelin', model: 'Pilot Sport 4', price: 89.99, rating: 4.8 },
        { id: 2, brand: 'Continental', model: 'PremiumContact 6', price: 79.99, rating: 4.7 },
        { id: 3, brand: 'Goodyear', model: 'EfficientGrip Performance', price: 74.99, rating: 4.6 },
      ]);
      setLoading(false);
    }, 1500);
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

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-uk-dark mb-2">Search by Tyre Size</h1>
        <p className="text-gray-600 mb-8">Find tyres by size (e.g., 205/55 R16)</p>

        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-uk-lg p-8 mb-8">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-bold text-uk-dark mb-2">Width</label>
              <input
                type="text"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="205"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition text-center text-lg font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-uk-dark mb-2">Profile</label>
              <input
                type="text"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                placeholder="55"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition text-center text-lg font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-uk-dark mb-2">Diameter</label>
              <input
                type="text"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                placeholder="16"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition text-center text-lg font-bold"
                required
              />
            </div>
          </div>

          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-uk-blue-500">
              {width && profile && diameter ? `${width}/${profile} R${diameter}` : '---/-- R--'}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-uk-blue-500 hover:bg-uk-blue-600 text-white py-4 rounded-lg font-bold text-lg transition shadow-uk-lg disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search Tyres'}
          </button>
        </form>

        {tyres.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-uk-dark mb-4">Available Tyres</h2>
            {tyres.map((tyre) => (
              <div key={tyre.id} className="bg-white rounded-lg shadow-uk-lg p-6 hover:shadow-uk-xl transition-all border-l-4 border-uk-blue-500">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-uk-dark mb-1">{tyre.brand} {tyre.model}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">Rating: <span className="font-semibold text-uk-dark">★ {tyre.rating}</span></span>
                    </div>
                  </div>
                  <div className="text-right ml-6">
                    <div className="text-3xl font-bold text-uk-orange-500 mb-2">£{tyre.price}</div>
                    <button className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition">
                      Add to Basket
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
