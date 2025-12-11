'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VehicleDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const registration = searchParams.get('reg');
  const service = searchParams.get('service') || 'service';
  
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userCreated, setUserCreated] = useState(false);

  useEffect(() => {
    if (!registration) {
      router.push('/');
      return;
    }

    const stored = localStorage.getItem('vehicleData');
    if (stored) {
      const data = JSON.parse(stored);
      setVehicleData(data);
      setUserCreated(data.autoCreated || false);
      setLoading(false);
    } else {
      fetchVehicleData();
    }
  }, [registration]);

  const fetchVehicleData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
      const response = await fetch(`${apiUrl}/vehicles/uk/lookup?registration=${registration}`);
      const data = await response.json();
      setVehicleData(data);
      setUserCreated(data.autoCreated || false);
    } catch (error) {
      console.error('Failed to fetch vehicle data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-uk-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-uk-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (!vehicleData) {
    return (
      <div className="min-h-screen bg-uk-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-900 text-lg font-medium mb-4">Vehicle not found</p>
          <Link href="/" className="text-uk-blue-500 hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const vehicle = vehicleData.vehicle || {};

  return (
    <div className="min-h-screen bg-uk-light">
      {/* Header - UK Automotive Style */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-uk">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-uk-blue-500 font-bold text-2xl">
              CARMA<span className="text-uk-orange-500">CONCIERGE</span>
            </Link>
            <Link href="/" className="text-uk-blue-500 hover:text-uk-blue-600 font-medium text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Success Message */}
        {userCreated && (
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-green-900 font-semibold text-base">Welcome! Your account has been created.</p>
                <p className="text-green-700 text-sm mt-1">We've saved your vehicle details for easy access.</p>
              </div>
            </div>
          </div>
        )}

        {/* Vehicle Details Card - UK Style */}
        <div className="bg-white rounded-lg shadow-uk-lg p-8 mb-8 border-t-4 border-uk-blue-500">
          <h1 className="text-4xl font-bold text-uk-dark mb-8">Vehicle Details</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                Registration
              </label>
              <p className="text-4xl font-bold text-uk-blue-500 tracking-wider">
                {vehicle.registrationNumber || registration}
              </p>
            </div>

            {vehicle.make && (
              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                  Make
                </label>
                <p className="text-3xl font-bold text-uk-dark">{vehicle.make}</p>
              </div>
            )}

            {vehicle.model && (
              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                  Model
                </label>
                <p className="text-3xl font-bold text-uk-dark">{vehicle.model}</p>
              </div>
            )}

            {vehicle.year && (
              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                  Year
                </label>
                <p className="text-2xl font-semibold text-uk-dark">{vehicle.year}</p>
              </div>
            )}

            {vehicle.fuelType && (
              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                  Fuel Type
                </label>
                <p className="text-xl font-semibold text-uk-dark">{vehicle.fuelType}</p>
              </div>
            )}

            {vehicle.color && (
              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                  Colour
                </label>
                <p className="text-xl font-semibold text-uk-dark">{vehicle.color}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - UK Automotive Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link 
            href={`/book-service?vehicleId=${vehicle.id || ''}&reg=${registration}`}
            className="bg-white rounded-lg shadow-uk-lg p-8 text-center hover:shadow-uk-xl transition-all group border-t-4 border-uk-blue-500"
          >
            <div className="w-16 h-16 bg-uk-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl">🛠️</span>
            </div>
            <h3 className="font-bold text-xl mb-2 text-uk-dark">Book Service</h3>
            <p className="text-gray-600 text-sm mb-4">Schedule a service appointment</p>
            <div className="bg-uk-blue-500 text-white py-2 px-4 rounded-lg font-semibold inline-block">
              Book Now →
            </div>
          </Link>
          
          <Link 
            href={`/book-mot?vehicleId=${vehicle.id || ''}&reg=${registration}`}
            className="bg-white rounded-lg shadow-uk-lg p-8 text-center hover:shadow-uk-xl transition-all group border-t-4 border-uk-orange-500"
          >
            <div className="w-16 h-16 bg-uk-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="font-bold text-xl mb-2 text-uk-dark">Book MOT</h3>
            <p className="text-gray-600 text-sm mb-4">Book your MOT test</p>
            <div className="bg-uk-orange-500 text-white py-2 px-4 rounded-lg font-semibold inline-block">
              Book Now →
            </div>
          </Link>
          
          <Link 
            href={`/get-quote?vehicleId=${vehicle.id || ''}&reg=${registration}`}
            className="bg-white rounded-lg shadow-uk-lg p-8 text-center hover:shadow-uk-xl transition-all group border-t-4 border-uk-blue-700"
          >
            <div className="w-16 h-16 bg-uk-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="font-bold text-xl mb-2 text-uk-dark">Get Quote</h3>
            <p className="text-gray-600 text-sm mb-4">Compare prices from garages</p>
            <div className="bg-uk-blue-700 text-white py-2 px-4 rounded-lg font-semibold inline-block">
              Get Quote →
            </div>
          </Link>
        </div>

        {/* Next Steps - UK Style */}
        <div className="bg-white rounded-lg shadow-uk-lg p-8 border-t-4 border-uk-orange-500">
          <h2 className="text-2xl font-bold mb-6 text-uk-dark">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-uk-dark font-semibold mb-1">Your vehicle is now in your account</p>
                <p className="text-gray-600 text-sm">Access it anytime from your dashboard</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-uk-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">📅</span>
              </div>
              <div>
                <p className="text-uk-dark font-semibold mb-1">We'll send you MOT and service reminders</p>
                <p className="text-gray-600 text-sm">Never miss an important date</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-uk-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">🔔</span>
              </div>
              <div>
                <p className="text-uk-dark font-semibold mb-1">Get instant quotes from verified garages</p>
                <p className="text-gray-600 text-sm">Compare prices and book instantly</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-uk-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">🤖</span>
              </div>
              <div>
                <p className="text-uk-dark font-semibold mb-1">Access AI Mechanic for diagnostics</p>
                <p className="text-gray-600 text-sm">Get expert advice on car issues</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
