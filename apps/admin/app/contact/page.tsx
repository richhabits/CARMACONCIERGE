'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
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
        <h1 className="text-4xl font-bold text-uk-dark mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-8">Get in touch with our team</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-uk-lg p-8">
            <h2 className="text-2xl font-bold text-uk-dark mb-4">Get In Touch</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Phone</div>
                <div className="font-bold text-uk-dark text-lg">0800 123 4567</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Email</div>
                <div className="font-bold text-uk-dark text-lg">hello@carmaconcierge.com</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Address</div>
                <div className="font-semibold text-uk-dark">123 High Street<br />London, UK</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-uk-lg p-8 space-y-6">
            {submitted && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                <p className="text-green-800 font-semibold">Message sent successfully!</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-uk-dark mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-uk-dark mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-uk-dark mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-uk-dark mb-2">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-uk-dark mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-uk-blue-500 hover:bg-uk-blue-600 text-white py-4 rounded-lg font-bold text-lg transition shadow-uk-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
