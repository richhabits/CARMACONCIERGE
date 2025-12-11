'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';
import { StatsCard } from '../components/StatsCard';

export default function DashboardPage() {
  const [stats] = useState({
    users: 1234,
    vehicles: 5678,
    jobs: 234,
    suppliers: 89,
  });

  const recentActivity = [
    { type: 'user', message: 'New user registered', time: '2 minutes ago', color: 'uk-blue' },
    { type: 'job', message: 'Job completed', time: '15 minutes ago', color: 'green' },
    { type: 'quote', message: 'New quote submitted', time: '1 hour ago', color: 'uk-orange' },
    { type: 'vehicle', message: 'Vehicle added', time: '2 hours ago', color: 'uk-blue' },
  ];

  return (
    <div className="min-h-screen bg-uk-light">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-uk">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              <Link href="/profile" className="text-uk-blue-500 hover:text-uk-blue-600 font-medium text-sm">
                Profile
              </Link>
              <Link href="/settings" className="text-uk-blue-500 hover:text-uk-blue-600 font-medium text-sm">
                Settings
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-uk-dark mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Total Users" value={stats.users.toLocaleString()} change={12} />
          <StatsCard title="Total Vehicles" value={stats.vehicles.toLocaleString()} change={8} />
          <StatsCard title="Active Jobs" value={stats.jobs} change={-5} />
          <StatsCard title="Suppliers" value={stats.suppliers} change={15} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/book-service" className="bg-white rounded-lg shadow-uk-lg p-6 hover:shadow-uk-xl transition-all group border-t-4 border-uk-blue-500">
            <div className="w-12 h-12 bg-uk-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🛠️</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-uk-dark">Book Service</h3>
            <p className="text-gray-600 text-sm">Schedule a vehicle service</p>
          </Link>
          
          <Link href="/book-mot" className="bg-white rounded-lg shadow-uk-lg p-6 hover:shadow-uk-xl transition-all group border-t-4 border-uk-orange-500">
            <div className="w-12 h-12 bg-uk-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-uk-dark">Book MOT</h3>
            <p className="text-gray-600 text-sm">Book your MOT test</p>
          </Link>
          
          <Link href="/get-quote" className="bg-white rounded-lg shadow-uk-lg p-6 hover:shadow-uk-xl transition-all group border-t-4 border-uk-blue-700">
            <div className="w-12 h-12 bg-uk-blue-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-uk-dark">Get Quote</h3>
            <p className="text-gray-600 text-sm">Compare prices from garages</p>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-uk-lg p-8">
          <h2 className="text-2xl font-bold text-uk-dark mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className={`w-2 h-2 rounded-full ${
                  activity.color === 'uk-blue' ? 'bg-uk-blue-500' :
                  activity.color === 'uk-orange' ? 'bg-uk-orange-500' :
                  'bg-green-500'
                }`} />
                <div className="flex-1">
                  <p className="font-semibold text-uk-dark">{activity.message}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
