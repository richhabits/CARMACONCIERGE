'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';
import { Badge } from '../components/Badge';

export default function PaymentsPage() {
  const [filter, setFilter] = useState('all');

  const transactions = [
    {
      id: 1,
      type: 'Service Payment',
      amount: 149.99,
      status: 'completed',
      date: '2024-01-15',
      method: 'Card',
      reference: 'ABC123',
    },
    {
      id: 2,
      type: 'MOT Test',
      amount: 54.85,
      status: 'completed',
      date: '2024-01-10',
      method: 'Card',
      reference: 'DEF456',
    },
    {
      id: 3,
      type: 'Service Deposit',
      amount: 50.00,
      status: 'pending',
      date: '2024-01-16',
      method: 'Bank Transfer',
      reference: 'GHI789',
    },
  ];

  const filteredTransactions = filter === 'all'
    ? transactions
    : transactions.filter(t => t.status === filter);

  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const statusColors: any = {
    completed: 'success',
    pending: 'warning',
    failed: 'error',
    refunded: 'default',
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-uk-dark mb-2">Payments & Transactions</h1>
          <p className="text-gray-600">View and manage your payment history</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-uk-lg p-6 border-t-4 border-uk-blue-500">
            <div className="text-sm text-gray-600 mb-2">Total Spent</div>
            <div className="text-3xl font-bold text-uk-dark">£{totalRevenue.toFixed(2)}</div>
          </div>
          <div className="bg-white rounded-lg shadow-uk-lg p-6 border-t-4 border-uk-orange-500">
            <div className="text-sm text-gray-600 mb-2">This Month</div>
            <div className="text-3xl font-bold text-uk-dark">£204.84</div>
          </div>
          <div className="bg-white rounded-lg shadow-uk-lg p-6 border-t-4 border-uk-blue-700">
            <div className="text-sm text-gray-600 mb-2">Pending</div>
            <div className="text-3xl font-bold text-uk-dark">£50.00</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-uk-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-bold text-uk-dark">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
            >
              <option value="all">All Transactions</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-lg shadow-uk-lg p-6 hover:shadow-uk-xl transition-all border-l-4 border-uk-blue-500">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-bold text-uk-dark">{transaction.type}</h3>
                    <Badge variant={statusColors[transaction.status]}>
                      {transaction.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span>Date: </span>
                      <span className="font-semibold text-uk-dark">{transaction.date}</span>
                    </div>
                    <div>
                      <span>Method: </span>
                      <span className="font-semibold text-uk-dark">{transaction.method}</span>
                    </div>
                    <div>
                      <span>Reference: </span>
                      <span className="font-semibold text-uk-dark">{transaction.reference}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-uk-orange-500">
                    £{transaction.amount.toFixed(2)}
                  </div>
                  <button className="mt-2 bg-white border-2 border-uk-blue-500 text-uk-blue-500 hover:bg-uk-blue-50 px-4 py-2 rounded-lg font-semibold text-sm transition">
                    View Receipt
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="bg-white rounded-lg shadow-uk-lg p-12 text-center">
            <p className="text-gray-600">No transactions found</p>
          </div>
        )}
      </main>
    </div>
  );
}
