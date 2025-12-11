'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * UK AUTOMOTIVE STYLE HOMEPAGE
 * Inspired by Kwik Fit but modernized and better
 */
export default function Home() {
  const router = useRouter();
  const [registration, setRegistration] = useState('');
  const [postcode, setPostcode] = useState('');
  const [service, setService] = useState('tyres');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registration.trim()) {
      setError('Please enter your vehicle registration');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
      const response = await fetch(`${apiUrl}/vehicles/uk/lookup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registration: registration.trim().toUpperCase().replace(/\s/g, ''),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Vehicle not found');
      }

      if (data.accessToken) {
        localStorage.setItem('authToken', data.accessToken);
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('vehicleRegistration', registration.trim().toUpperCase());
        localStorage.setItem('vehicleData', JSON.stringify(data));
      }

      router.push(`/vehicle-details?reg=${encodeURIComponent(registration.trim().toUpperCase())}&service=${service}`);
    } catch (err: any) {
      setError(err.message || 'Unable to find your vehicle. Please check your registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-uk-blue-900 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6">
            <span>📞 0800 123 4567</span>
            <span>📧 hello@carmaconcierge.com</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-uk-orange-400">Sign In</Link>
            <Link href="/dashboard" className="hover:text-uk-orange-400">Admin</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-uk">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="text-uk-blue-500 font-bold text-3xl">
                CARMA<span className="text-uk-orange-500">CONCIERGE</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-6">
              <button className="flex flex-col items-center gap-1 text-uk-blue-500 hover:text-uk-blue-600">
                <span className="text-2xl">🔍</span>
                <span className="text-xs font-medium">Search</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-uk-blue-500 hover:text-uk-blue-600">
                <span className="text-2xl">❓</span>
                <span className="text-xs font-medium">FAQs</span>
              </button>
              <Link href="/booking" className="flex flex-col items-center gap-1 text-uk-blue-500 hover:text-uk-blue-600">
                <span className="text-2xl">📅</span>
                <span className="text-xs font-medium">Manage Booking</span>
              </Link>
              <button className="flex flex-col items-center gap-1 text-uk-blue-500 hover:text-uk-blue-600">
                <span className="text-2xl">📞</span>
                <span className="text-xs font-medium">Contact Us</span>
              </button>
              <Link href="/control-panel" className="flex flex-col items-center gap-1 bg-uk-blue-500 text-white px-4 py-2 rounded-lg hover:bg-uk-blue-600">
                <span className="text-2xl">🎛️</span>
                <span className="text-xs font-medium">Kwik Fit Club</span>
              </Link>
              <button className="flex flex-col items-center gap-1 text-uk-blue-500 hover:text-uk-blue-600">
                <span className="text-2xl">📍</span>
                <span className="text-xs font-medium">Locate A Centre</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-uk-blue-500 hover:text-uk-blue-600">
                <span className="text-2xl">🛒</span>
                <span className="text-xs font-medium">Your Basket</span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <NavButton active>Tyres</NavButton>
            <NavButton>MOT</NavButton>
            <NavButton>Servicing</NavButton>
            <NavButton>Brakes</NavButton>
            <NavButton>Batteries</NavButton>
            <NavButton>Other Products</NavButton>
            <NavButton accent>Offers</NavButton>
            <NavButton blue>Fleet Bookings</NavButton>
          </nav>
        </div>
      </header>

      {/* Hero Section with Search */}
      <div className="bg-gradient-to-br from-uk-blue-500 via-uk-blue-600 to-uk-blue-700 relative overflow-hidden">
        {/* Decorative Orange Accent */}
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-tl from-uk-orange-500 to-transparent opacity-20"></div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="bg-white rounded-2xl shadow-uk-xl p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-uk-dark mb-6">What are you looking for?</h1>

            <form onSubmit={handleSearch} className="space-y-6">
              {/* Service Selector */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <ServiceOption
                  active={service === 'tyres'}
                  onClick={() => setService('tyres')}
                  icon="🛞"
                  label="Tyres"
                />
                <ServiceOption
                  active={service === 'mot'}
                  onClick={() => setService('mot')}
                  icon="✅"
                  label="MOT"
                />
                <ServiceOption
                  active={service === 'service'}
                  onClick={() => setService('service')}
                  icon="🔧"
                  label="Servicing"
                />
                <ServiceOption
                  active={service === 'brakes'}
                  onClick={() => setService('brakes')}
                  icon="🛑"
                  label="Brakes"
                />
              </div>

              {/* Search Fields */}
              <div className="flex gap-3">
                {/* UK Flag + Registration */}
                <div className="flex gap-2 flex-1">
                  <button
                    type="button"
                    className="bg-uk-blue-500 text-white px-4 py-4 rounded-lg font-bold text-lg shrink-0"
                  >
                    🇬🇧 UK
                  </button>
                  <input
                    type="text"
                    value={registration}
                    onChange={(e) => {
                      setRegistration(e.target.value.toUpperCase());
                      setError('');
                    }}
                    placeholder="YOUR REG"
                    className="flex-1 px-6 py-4 text-2xl font-bold text-center border-2 border-gray-300 rounded-lg focus:border-uk-blue-500 focus:ring-2 focus:ring-uk-blue-200 outline-none transition uppercase tracking-wider"
                    maxLength={8}
                    required
                  />
                </div>

                {/* Postcode */}
                <div className="flex gap-2 flex-1">
                  <button
                    type="button"
                    className="bg-uk-orange-500 text-white px-4 py-4 rounded-lg shrink-0"
                  >
                    📍
                  </button>
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                    placeholder="Postcode"
                    className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-uk-orange-500 focus:ring-2 focus:ring-uk-orange-200 outline-none transition uppercase"
                    maxLength={8}
                  />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-uk-orange-500 hover:bg-uk-orange-600 text-white px-12 py-4 rounded-lg font-bold text-lg transition shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Search 🔍'}
                </button>
              </div>

              {/* Or Search by Tyre Size */}
              <div className="text-center">
                <button type="button" className="text-uk-blue-500 hover:text-uk-blue-600 font-medium">
                  Or, search by tyre size →
                </button>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}
            </form>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-4 gap-6 mt-8 max-w-5xl mx-auto">
            <TrustBadge icon="⏰" title="ORDER ONLINE FOR" subtitle="SAME DAY FITTING" />
            <TrustBadge icon="⭐" title="RATED EXCELLENT ON TRUSTPILOT" subtitle="Based on 75,000+ reviews" green />
            <TrustBadge icon="📅" title="OPEN 7 DAYS A WEEK" />
            <TrustBadge icon="✓" title="CERTIFIED TECHNICIANS" />
          </div>
        </div>
      </div>

      {/* Offers Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px bg-uk-blue-300 flex-1"></div>
          <h2 className="text-3xl font-bold text-uk-blue-500">Save with CarmaConcierge Offers</h2>
          <div className="h-px bg-uk-blue-300 flex-1"></div>
        </div>

        <p className="text-center text-gray-600 mb-8">
          Browse the latest offers and promotions from CarmaConcierge. Never miss a deal, from seasonal discounts to savings on{' '}
          <Link href="/tyres" className="text-uk-blue-500 hover:underline font-medium">tyres</Link> and{' '}
          <Link href="/services" className="text-uk-blue-500 hover:underline font-medium">car repairs</Link>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OfferCard
            badge="KWIK FIT SALE"
            title="10% OFF 2 & 20% OFF 4"
            subtitle="Tyres"
            color="blue"
          />
          <OfferCard
            badge="KWIK FIT SALE"
            title="10% OFF 2 & 15% OFF 4"
            subtitle="Brake Discs & Pads"
            color="blue"
          />
          <OfferCard
            badge="SUMMER OFFER"
            title="10% OFF 2 OR MORE"
            subtitle="Wiper Blades"
            color="orange"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-uk-light py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-uk-dark mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ServiceCard icon="🛞" title="Tyres" description="From premium to budget" />
            <ServiceCard icon="✅" title="MOT Testing" description="Book your MOT today" />
            <ServiceCard icon="🔧" title="Servicing" description="Full & interim services" />
            <ServiceCard icon="🛑" title="Brakes" description="Discs, pads & more" />
            <ServiceCard icon="🔋" title="Batteries" description="Free fitting & testing" />
            <ServiceCard icon="🤖" title="AI Diagnostics" description="Instant vehicle check" />
            <ServiceCard icon="📹" title="Video Calls" description="Expert consultations" />
            <ServiceCard icon="🔔" title="Reminders" description="Never miss service dates" />
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-uk-blue-500 py-8">
        <div className="container mx-auto px-4 text-center text-white">
          <p className="text-lg">
            Need help? Call us free on <span className="font-bold text-uk-orange-400">0800 123 4567</span> or{' '}
            <Link href="/contact" className="underline font-bold hover:text-uk-orange-400">contact us online</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Component: NavButton
function NavButton({ children, active = false, accent = false, blue = false }: any) {
  return (
    <button
      className={`
        px-6 py-4 font-semibold text-sm transition whitespace-nowrap
        ${active ? 'bg-uk-blue-500 text-white' : ''}
        ${accent ? 'bg-uk-orange-500 text-white hover:bg-uk-orange-600' : ''}
        ${blue ? 'bg-uk-blue-700 text-white hover:bg-uk-blue-800' : ''}
        ${!active && !accent && !blue ? 'bg-uk-blue-400 text-white hover:bg-uk-blue-500' : ''}
      `}
    >
      {children}
    </button>
  );
}

// Component: ServiceOption
function ServiceOption({ active, onClick, icon, label }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        p-4 rounded-lg border-2 font-semibold flex flex-col items-center gap-2 transition
        ${active
          ? 'border-uk-blue-500 bg-uk-blue-50 text-uk-blue-600'
          : 'border-gray-300 hover:border-uk-blue-300'
        }
      `}
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}

