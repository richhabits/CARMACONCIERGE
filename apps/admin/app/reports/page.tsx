'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState('30');

  const reportTypes = [
    { id: 'revenue', label: 'Revenue Report', desc: 'Financial performance and revenue breakdown' },
    { id: 'jobs', label: 'Jobs Report', desc: 'Service jobs statistics and trends' },
    { id: 'users', label: 'Users Report', desc: 'User growth and activity metrics' },
    { id: 'vehicles', label: 'Vehicles Report', desc: 'Vehicle registration and usage data' },
  ];

  const handleExport = () => {
    alert(`Exporting ${reportType} report...`);
  };

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

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-uk-dark mb-2">Reports</h1>
          <p className="text-gray-600">Generate and export detailed reports</p>
        </div>

        <div className="bg-white rounded-lg shadow-uk-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-uk-dark mb-4">Select Report Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setReportType(type.id)}
                className={`p-6 rounded-lg border-2 text-left transition-all ${
                  reportType === type.id
                    ? 'border-uk-blue-500 bg-uk-blue-50 shadow-uk'
                    : 'border-gray-200 hover:border-uk-blue-300'
                }`}
              >
                <div className="font-bold text-lg text-uk-dark mb-1">{type.label}</div>
                <div className="text-sm text-gray-600">{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-uk-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-uk-dark mb-4">Date Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-uk-dark mb-2">From</label>
              <input type="date" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-bold text-uk-dark mb-2">To</label>
              <input type="date" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition" />
            </div>
          </div>
          <div className="flex gap-2">
            {['7', '30', '90', '365'].map((days) => (
              <button
                key={days}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  dateRange === days
                    ? 'bg-uk-blue-500 text-white'
                    : 'bg-white border-2 border-uk-blue-500 text-uk-blue-500 hover:bg-uk-blue-50'
                }`}
                onClick={() => setDateRange(days)}
              >
                Last {days} days
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-uk-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-uk-dark mb-4">Export Format</h2>
          <div className="flex gap-4">
            <button onClick={handleExport} className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-uk">
              📄 Export PDF
            </button>
            <button onClick={handleExport} className="bg-white border-2 border-uk-blue-500 text-uk-blue-500 hover:bg-uk-blue-50 px-6 py-3 rounded-lg font-semibold transition">
              📊 Export Excel
            </button>
            <button onClick={handleExport} className="bg-white border-2 border-uk-blue-500 text-uk-blue-500 hover:bg-uk-blue-50 px-6 py-3 rounded-lg font-semibold transition">
              📋 Export CSV
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-uk-lg p-8">
          <h2 className="text-xl font-bold text-uk-dark mb-4">Report Preview</h2>
          <div className="space-y-4">
            <div className="p-4 bg-uk-light rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Report Type: {reportTypes.find(t => t.id === reportType)?.label}</p>
              <p className="text-sm text-gray-600 mb-2">Date Range: Last {dateRange} days</p>
              <p className="text-sm text-gray-600">Status: Ready to export</p>
            </div>
            <div className="text-center py-8 text-gray-500">
              <p>Report preview will appear here</p>
              <p className="text-sm mt-2">Click export to generate the full report</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
