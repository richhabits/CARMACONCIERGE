'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';
import { Badge } from '../components/Badge';

export default function NotificationsPage() {
  const [notifications] = useState([
    {
      id: 1,
      type: 'reminder',
      title: 'MOT Due Soon',
      message: 'Your vehicle AB12 CDE MOT is due in 30 days',
      time: '2 hours ago',
      read: false,
      priority: 'high',
    },
    {
      id: 2,
      type: 'job',
      title: 'Service Completed',
      message: 'Your service at ABC Motors has been completed',
      time: '1 day ago',
      read: false,
      priority: 'medium',
    },
    {
      id: 3,
      type: 'quote',
      title: 'New Quote Available',
      message: 'You have 3 new quotes for your service request',
      time: '2 days ago',
      read: true,
      priority: 'low',
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

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

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-uk-dark mb-2">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button className="bg-white border-2 border-uk-blue-500 text-uk-blue-500 hover:bg-uk-blue-50 px-4 py-2 rounded-lg font-semibold text-sm transition">
              Mark all as read
            </button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-uk-lg p-6 hover:shadow-uk-xl transition-all ${
                !notification.read ? 'border-l-4 border-l-uk-blue-500' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-uk-dark">{notification.title}</h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-uk-blue-500 rounded-full" />
                    )}
                    <Badge
                      variant={
                        notification.priority === 'high' ? 'error' :
                        notification.priority === 'medium' ? 'warning' : 'default'
                      }
                      size="sm"
                    >
                      {notification.priority}
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-2">{notification.message}</p>
                  <p className="text-sm text-gray-500">{notification.time}</p>
                </div>
                {!notification.read && (
                  <button className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition">
                    View
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="bg-white rounded-lg shadow-uk-lg p-12 text-center">
            <p className="text-gray-600">No notifications</p>
          </div>
        )}
      </main>
    </div>
  );
}
