'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';
import { Badge } from '../components/Badge';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load vehicles
    const stored = localStorage.getItem('vehicleData');
    if (stored) {
      const data = JSON.parse(stored);
      if (data.vehicle) {
        setVehicles([data.vehicle]);
      }
    }
  }, []);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.registrationNumber?.toLowerCase().includes(search.toLowerCase()) ||
                         vehicle.make?.toLowerCase().includes(search.toLowerCase()) ||
                         vehicle.model?.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-uk-light">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-uk">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Link href="/dashboard" className="text-uk-blue-500 hover:text-uk-blue-600 font-medium text-sm">
              ← Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-uk-dark mb-2">Vehicles</h1>
            <p className="text-gray-600">Manage all registered vehicles</p>
          </div>
          <Link href="/">
            <button className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-uk">
              + Add Vehicle
            </button>
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-uk-lg p-6 mb-6">
          <label className="block text-sm font-bold text-uk-dark mb-2">Search Vehicles</label>
          <input
            type="text"
            placeholder="Search by registration, make, or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
          />
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-uk-lg p-6 hover:shadow-uk-xl transition-all border-t-4 border-uk-blue-500">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <Badge variant="info">{vehicle.fuelType}</Badge>
                </div>
                <p className="text-2xl font-bold text-uk-blue-500 tracking-wider mb-4">
                  {vehicle.registrationNumber}
                </p>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Year:</span>
                  <span className="font-medium text-gray-900">{vehicle.year}</span>
                </div>
                {vehicle.color && (
                  <div className="flex justify-between">
                    <span>Colour:</span>
                    <span className="font-medium text-gray-900">{vehicle.color}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Link href={`/book-service?vehicleId=${vehicle.id}`} className="flex-1">
                  <button className="w-full bg-white border-2 border-uk-blue-500 text-uk-blue-500 hover:bg-uk-blue-50 px-4 py-2 rounded-lg font-semibold text-sm transition">
                    Service
                  </button>
                </Link>
                <Link href={`/book-mot?vehicleId=${vehicle.id}`} className="flex-1">
                  <button className="w-full bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition">
                    MOT
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="bg-white rounded-lg shadow-uk-lg p-12 text-center">
            <p className="text-gray-600 mb-4">No vehicles found</p>
            <Link href="/">
              <button className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-uk">
                Add Your First Vehicle
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
