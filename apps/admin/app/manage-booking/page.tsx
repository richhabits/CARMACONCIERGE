'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';
import { Badge } from '../components/Badge';

export default function ManageBookingPage() {
  const [bookingRef, setBookingRef] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setBookings([
      {
        id: 1,
        ref: 'ABC123',
        type: 'MOT Test',
        vehicle: 'AB12 CDE',
        date: '2024-01-20',
        time: '10:00 AM',
        garage: 'ABC Motors',
        status: 'CONFIRMED',
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-uk-light">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-uk">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Link href="/" className="text-uk-blue-500 hover:text-uk-blue-600 font-medium text-sm">
              ← Back
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-uk-dark mb-2">Manage A Booking</h1>
        <p className="text-gray-600 mb-8">View, modify or cancel your bookings</p>

        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-uk-lg p-8 mb-8">
          <label className="block text-sm font-bold text-uk-dark mb-3">Booking Reference</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={bookingRef}
              onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
              placeholder="Enter booking reference"
              className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition uppercase"
              required
            />
            <button
              type="submit"
              className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-uk-lg"
            >
              Search
            </button>
          </div>
        </form>

        {bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-uk-lg p-8 border-l-4 border-uk-blue-500">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-uk-dark">{booking.type}</h3>
                      <Badge variant="success">{booking.status}</Badge>
                    </div>
                    <p className="text-lg text-gray-600">Reference: <span className="font-bold text-uk-blue-500">{booking.ref}</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Vehicle</div>
                    <div className="font-semibold text-uk-dark">{booking.vehicle}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Date</div>
                    <div className="font-semibold text-uk-dark">{booking.date}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Time</div>
                    <div className="font-semibold text-uk-dark">{booking.time}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Garage</div>
                    <div className="font-semibold text-uk-dark">{booking.garage}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                    Modify Booking
                  </button>
                  <button className="bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 px-6 py-3 rounded-lg font-semibold transition">
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
