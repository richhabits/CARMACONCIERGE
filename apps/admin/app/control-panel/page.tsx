'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';
import { Badge } from '../components/Badge';

export default function ControlPanelPage() {
  const [settings, setSettings] = useState({
    dvlaApiEnabled: true,
    dvsaApiEnabled: true,
    tflApiEnabled: false,
    twilioEnabled: false,
    stripeEnabled: false,
    autoPostEnabled: true,
    facebookEnabled: false,
    twitterEnabled: false,
    instagramEnabled: false,
    outboundCallsEnabled: false,
    inboundCallsEnabled: false,
    leadScrapingEnabled: true,
    autoFollowUpEnabled: true,
    commissionsEnabled: true,
    subscriptionsEnabled: true,
    partsMarketplaceEnabled: false,
  });

  const toggleFeature = (feature: string) => {
    setSettings(prev => ({ ...prev, [feature]: !prev[feature] }));
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
          <h1 className="text-4xl font-bold text-uk-dark mb-2">🎛️ ROBERT'S CONTROL PANEL</h1>
          <p className="text-gray-600">Full system control and monitoring</p>
        </div>

        <div className="bg-white rounded-lg shadow-uk-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-uk-dark mb-4">System Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="text-3xl font-bold text-green-600 mb-2">✓</div>
              <div className="text-sm text-gray-600 mb-1">Core System</div>
              <div className="font-bold text-green-700">READY</div>
            </div>
            <div className="p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="text-3xl font-bold text-yellow-600 mb-2">⚠</div>
              <div className="text-sm text-gray-600 mb-1">APIs</div>
              <div className="font-bold text-yellow-700">SETUP NEEDED</div>
            </div>
            <div className="p-6 bg-uk-blue-50 rounded-lg border-l-4 border-uk-blue-500">
              <div className="text-3xl font-bold text-uk-blue-600 mb-2">⚙</div>
              <div className="text-sm text-gray-600 mb-1">Marketing</div>
              <div className="font-bold text-uk-blue-700">CONFIGURE</div>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <div className="text-3xl font-bold text-purple-600 mb-2">📞</div>
              <div className="text-sm text-gray-600 mb-1">Calling</div>
              <div className="font-bold text-purple-700">OPTIONAL</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-uk-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-uk-dark mb-4">🔑 API Management</h2>
          <div className="space-y-4">
            {[
              { key: 'dvlaApiEnabled', name: 'DVLA Vehicle API', status: 'ACTIVE', cost: 'FREE', setup: false },
              { key: 'dvsaApiEnabled', name: 'DVSA MOT API', status: 'ACTIVE', cost: 'FREE', setup: false },
              { key: 'tflApiEnabled', name: 'TfL ULEZ API', status: 'SETUP NEEDED', cost: 'FREE', setup: true },
              { key: 'twilioEnabled', name: 'Twilio Calling', status: 'SETUP NEEDED', cost: '£0.05/min', setup: true },
              { key: 'stripeEnabled', name: 'Stripe Payments', status: 'SETUP NEEDED', cost: '1.5% + 20p', setup: true },
            ].map((api) => (
              <div key={api.key} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-uk-dark">{api.name}</h3>
                    <Badge variant={api.status === 'ACTIVE' ? 'success' : 'warning'} size="sm">
                      {api.status}
                    </Badge>
                    <span className="text-sm text-gray-600">({api.cost})</span>
                  </div>
                  {api.setup && (
                    <p className="text-xs text-gray-500 mt-1">Setup instructions available</p>
                  )}
                </div>
                <button
                  onClick={() => toggleFeature(api.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[api.key] ? 'bg-uk-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings[api.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-uk-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-uk-dark mb-4">📱 Marketing Automation</h2>
          <div className="space-y-4">
            {[
              { key: 'autoPostEnabled', name: 'Auto-Post to Social Media', desc: 'Automatically posts daily content' },
              { key: 'facebookEnabled', name: 'Facebook Integration', desc: 'Post to Facebook pages' },
              { key: 'twitterEnabled', name: 'Twitter Integration', desc: 'Post to Twitter/X' },
              { key: 'instagramEnabled', name: 'Instagram Integration', desc: 'Post to Instagram' },
            ].map((feature) => (
              <div key={feature.key} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
                <div>
                  <div className="font-semibold text-uk-dark">{feature.name}</div>
                  <div className="text-sm text-gray-600">{feature.desc}</div>
                </div>
                <button
                  onClick={() => toggleFeature(feature.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[feature.key] ? 'bg-uk-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings[feature.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-uk-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-uk-dark mb-4">📞 Calling System</h2>
          <div className="space-y-4">
            {[
              { key: 'outboundCallsEnabled', name: 'Outbound Calls', desc: 'Make sales calls to leads' },
              { key: 'inboundCallsEnabled', name: 'Inbound Calls', desc: 'Receive customer calls' },
            ].map((feature) => (
              <div key={feature.key} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
                <div>
                  <div className="font-semibold text-uk-dark">{feature.name}</div>
                  <div className="text-sm text-gray-600">{feature.desc}</div>
                </div>
                <button
                  onClick={() => toggleFeature(feature.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[feature.key] ? 'bg-uk-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings[feature.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-uk-lg p-8">
          <h2 className="text-xl font-bold text-uk-dark mb-4">💰 Revenue Features</h2>
          <div className="space-y-4">
            {[
              { key: 'commissionsEnabled', name: 'Commissions', desc: 'Earn from bookings' },
              { key: 'subscriptionsEnabled', name: 'Subscriptions', desc: 'Monthly/annual plans' },
              { key: 'partsMarketplaceEnabled', name: 'Parts Marketplace', desc: 'Sell car parts' },
              { key: 'leadScrapingEnabled', name: 'Lead Generation', desc: 'Auto-scrape local leads' },
              { key: 'autoFollowUpEnabled', name: 'Auto Follow-Up', desc: 'Automated lead nurturing' },
            ].map((feature) => (
              <div key={feature.key} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
                <div>
                  <div className="font-semibold text-uk-dark">{feature.name}</div>
                  <div className="text-sm text-gray-600">{feature.desc}</div>
                </div>
                <button
                  onClick={() => toggleFeature(feature.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[feature.key] ? 'bg-uk-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings[feature.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
