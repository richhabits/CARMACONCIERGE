'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { apiClient } from '@/lib/api';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await apiClient.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { key: 'firstName', label: 'First Name', sortable: true },
    { key: 'lastName', label: 'Last Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'createdAt', label: 'Joined', sortable: true },
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-uk-dark mb-2">Users Management</h1>
          <p className="text-gray-600">Manage all registered users</p>
        </div>
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-uk-lg p-12 text-center">
            <p className="text-gray-600">Loading users...</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={users}
            searchable
            onRowClick={(row) => console.log('Selected user:', row)}
          />
        )}
      </main>
    </div>
  );
}