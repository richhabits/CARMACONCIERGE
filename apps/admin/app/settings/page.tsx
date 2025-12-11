'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    reminderAlerts: true,
    marketingEmails: false,
    biometricAuth: false,
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
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

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-uk-dark mb-8">Settings</h1>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-uk-lg p-8">
            <h2 className="text-xl font-bold text-uk-dark mb-6">Notifications</h2>
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive updates via text message' },
                { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications' },
                { key: 'reminderAlerts', label: 'Reminder Alerts', desc: 'Get alerts for MOT, service, and tax' },
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="font-semibold text-uk-dark">{setting.label}</div>
                    <div className="text-sm text-gray-600">{setting.desc}</div>
                  </div>
                  <button
                    onClick={() => toggleSetting(setting.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings[setting.key] ? 'bg-uk-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-uk-lg p-8">
            <h2 className="text-xl font-bold text-uk-dark mb-6">Privacy & Security</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-uk-dark">Biometric Authentication</div>
                  <div className="text-sm text-gray-600">Use Face ID or Touch ID to sign in</div>
                </div>
                <button
                  onClick={() => toggleSetting('biometricAuth')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.biometricAuth ? 'bg-uk-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.biometricAuth ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <button className="text-uk-blue-500 font-semibold text-sm hover:underline">
                Change Password
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-uk-lg p-8">
            <h2 className="text-xl font-bold text-uk-dark mb-6">Marketing</h2>
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="font-semibold text-uk-dark">Marketing Emails</div>
                <div className="text-sm text-gray-600">Receive promotional offers and updates</div>
              </div>
              <button
                onClick={() => toggleSetting('marketingEmails')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.marketingEmails ? 'bg-uk-blue-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-uk-lg p-8">
            <h2 className="text-xl font-bold text-uk-dark mb-6">Account</h2>
            <div className="space-y-3">
              <button className="w-full text-left py-3 text-gray-700 hover:text-uk-dark font-semibold">
                Download My Data
              </button>
              <button className="w-full text-left py-3 text-red-600 hover:text-red-700 font-semibold">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
