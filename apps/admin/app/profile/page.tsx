'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'vehicles' | 'reminders'>('profile');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setUser({
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '07123456789',
      });
      
      const stored = localStorage.getItem('vehicleData');
      if (stored) {
        const data = JSON.parse(stored);
        if (data.vehicle) {
          setVehicles([data.vehicle]);
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-uk-light">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-uk">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Link href="/" className="text-uk-blue-500 hover:text-uk-blue-600 font-medium text-sm">
              ← Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold text-uk-dark mb-8">My Profile</h1>

        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {[
            { id: 'profile', label: 'Profile' },
            { id: 'vehicles', label: 'My Vehicles' },
            { id: 'reminders', label: 'Reminders' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-uk-blue-500 text-uk-blue-500'
                  : 'border-transparent text-gray-600 hover:text-uk-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-uk-lg p-10 space-y-6">
            <h2 className="text-2xl font-bold text-uk-dark">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-uk-dark mb-2">First Name</label>
                <input
                  type="text"
                  defaultValue={user?.firstName}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-uk-dark mb-2">Last Name</label>
                <input
                  type="text"
                  defaultValue={user?.lastName}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-uk-dark mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-uk-dark mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue={user?.phone}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
                />
              </div>
            </div>
            <button className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition shadow-uk">
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'vehicles' && (
          <div className="space-y-4">
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-lg shadow-uk-lg p-6 border-l-4 border-uk-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-uk-dark mb-1">
                        {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-gray-600">
                        {vehicle.registrationNumber} • {vehicle.year} • {vehicle.fuelType}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Link href={`/book-service?vehicleId=${vehicle.id}`}>
                        <button className="bg-white border-2 border-uk-blue-500 text-uk-blue-500 hover:bg-uk-blue-50 px-4 py-2 rounded-lg font-semibold text-sm transition">
                          Service
                        </button>
                      </Link>
                      <Link href={`/book-mot?vehicleId=${vehicle.id}`}>
                        <button className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition">
                          MOT
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-uk-lg p-12 text-center">
                <p className="text-gray-600 mb-4">No vehicles added yet</p>
                <Link href="/">
                  <button className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-uk">
                    Add Vehicle
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reminders' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-uk-lg p-6 border-l-4 border-uk-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-uk-dark mb-1">MOT Due</h3>
                  <p className="text-sm text-gray-600">Due in 30 days</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                  Pending
                </span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-uk-lg p-6 border-l-4 border-uk-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-uk-dark mb-1">Service Due</h3>
                  <p className="text-sm text-gray-600">Due in 45 days</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  Scheduled
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
