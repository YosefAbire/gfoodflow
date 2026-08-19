import React from 'react';
import Link from 'next/link';
import {
  Sprout,
  Store,
  Truck,
  BrainCircuit,
  Map,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Database,
  BarChart3,
  Globe2,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7F8F6] text-slate-900 font-sans flex flex-col selection:bg-[#F7A361] selection:text-[#09281C]">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-[#09281C]/95 backdrop-blur-md border-b border-[#155D3B]/40 text-white">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-[#155D3B] border border-[#F7A361]/40 flex items-center justify-center text-white font-black text-base shadow-lg shadow-[#09281C]/40 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-[#F7A361]" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight leading-none block">
                Gamo<span className="text-[#F7A361]">FoodFlow</span>
              </span>
              <span className="text-[10px] font-semibold text-emerald-300/80 uppercase tracking-widest block mt-0.5">
                Southern Ethiopia Food Security
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-300">
            <a href="#features" className="hover:text-[#F7A361] transition-colors">
              Features
            </a>
            <a href="#architecture" className="hover:text-[#F7A361] transition-colors">
              Architecture
            </a>
            <a href="#impact" className="hover:text-[#F7A361] transition-colors">
              Regional Impact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-xs font-extrabold text-[#09281C] bg-[#F7A361] hover:bg-[#f69246] rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#09281C] text-white pt-16 pb-24 px-6 relative overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#155D3B]/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7C4A21]/30 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#155D3B]/60 border border-[#F7A361]/30 text-[#F7A361] text-xs font-bold tracking-wide">
            <Activity className="w-3.5 h-3.5" />
            <span>Next-Generation Agricultural & Supply Chain Intelligence</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Real-Time Food Security & Market Intelligence for <span className="text-[#F7A361]">Gamo Zone</span>
          </h1>

          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Empowering regional coordinators, agricultural officers, and logistics planners with predictive AI analytics, PostGIS spatial mapping, and market price transparency across Southern Ethiopia.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#F7A361] hover:bg-[#f69246] text-[#09281C] font-extrabold text-sm rounded-xl shadow-xl shadow-[#F7A361]/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Access Intelligence Platform</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#155D3B] hover:bg-[#186a43] text-white border border-[#F7A361]/30 font-bold text-sm rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              Register Official Account
            </Link>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto border-t border-white/10 text-left">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-2xl font-black text-[#F7A361]">10+</div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Woredas Monitored</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-2xl font-black text-[#F7A361]">7 Crops</div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Teff, Maize, Coffee & More</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-2xl font-black text-[#F7A361]">PostGIS 3.4</div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Spatial Boundaries Engine</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-2xl font-black text-[#F7A361]">AI & RAG</div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Scenario Simulation Gateway</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Modules Section */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-xs font-black text-[#7C4A21] uppercase tracking-widest">
            Core Operational Modules
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-[#09281C] tracking-tight">
            End-to-End Visibility From Farm Field to Central Market
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#155D3B]">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Agricultural Supply Intelligence</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track crop supply volumes, peak harvest months, and collection center storage capacity across Arba Minch, Chencha, Mirab Abaya, and Derashe.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#7C4A21]">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Market Price & Trade Nodes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Monitor commodity prices (Teff, Maize, Wheat, Coffee), analyze price spreads between regional markets, and identify demand growth opportunities.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Logistics & Supply Chain</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time cargo shipment tracking, transport corridor performance metrics, perishability risk management, and delay bottleneck detection.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">AI & RAG Decision Gateway</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Interact with the FoodFlow AI Analyst agent, simulate shock scenarios (drought, fuel cost spikes, road blockages), and query vector-indexed knowledge.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#F7A361]/20 border border-[#F7A361]/40 flex items-center justify-center text-[#7C4A21]">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Geospatial & Remote Sensing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Native PostGIS spatial boundaries (Region, Zone, Woreda, Kebele), satellite NDVI vegetation indexes, and soil fertility recommendations.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Role-Based Access Control</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Granular permissions tailored for Super Admins, Program Managers, Data Analysts, Agricultural Officers, and Field Agents.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Overview Section */}
      <section id="architecture" className="bg-white py-20 px-6 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xs font-black text-[#155D3B] uppercase tracking-widest">
              Production Stack
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Enterprise Technology Architecture
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <Globe2 className="w-6 h-6 text-[#155D3B]" />
              <h4 className="font-bold text-sm text-slate-900">Next.js 14 Frontend</h4>
              <p className="text-xs text-slate-500">React 18 App Router, Tailwind CSS, Leaflet maps, Recharts graphs.</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <Layers className="w-6 h-6 text-[#7C4A21]" />
              <h4 className="font-bold text-sm text-slate-900">FastAPI Backend</h4>
              <p className="text-xs text-slate-500">Python 3.12, Clean Architecture, Pydantic v2, Alembic migrations.</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <Database className="w-6 h-6 text-emerald-700" />
              <h4 className="font-bold text-sm text-slate-900">PostGIS 3.4 Spatial</h4>
              <p className="text-xs text-slate-500">PostgreSQL 16, GeoAlchemy2, administrative polygon boundaries.</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <BarChart3 className="w-6 h-6 text-purple-700" />
              <h4 className="font-bold text-sm text-slate-900">Redis 7 & Celery</h4>
              <p className="text-xs text-slate-500">Asynchronous background workers, token storage, and RAG caching.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer Banner */}
      <section id="impact" className="bg-[#09281C] text-white py-16 px-6 mt-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Ready to Explore Regional Food Intelligence?
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Sign in with your organizational credentials to access live dashboards, run market scenario simulations, and coordinate regional agricultural logistics.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              href="/login"
              className="px-6 py-3 bg-[#F7A361] hover:bg-[#f69246] text-[#09281C] font-extrabold text-xs rounded-lg transition-all"
            >
              Sign In to Dashboard
            </Link>
            <Link
              href="/signup"
              className="px-6 py-3 bg-[#155D3B] hover:bg-[#186a43] text-white font-bold text-xs rounded-lg border border-[#F7A361]/30 transition-all"
            >
              Request Account Access
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#051811] text-slate-400 py-8 px-6 border-t border-white/5 text-xs text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 GamoFoodFlow Platform — Gamo Zone & Southern Ethiopia Food Security Intelligence.</p>
          <div className="flex gap-4 text-slate-300">
            <Link href="/login" className="hover:text-white">Login</Link>
            <Link href="/signup" className="hover:text-white">Signup</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
