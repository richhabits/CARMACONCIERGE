'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BookServicePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const vehicleId = searchParams.get('vehicleId');
  const reg = searchParams.get('reg');
  
  const [vehicle, setVehicle] = useState<any>(null);
  const [serviceType, setServiceType] = useState('FULL_SERVICE');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [notes, setNotes] = useState('');
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
      router.push('/dashboard?booking=success');
    }, 1500);
  };

  const serviceTypes = [
    { value: 'FULL_SERVICE', label: 'Full Service', desc: 'Complete service check', price: 'From £149' },
    { value: 'INTERIM_SERVICE', label: 'Interim Service', desc: 'Basic service check', price: 'From £99' },
    { value: 'MAJOR_SERVICE', label: 'Major Service', desc: 'Comprehensive service', price: 'From £199' },
    { value: 'OIL_CHANGE', label: 'Oil Change', desc: 'Engine oil replacement', price: 'From £49' },
  ];

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
        <h1 className="text-4xl font-bold text-uk-dark mb-2">Book a Service</h1>
        <p className="text-gray-600 mb-8">Schedule your vehicle service with a verified garage</p>

        {vehicle && (
          <div className="bg-white rounded-lg shadow-uk-lg p-6 mb-8 border-l-4 border-uk-blue-500">
            <h3 className="font-bold text-lg mb-3 text-uk-dark">Vehicle</h3>
            <p className="text-xl font-semibold text-uk-blue-500">
              {vehicle.make} {vehicle.model} • {vehicle.registrationNumber || reg}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-uk-lg p-8 space-y-8">
          <div>
            <label className="block text-sm font-bold text-uk-dark mb-4">
              Service Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setServiceType(type.value)}
                  className={`p-6 rounded-lg border-2 text-left transition-all ${
                    serviceType === type.value
                      ? 'border-uk-blue-500 bg-uk-blue-50 shadow-uk'
                      : 'border-gray-200 hover:border-uk-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-lg text-uk-dark">{type.label}</div>
                    <div className="text-uk-orange-500 font-bold">{type.price}</div>
                  </div>
                  <div className="text-sm text-gray-600">{type.desc}</div>
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
                required
              >
                <option value="">Select time</option>
                {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-uk-dark mb-3">
              Additional Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
              placeholder="Any specific issues or requirements..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-uk-blue-500 hover:bg-uk-blue-600 text-white py-4 rounded-lg font-bold text-lg transition shadow-uk-lg disabled:opacity-50"
          >
            {loading ? 'Booking...' : 'Book Service Now'}
          </button>
        </form>
      </main>
    </div>
  );
}
