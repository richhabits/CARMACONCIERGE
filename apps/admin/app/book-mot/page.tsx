'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BookMOTPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const vehicleId = searchParams.get('vehicleId');
  const reg = searchParams.get('reg');
  
  const [vehicle, setVehicle] = useState<any>(null);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [testType, setTestType] = useState('STANDARD');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard?mot=booked');
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

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-uk-dark mb-2">Book MOT Test</h1>
        <p className="text-gray-600 mb-8">Book your MOT test at a DVSA-approved test centre</p>

        {vehicle && (
          <div className="bg-white rounded-lg shadow-uk-lg p-6 mb-8 border-l-4 border-uk-orange-500">
            <h3 className="font-bold text-lg mb-3 text-uk-dark">Vehicle</h3>
            <p className="text-xl font-semibold text-uk-orange-500">
              {vehicle.make} {vehicle.model} • {vehicle.registrationNumber || reg}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-uk-lg p-8 space-y-8">
          <div>
            <label className="block text-sm font-bold text-uk-dark mb-4">
              MOT Test Type
            </label>
            <div className="space-y-3">
              {[
                { value: 'STANDARD', label: 'Standard MOT', price: '£54.85', desc: 'Standard vehicle MOT test' },
                { value: 'RETEST', label: 'MOT Retest', price: '£27.40', desc: 'If your vehicle failed within 10 working days' },
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setTestType(type.value)}
                  className={`w-full p-6 rounded-lg border-2 text-left transition-all ${
                    testType === type.value
                      ? 'border-uk-orange-500 bg-uk-orange-50 shadow-uk'
                      : 'border-gray-200 hover:border-uk-orange-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg text-uk-dark">{type.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{type.desc}</div>
                    </div>
                    <div className="font-bold text-uk-orange-500 text-xl">{type.price}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-uk-dark mb-3">
                Preferred Date
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-orange-500 focus:ring-2 focus:ring-uk-orange-200 outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-uk-dark mb-3">
                Preferred Time
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-orange-500 focus:ring-2 focus:ring-uk-orange-200 outline-none transition"
                required
              >
                <option value="">Select time</option>
                {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-uk-blue-50 border-l-4 border-uk-blue-500 rounded-lg p-6">
            <h4 className="font-bold text-uk-blue-700 mb-3">What to bring</h4>
            <ul className="text-sm text-uk-blue-800 space-y-2">
              <li>• Vehicle registration document (V5C)</li>
              <li>• Previous MOT certificate (if available)</li>
              <li>• Valid insurance certificate</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-uk-orange-500 hover:bg-uk-orange-600 text-white py-4 rounded-lg font-bold text-lg transition shadow-uk-lg disabled:opacity-50"
          >
            {loading ? 'Booking...' : 'Book MOT Test Now'}
          </button>
        </form>
      </main>
    </div>
  );
}
