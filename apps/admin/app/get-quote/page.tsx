'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function GetQuotePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const vehicleId = searchParams.get('vehicleId');
  const reg = searchParams.get('reg');
  
  const [vehicle, setVehicle] = useState<any>(null);
  const [serviceType, setServiceType] = useState('SERVICE');
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicleId || reg) {
      const stored = localStorage.getItem('vehicleData');
      if (stored) {
        const data = JSON.parse(stored);
        setVehicle(data.vehicle || { registrationNumber: reg });
      }
    }
  }, [vehicleId, reg]);

  const handleGetQuotes = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setQuotes([
        { id: 1, garage: 'ABC Motors', price: 149.99, rating: 4.8, distance: '2.3 miles', available: 'Tomorrow', verified: true },
        { id: 2, garage: 'City Auto Services', price: 129.99, rating: 4.6, distance: '3.1 miles', available: 'Today', verified: true },
        { id: 3, garage: 'QuickFix Garage', price: 159.99, rating: 4.9, distance: '1.8 miles', available: 'Tomorrow', verified: true },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-uk-light">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-uk">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-uk-blue-500 font-bold text-2xl">
              CARMA<span className="text-uk-orange-500">CONCIERGE</span>
            </Link>
            <Link href="/" className="text-uk-blue-500 hover:text-uk-blue-600 font-medium text-sm">
              ← Back
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold text-uk-dark mb-2">Get Quotes</h1>
        <p className="text-gray-600 mb-8">Compare prices from verified UK garages</p>

        {vehicle && (
          <div className="bg-white rounded-lg shadow-uk-lg p-6 mb-8 border-l-4 border-uk-blue-500">
            <h3 className="font-bold text-lg mb-3 text-uk-dark">Vehicle</h3>
            <p className="text-xl font-semibold text-uk-blue-500">
              {vehicle.make} {vehicle.model} • {vehicle.registrationNumber || reg}
            </p>
          </div>
        )}

        <form onSubmit={handleGetQuotes} className="bg-white rounded-lg shadow-uk-lg p-8 mb-8">
          <div>
            <label className="block text-sm font-bold text-uk-dark mb-4">
              Service Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: 'SERVICE', label: 'Service' },
                { value: 'MOT', label: 'MOT' },
                { value: 'REPAIR', label: 'Repair' },
                { value: 'INSPECTION', label: 'Inspection' },
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setServiceType(type.value)}
                  className={`p-4 rounded-lg border-2 transition-all font-semibold ${
                    serviceType === type.value
                      ? 'border-uk-blue-500 bg-uk-blue-50 text-uk-blue-600 shadow-uk'
                      : 'border-gray-200 hover:border-uk-blue-300'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-uk-blue-500 hover:bg-uk-blue-600 text-white py-4 rounded-lg font-bold text-lg transition shadow-uk-lg disabled:opacity-50"
          >
            {loading ? 'Getting quotes...' : 'Get Quotes Now'}
          </button>
        </form>

        {quotes.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-uk-dark mb-4">Available Quotes</h2>
            {quotes.map((quote) => (
              <div key={quote.id} className="bg-white rounded-lg shadow-uk-lg p-6 hover:shadow-uk-xl transition-all border-l-4 border-uk-blue-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-uk-dark">{quote.garage}</h3>
                      {quote.verified && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">✓ Verified</span>
                      )}
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold text-uk-dark">{quote.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>📍 {quote.distance} away</span>
                      <span>📅 Available {quote.available}</span>
                    </div>
                    <div className="text-3xl font-bold text-uk-orange-500">£{quote.price}</div>
                  </div>
                  <div className="flex flex-col gap-3 ml-6">
                    <button className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                      Book Now
                    </button>
                    <button className="bg-white border-2 border-uk-blue-500 text-uk-blue-500 hover:bg-uk-blue-50 px-6 py-3 rounded-lg font-semibold transition">
                      View Details
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
