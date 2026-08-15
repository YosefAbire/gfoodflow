'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { MetricCard } from '@/components/ui/MetricCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';
import { ExportReportModal } from '@/components/modals/ExportReportModal';
import {
  Users,
  Sprout,
  Truck,
  Store,
  AlertTriangle,
  BrainCircuit,
  ArrowRight,
  Download,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

export default function OverviewPage() {
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Gamo FoodFlow</h1>
              <DemoDataBadge />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Food System Intelligence & Supply Chain Coordination for Gamo, Ethiopia
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExportOpen(true)}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs rounded-lg shadow-2xs flex items-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Conceptual Pipeline Card */}
        <div className="foodflow-card p-5 bg-gradient-to-r from-[#09281C] to-[#155D3B] text-white">
          <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Gamo Agricultural Supply Chain Flow
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-300/80">AI Intelligence Layer Active</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
            {[
              { step: 'Farmers', label: '12.4k Actors', detail: 'Smallholders' },
              { step: 'Production', label: '4 Crop Zones', detail: 'Highland & Valley' },
              { step: 'Harvest', label: '8,420 Tons', detail: '4-Wk Forecast' },
              { step: 'Aggregation', label: '4 Hubs', detail: '92% Utilization' },
              { step: 'Transport', label: '412t Fleet', detail: '-74t Gap Alert' },
              { step: 'Market', label: '4 Nodes', detail: '+14.2% Premium' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-emerald-950/40 border border-emerald-700/50 rounded-lg p-3 relative group hover:bg-emerald-900/50 transition-colors"
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  {item.step}
                </div>
                <div className="text-xs font-extrabold text-white mt-1">{item.label}</div>
                <div className="text-[10px] text-emerald-200/70 mt-0.5">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* System KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            title="Farmers Supported"
            value="12,480"
            subtitle="Registered across Gamo cooperatives"
            icon={Users}
          />
          <MetricCard
            title="Expected Harvest"
            value="8,420 t"
            subtitle="4-week projected harvest volume"
            trend="+18% vs prev cycle"
            icon={Sprout}
          />
          <MetricCard
            title="Available Transport"
            value="412 t"
            subtitle="Commercial fleet capacity"
            trend="-74t Deficit"
            trendDirection="down"
            icon={Truck}
          />
          <MetricCard
            title="Market Premium"
            value="+14.2%"
            subtitle="Avg margin opportunity"
            trend="↑ 2.1%"
            icon={Store}
          />
          <MetricCard
            title="Logistics Risks"
            value="1 Critical"
            subtitle="Chencha Escarpment Pass"
            variant="critical"
            badge="ALERT"
          />
        </div>

        {/* Intelligence Banner Alert */}
        <div className="foodflow-card p-5 bg-amber-50/70 border-amber-200 border-l-4 border-l-[#7C4A21] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-[#7C4A21] flex items-center justify-center shrink-0">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 uppercase">Critical Intelligence Alert</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-200 text-amber-900 rounded">
                  High Confidence
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium mt-1">
                Maize harvest volume in Arba Minch Zuria is projected to exceed available transport capacity by 74 tons during Wk 43. Re-routing trucks from Chencha Hub can resolve the deficit.
              </p>
            </div>
          </div>

          <Link
            href="/intelligence"
            className="px-4 py-2 bg-[#7C4A21] hover:bg-[#5C3415] text-white text-xs font-bold rounded-lg shadow shrink-0 flex items-center gap-1.5 transition-colors"
          >
            <span>Inspect AI Recommendation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Main Grid: Operational Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Supply Overview */}
          <div className="foodflow-card p-5 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-[#155D3B]" />
                Supply Intelligence
              </h3>
              <Link href="/supply" className="text-xs font-bold text-[#155D3B] hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Maize Supply</span>
                <span className="font-extrabold text-[#7C4A21]">2,840 tons</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-[#7C4A21] h-2 rounded-full" style={{ width: '57%' }} />
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Banana Supply</span>
                <span className="font-extrabold text-[#F7A361]">1,420 tons</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-[#F7A361] h-2 rounded-full" style={{ width: '28%' }} />
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Mango Supply</span>
                <span className="font-extrabold text-red-500">720 tons</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-red-400 h-2 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>
          </div>

          {/* Market Overview */}
          <div className="foodflow-card p-5 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Store className="w-4 h-4 text-[#7C4A21]" />
                Market Intelligence
              </h3>
              <Link href="/markets" className="text-xs font-bold text-[#7C4A21] hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Maize → Arba Minch Node</div>
                  <div className="text-[10px] text-slate-500">Highest margin pair (Opp score 94/100)</div>
                </div>
                <StatusBadge status="Critical" size="sm" />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Banana → Mirab Abaya</div>
                  <div className="text-[10px] text-slate-500">Price spiking (+18.1% premium)</div>
                </div>
                <StatusBadge status="High" size="sm" />
              </div>
            </div>
          </div>

          {/* Logistics Overview */}
          <div className="foodflow-card p-5 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                Logistics Bottlenecks
              </h3>
              <Link href="/logistics" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-900">Chencha Escarpment Pass</span>
                  <span className="text-[10px] font-extrabold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                    +45m Delay
                  </span>
                </div>
                <p className="text-[11px] text-red-700 font-medium">Mudslides on Route A7 impacting truck transit</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Mirab Abaya Junction</span>
                  <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                    +25m Slowdown
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">Weighbridge queue buildup</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </AppShell>
  );
}
