import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-orange-500">CARMA<span className="text-white">PRO</span></div>
        <div className="space-x-4">
          <Link href="/login" className="text-gray-300 hover:text-white transition">Sign In</Link>
          <Link href="/signup" className="bg-orange-600 px-4 py-2 rounded font-bold hover:bg-orange-700 transition">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          The Operating System for <br />
          <span className="text-blue-500">Independent Garages</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Manage bookings, order parts, and communicate with customers in one simple app.
          Stop using paper diaries. Start growing your revenue.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition">
            Start Free Trial
          </button>
          <button className="border border-gray-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-black transition">
            Book Demo
          </button>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon="📅"
            title="Smart Calendar"
            description="Drag-and-drop booking management. innovative 'Bay View' lets you see which ramp is free."
          />
          <FeatureCard
            icon="💬"
            title="Customer Chat"
            description="Send photos of worn brake pads directly to customers for instant approval."
          />
          <FeatureCard
            icon="⚙️"
            title="Parts Marketplace"
            description="Order parts from Euro Car Parts & GSF directly within the booking. Compare prices instantly."
          />
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-slate-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Trusted by 500+ UK Garages</h2>
          <div className="flex justify-center gap-12 grayscale opacity-50">
            {/* Placeholders for logos */}
            <div className="text-2xl font-bold">BOSCH Service</div>
            <div className="text-2xl font-bold">Halfords</div>
            <div className="text-2xl font-bold">KwikFit</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-orange-500 transition cursor-pointer">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}
