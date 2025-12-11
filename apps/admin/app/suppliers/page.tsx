'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';
import { Badge } from '../components/Badge';

export default function SuppliersPage() {
  const [search, setSearch] = useState('');
  
  const suppliers = [
    { id: 1, name: 'ABC Motors', rating: 4.8, location: 'London', verified: true, services: ['MOT', 'Service', 'Repair'] },
    { id: 2, name: 'City Auto Services', rating: 4.6, location: 'Manchester', verified: true, services: ['MOT', 'Service'] },
    { id: 3, name: 'QuickFix Garage', rating: 4.9, location: 'Birmingham', verified: true, services: ['Repair', 'Service'] },
  ];

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(search.toLowerCase()) ||
    supplier.location.toLowerCase().includes(search.toLowerCase())
  );

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
            <h1 className="text-4xl font-bold text-uk-dark mb-2">Suppliers & Garages</h1>
            <p className="text-gray-600">Verified garages and service providers</p>
          </div>
          <button className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-uk">
            + Add Supplier
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-uk-lg p-6 mb-6">
          <label className="block text-sm font-bold text-uk-dark mb-2">Search Suppliers</label>
          <input
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white rounded-lg shadow-uk-lg p-6 hover:shadow-uk-xl transition-all border-t-4 border-uk-blue-500">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-uk-dark mb-1">{supplier.name}</h3>
                  <p className="text-sm text-gray-600">📍 {supplier.location}</p>
                </div>
                {supplier.verified && (
                  <Badge variant="success">Verified</Badge>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-500">★</span>
                <span className="font-bold text-uk-dark">{supplier.rating}</span>
                <span className="text-sm text-gray-600">(120 reviews)</span>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Services:</p>
                <div className="flex flex-wrap gap-2">
                  {supplier.services.map((service, index) => (
                    <Badge key={index} variant="default" size="sm">{service}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-white border-2 border-uk-blue-500 text-uk-blue-500 hover:bg-uk-blue-50 px-4 py-2 rounded-lg font-semibold text-sm transition">
                  View Details
                </button>
                <button className="flex-1 bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
