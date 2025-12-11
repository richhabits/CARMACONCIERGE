'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';
import { Chart } from '../components/Chart';
import { StatsCard } from '../components/StatsCard';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30');

  const stats = [
    { title: 'Total Revenue', value: '£45,678', change: 12 },
    { title: 'Active Jobs', value: '234', change: 8 },
    { title: 'New Users', value: '1,234', change: 15 },
    { title: 'Avg. Rating', value: '4.8', change: 2 },
  ];

  const jobsByType = [
    { label: 'MOT', value: 45 },
    { label: 'Servicing', value: 32 },
    { label: 'Repairs', value: 28 },
    { label: 'Inspections', value: 15 },
  ];

  const jobsByStatus = [
    { label: 'Completed', value: 120 },
    { label: 'In Progress', value: 45 },
    { label: 'Pending', value: 30 },
    { label: 'Cancelled', value: 5 },
  ];

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
            <h1 className="text-4xl font-bold text-uk-dark mb-2">Analytics</h1>
            <p className="text-gray-600">Business insights and performance metrics</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-uk-lg p-8">
            <Chart title="Jobs by Type" data={jobsByType} />
          </div>
          <div className="bg-white rounded-lg shadow-uk-lg p-8">
            <Chart title="Jobs by Status" data={jobsByStatus} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-uk-lg p-8">
            <h3 className="text-xl font-bold text-uk-dark mb-4">Revenue Trend</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Week {item}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-uk-blue-500 rounded-full"
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                    <span className="font-bold text-uk-dark w-20 text-right">
                      £{Math.floor(Math.random() * 10000)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-uk-lg p-8">
            <h3 className="text-xl font-bold text-uk-dark mb-4">User Growth</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Week {item}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-uk-orange-500 rounded-full"
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                    <span className="font-bold text-uk-dark w-20 text-right">
                      +{Math.floor(Math.random() * 100)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
