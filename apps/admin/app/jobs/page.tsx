'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';
import { Badge } from '../components/Badge';

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Mock data
  useEffect(() => {
    setJobs([
      { id: 1, type: 'MOT', status: 'IN_PROGRESS', vehicle: 'AB12 CDE', customer: 'John Doe', date: '2024-01-15', garage: 'ABC Motors' },
      { id: 2, type: 'SERVICE', status: 'COMPLETED', vehicle: 'CD34 EFG', customer: 'Jane Smith', date: '2024-01-14', garage: 'City Auto' },
      { id: 3, type: 'REPAIR', status: 'PENDING', vehicle: 'EF56 GHI', customer: 'Bob Johnson', date: '2024-01-16', garage: 'QuickFix' },
    ]);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.vehicle.toLowerCase().includes(search.toLowerCase()) ||
                         job.customer.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || job.status === filter;
    return matchesSearch && matchesFilter;
  });

  const statusColors: any = {
    PENDING: 'warning',
    IN_PROGRESS: 'info',
    COMPLETED: 'success',
    CANCELLED: 'error',
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

      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-uk-dark mb-2">Jobs Management</h1>
            <p className="text-gray-600">Track and manage all service jobs</p>
          </div>
          <button className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-uk">
            + New Job
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-uk-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-uk-dark mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search by vehicle or customer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-uk-dark mb-2">Status</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
                >
                <option value="all">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} hover>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{job.type}</h3>
                    <Badge variant={statusColors[job.status]}>
                      {job.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Vehicle:</span>
                      <span className="ml-2 font-medium text-gray-900">{job.vehicle}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Customer:</span>
                      <span className="ml-2 font-medium text-gray-900">{job.customer}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <span className="ml-2 font-medium text-gray-900">{job.date}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Garage:</span>
                      <span className="ml-2 font-medium text-gray-900">{job.garage}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 ml-6">
                  <button className="bg-white border-2 border-uk-blue-500 text-uk-blue-500 hover:bg-uk-blue-50 px-4 py-2 rounded-lg font-semibold text-sm transition">
                    View
                  </button>
                  <button className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition">
                    Track
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="bg-white rounded-lg shadow-uk-lg p-12 text-center">
            <p className="text-gray-600">No jobs found</p>
          </div>
        )}
      </main>
    </div>
  );
}
