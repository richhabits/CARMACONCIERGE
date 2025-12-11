'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '../components/Logo';
import { Badge } from '../components/Badge';

export default function DiagnosticsPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('vehicleData');
    if (stored) {
      const data = JSON.parse(stored);
      if (data.vehicle) {
        setVehicles([data.vehicle]);
        setSelectedVehicle(data.vehicle);
      }
    }
  }, []);

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle || !symptoms.trim()) return;

    setLoading(true);
    
    setTimeout(() => {
      setDiagnosis({
        issue: 'Brake Pad Wear',
        severity: 'warning',
        description: 'Your brake pads are showing signs of wear. While still functional, they should be replaced within the next 1,000 miles.',
        estimatedCost: '£120 - £180',
        estimatedTime: '1-2 hours',
        recommendations: [
          'Schedule a brake inspection',
          'Replace front brake pads',
          'Check brake fluid levels',
          'Inspect brake discs for wear',
        ],
        commonCauses: [
          'Normal wear and tear',
          'Aggressive driving',
          'Heavy braking',
        ],
      });
      setLoading(false);
    }, 2000);
  };

  const severityColors: any = {
    info: 'info',
    warning: 'warning',
    critical: 'error',
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

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-uk-dark mb-2">AI Mechanic</h1>
          <p className="text-gray-600">Get instant diagnostics and expert advice for your vehicle</p>
        </div>

        {vehicles.length > 0 && (
          <div className="bg-white rounded-lg shadow-uk-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-uk-dark mb-4">Select Vehicle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`p-6 rounded-lg border-2 text-left transition-all ${
                    selectedVehicle?.id === vehicle.id
                      ? 'border-uk-blue-500 bg-uk-blue-50 shadow-uk'
                      : 'border-gray-200 hover:border-uk-blue-300'
                  }`}
                >
                  <div className="font-bold text-lg text-uk-dark">
                    {vehicle.make} {vehicle.model}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {vehicle.registrationNumber} • {vehicle.year}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-uk-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-uk-dark mb-4">Describe the Issue</h2>
          <form onSubmit={handleDiagnose} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-uk-dark mb-3">
                What symptoms are you experiencing?
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition"
                placeholder="e.g., Squeaking noise when braking, car pulls to the right, warning light on dashboard..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !selectedVehicle}
              className="w-full bg-uk-blue-500 hover:bg-uk-blue-600 text-white py-4 rounded-lg font-bold text-lg transition shadow-uk-lg disabled:opacity-50"
            >
              {loading ? 'Diagnosing...' : 'Get AI Diagnosis'}
            </button>
          </form>
        </div>

        {diagnosis && (
          <div className="bg-white rounded-lg shadow-uk-lg p-8 mb-8 border-l-4 border-uk-orange-500">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-uk-dark mb-2">Diagnosis</h2>
                <Badge variant={severityColors[diagnosis.severity]}>
                  {diagnosis.severity.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl text-uk-dark mb-2">{diagnosis.issue}</h3>
                <p className="text-gray-700 leading-relaxed">{diagnosis.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-uk-light rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Estimated Cost</div>
                  <div className="text-xl font-bold text-uk-dark">{diagnosis.estimatedCost}</div>
                </div>
                <div className="bg-uk-light rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Estimated Time</div>
                  <div className="text-xl font-bold text-uk-dark">{diagnosis.estimatedTime}</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-uk-dark mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {diagnosis.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-uk-blue-500 mt-1">•</span>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-uk-dark mb-3">Common Causes</h4>
                <ul className="space-y-2">
                  {diagnosis.commonCauses.map((cause: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-gray-400 mt-1">•</span>
                      <span className="text-gray-600">{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button className="flex-1 bg-uk-blue-500 hover:bg-uk-blue-600 text-white py-3 rounded-lg font-semibold transition shadow-uk">
                  Book Service
                </button>
                <button className="flex-1 bg-white border-2 border-uk-blue-500 text-uk-blue-500 hover:bg-uk-blue-50 py-3 rounded-lg font-semibold transition">
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-uk-lg p-8">
          <h3 className="font-bold text-lg text-uk-dark mb-4">Quick Tips</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Be as specific as possible when describing symptoms</p>
            <p>• Include when the issue started and any recent changes</p>
            <p>• Mention any warning lights or unusual sounds</p>
            <p>• For urgent issues, contact a garage immediately</p>
          </div>
        </div>
      </main>
    </div>
  );
}