// Component: TrustBadge
function TrustBadge({ icon, title, subtitle, green = false }: any) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className={`text-xs font-bold mb-1 ${green ? 'text-uk-trust-green-500' : ''}`}>{title}</div>
      {subtitle && <div className="text-xs opacity-90">{subtitle}</div>}
    </div>
  );
}

// Component: OfferCard
function OfferCard({ badge, title, subtitle, color }: any) {
  return (
    <div className="bg-white rounded-lg shadow-uk-lg overflow-hidden hover:shadow-uk-xl transition group">
      <div className={`h-48 bg-gradient-to-br ${color === 'blue' ? 'from-uk-blue-500 to-uk-blue-700' : 'from-uk-orange-500 to-uk-orange-700'} relative`}>
        <div className="absolute top-4 right-4 bg-white text-uk-dark px-3 py-1 rounded-full text-xs font-bold">
          {badge}
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-2xl font-bold text-uk-orange-400">{title}</div>
          <div className="text-lg font-medium">{subtitle}</div>
        </div>
      </div>
      <div className="p-4">
        <button className="w-full bg-uk-blue-500 hover:bg-uk-blue-600 text-white py-3 rounded-lg font-semibold transition">
          View Offer →
        </button>
      </div>
    </div>
  );
}

// Component: ServiceCard
function ServiceCard({ icon, title, description }: any) {
  return (
    <div className="bg-white rounded-lg shadow-uk p-6 hover:shadow-uk-lg transition text-center group cursor-pointer">
      <div className="text-5xl mb-3 group-hover:scale-110 transition">{icon}</div>
      <h3 className="font-bold text-lg mb-2 text-uk-dark">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <button className="mt-4 text-uk-blue-500 hover:text-uk-blue-600 font-semibold text-sm">
        Learn more →
      </button>
    </div>
  );
}
