'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { LogisticsSubNav } from '@/components/logistics/LogisticsSubNav';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';
import { ExportReportModal } from '@/components/modals/ExportReportModal';
import { AlternativeRouteComparison } from '@/components/logistics/AlternativeRouteComparison';
import { BottleneckMap } from '@/components/maps/BottleneckMap';
import {
  DEMO_ROUTE_MATRIX,
  DEMO_ALTERNATIVE_ROUTE_DATA,
  DEMO_LOGISTICS_BOTTLENECK,
} from '@/data/logisticsData';
import {
  Route,
  AlertTriangle,
  Clock,
  Download,
  Wrench,
  Building,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export default function RouteIntelligencePage() {
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <AppShell>
      <div className="space-y-6">
        <LogisticsSubNav />

        {/* Header matching Stitch Image 4 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Route Intelligence
              </h1>
              <DemoDataBadge />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Live performance, risk assessment, and operational bottlenecks across Gamo regional corridors.
            </p>
          </div>
        </div>

        {/* Top Section: Route Performance Matrix (Left 7) & Route Bottlenecks (Right 5) matching Stitch Image 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Route Performance Matrix Table */}
          <div className="lg:col-span-7 foodflow-card p-5 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 text-[#155D3B]" />
                <h3 className="font-bold text-sm text-slate-900 tracking-tight">
                  Route Performance Matrix
                </h3>
              </div>

              <button
                onClick={() => setIsExportOpen(true)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded border border-slate-300 transition-colors cursor-pointer"
              >
                EXPORT CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Route</th>
                    <th className="py-3 px-3">Avg Time</th>
                    <th className="py-3 px-3">Variability</th>
                    <th className="py-3 px-3">Reliability</th>
                    <th className="py-3 px-3">Est. Cost</th>
                    <th className="py-3 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                  {DEMO_ROUTE_MATRIX.map((row) => {
                    let varBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                    if (row.variability === 'Medium') varBadge = 'bg-amber-100 text-amber-900 border-amber-300';
                    if (row.variability === 'High') varBadge = 'bg-red-100 text-red-700 border-red-300';

                    let dotColor = 'bg-emerald-500';
                    if (row.status === 'Delayed') dotColor = 'bg-amber-500';
                    if (row.status === 'Blocked') dotColor = 'bg-red-500';

                    return (
                      <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-3 font-extrabold text-slate-900">{row.routeName}</td>
                        <td className="py-3.5 px-3 font-mono font-bold">{row.avgTimeHours}h</td>
                        <td className="py-3.5 px-3">
                          <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded border ${varBadge}`}>
                            {row.variability}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold">{row.reliabilityPct}%</td>
                        <td className="py-3.5 px-3 font-mono font-semibold text-slate-700">
                          ETB {row.estCostEtbPerTon.toLocaleString()}/ton
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <span className="inline-flex items-center gap-1.5 font-bold text-slate-700 text-xs">
                            <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Route Bottlenecks Card matching Stitch Image 4 */}
          <div className="lg:col-span-5 foodflow-card p-5 bg-white space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <AlertTriangle className="w-4 h-4 text-[#7C4A21]" />
              <h3 className="font-bold text-sm text-slate-900 tracking-tight">Route Bottlenecks</h3>
            </div>

            <div className="space-y-4">
              {/* Alert 1 */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 relative">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900">Construction on Route A1</span>
                  <Wrench className="w-4 h-4 text-amber-700" />
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  Major resurfacing near Sodo junction impacting heavy truck flow.
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-900 text-[11px] font-mono font-extrabold rounded border border-amber-300">
                  <Clock className="w-3 h-3" />
                  <span>Expected Delay: +45m</span>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="p-4 bg-red-50/70 border border-red-200 rounded-xl space-y-2 relative">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900">Bridge Repair B4</span>
                  <Building className="w-4 h-4 text-red-700" />
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  Weight restrictions applied. Max capacity reduced to 15 tons.
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-800 text-[11px] font-mono font-extrabold rounded border border-red-300">
                  <ShieldAlert className="w-3 h-3" />
                  <span>Reroute Required for Heavies</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Gamo Logistics Corridors Map (Left 7) & Alternative Route Analysis (Right 5) matching Stitch Image 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* GIS Map */}
          <div className="lg:col-span-7 foodflow-card p-4 bg-white flex flex-col h-[360px]">
            <div className="border-b border-slate-100 pb-2 mb-2 flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                Gamo Logistics Corridors
              </span>
              <span className="text-[11px] font-mono text-slate-400">GIS Layer Active</span>
            </div>
            <div className="flex-1">
              <BottleneckMap bottlenecks={DEMO_LOGISTICS_BOTTLENECK} />
            </div>
          </div>

          {/* Alternative Route Comparison */}
          <div className="lg:col-span-5">
            <AlternativeRouteComparison data={DEMO_ALTERNATIVE_ROUTE_DATA} />
          </div>
        </div>
      </div>

      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </AppShell>
  );
}
