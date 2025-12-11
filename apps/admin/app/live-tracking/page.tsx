'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';
import { Badge } from '../components/Badge';

export default function LiveTrackingPage() {
  const [activeJobs] = useState([
    {
      id: 1,
      type: 'MOT Test',
      vehicle: 'AB12 CDE',
      customer: 'John Doe',
      garage: 'ABC Motors',
      technician: 'Mike Johnson',
      status: 'IN_PROGRESS',
      progress: 65,
      photos: 3,
      videos: 1,
      eta: '2:30 PM',
    },
    {
      id: 2,
      type: 'Full Service',
      vehicle: 'CD34 EFG',
      customer: 'Jane Smith',
      garage: 'City Auto',
      technician: 'Sarah Williams',
      status: 'IN_PROGRESS',
      progress: 40,
      photos: 2,
      videos: 0,
      eta: '4:00 PM',
    },
  ]);

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-uk-dark mb-2">Live Service Tracking</h1>
          <p className="text-gray-600">Monitor real-time service progress with photos and updates</p>
        </div>

        <div className="space-y-6">
          {activeJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-uk-lg p-8 hover:shadow-uk-xl transition-all border-l-4 border-uk-blue-500">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-2xl font-bold text-uk-dark">{job.type}</h3>
                    <Badge variant="info">In Progress</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-600">Vehicle:</span>
                      <span className="ml-2 font-semibold text-uk-dark">{job.vehicle}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Customer:</span>
                      <span className="ml-2 font-semibold text-uk-dark">{job.customer}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Garage:</span>
                      <span className="ml-2 font-semibold text-uk-dark">{job.garage}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Technician:</span>
                      <span className="ml-2 font-semibold text-uk-dark">{job.technician}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-uk-dark">Progress</span>
                      <span className="text-sm font-bold text-uk-blue-500">{job.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-uk-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">📷</span>
                      <span className="font-semibold text-uk-dark">{job.photos} photos</span>
                    </div>
                    {job.videos > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">🎥</span>
                        <span className="font-semibold text-uk-dark">{job.videos} video</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">⏰</span>
                      <span className="font-semibold text-uk-dark">ETA: {job.eta}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 ml-6">
                  <button className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-uk">
                    View Live
                  </button>
                  <button className="bg-white border-2 border-uk-blue-500 text-uk-blue-500 hover:bg-uk-blue-50 px-6 py-3 rounded-lg font-semibold transition">
                    View Photos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeJobs.length === 0 && (
          <div className="bg-white rounded-lg shadow-uk-lg p-12 text-center">
            <p className="text-gray-600">No active services at the moment</p>
          </div>
        )}
      </main>
    </div>
  );
}
