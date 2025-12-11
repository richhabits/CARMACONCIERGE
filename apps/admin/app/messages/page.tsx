'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';
import { Badge } from '../components/Badge';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  const conversations = [
    { id: 1, name: 'ABC Motors', lastMessage: 'Your service is complete', time: '2 min ago', unread: 2 },
    { id: 2, name: 'City Auto', lastMessage: 'We can schedule for tomorrow', time: '1 hour ago', unread: 0 },
    { id: 3, name: 'QuickFix Garage', lastMessage: 'Quote ready for review', time: '3 hours ago', unread: 1 },
  ];

  const messages = [
    { id: 1, sender: 'ABC Motors', text: 'Hello! Your vehicle is ready for collection.', time: '10:30 AM', sent: false },
    { id: 2, sender: 'You', text: 'Great! What time can I pick it up?', time: '10:32 AM', sent: true },
    { id: 3, sender: 'ABC Motors', text: 'Anytime before 6 PM today works for us.', time: '10:33 AM', sent: false },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage('');
    }
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
        <h1 className="text-4xl font-bold text-uk-dark mb-8">Messages</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
          <div className="bg-white rounded-lg shadow-uk-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
              />
            </div>
            <div className="overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    selectedChat === conv.id ? 'bg-uk-blue-50 border-l-4 border-l-uk-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-uk-dark">{conv.name}</h3>
                    {conv.unread > 0 && (
                      <Badge variant="error" size="sm">{conv.unread}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-gray-500 mt-1">{conv.time}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-white rounded-lg shadow-uk-lg flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-bold text-lg text-uk-dark">
                  {conversations.find(c => c.id === selectedChat)?.name}
                </h3>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        msg.sent
                          ? 'bg-uk-blue-500 text-white'
                          : 'bg-gray-100 text-uk-dark'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sent ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
                  />
                  <button
                    type="submit"
                    className="bg-uk-blue-500 hover:bg-uk-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
