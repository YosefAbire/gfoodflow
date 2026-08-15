'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { LogisticsSubNav } from '@/components/logistics/LogisticsSubNav';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';
import { ExportReportModal } from '@/components/modals/ExportReportModal';
import { SystemicImpactFlowDiagram } from '@/components/logistics/SystemicImpactFlowDiagram';
import {
  DEMO_LOGISTICS_RISKS,
  DEMO_LOGISTICS_OPPORTUNITIES,
} from '@/data/logisticsData';
import {
  ShieldAlert,
  AlertOctagon,
  Clock,
  Download,
  Lightbulb,
  ArrowRight,
  TrendingDown,
  ChevronRight,
  Package,
} from 'lucide-react';

export default function LogisticsVehiclesRiskPage() {
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <AppShell>
      <div className="space-y-6">
        <LogisticsSubNav />

        {/* Header & Primary Actions matching Stitch Image 5 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Logistics Risk & Opportunities
              </h1>
              <DemoDataBadge />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Real-time network analysis identifying bottlenecks and capacity optimizations across Gamo regional routes.
            </p>
          </div>

          <button
            onClick={() => setIsExportOpen(true)}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs rounded-lg shadow-2xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>

        {/* Top Section: Logistics Risk Overview Table (Left 7) & Emerging Risks (Right 5) matching Stitch Image 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Logistics Risk Overview Table */}
          <div className="lg:col-span-7 foodflow-card p-5 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <h3 className="font-bold text-sm text-slate-900 tracking-tight">
                  Logistics Risk Overview
                </h3>
              </div>

              {/* Legend matching Stitch Image 5 */}
              <div className="flex items-center gap-3 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  <span className="text-[11px] text-slate-600">Critical</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                  <span className="text-[11px] text-slate-600">High</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="text-[11px] text-slate-600">Low</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Route Origin → Destination</th>
                    <th className="py-3 px-3">Volume (Tons)</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Risk Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                  {DEMO_LOGISTICS_RISKS.map((row) => {
                    let statusBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                    let scoreColor = 'text-slate-900';

                    if (row.statusSeverity === 'Critical') {
                      statusBadge = 'bg-red-100 text-red-700 border-red-300';
                      scoreColor = 'text-red-600 font-extrabold';
                    } else if (row.statusSeverity === 'High') {
                      statusBadge = 'bg-amber-100 text-amber-900 border-amber-300';
                      scoreColor = 'text-amber-700 font-extrabold';
                    }

                    return (
                      <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-3 font-extrabold text-slate-900">
                          {row.routeOriginDestination}
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-slate-700">
                          {row.volumeTons}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded border ${statusBadge}`}>
                            {row.statusText}
                          </span>
                        </td>
                        <td className={`py-3.5 px-3 text-right font-mono text-sm ${scoreColor}`}>
                          {row.riskScore}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Emerging Risks Box matching Stitch Image 5 */}
          <div className="lg:col-span-5 foodflow-card p-5 bg-white space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <AlertOctagon className="w-4 h-4 text-red-600" />
              <h3 className="font-bold text-sm text-slate-900 tracking-tight">Emerging Risks</h3>
            </div>

            <div className="space-y-4">
              {/* Risk Alert 1 */}
              <div className="p-4 bg-red-50/70 border border-red-200 rounded-xl space-y-2 relative">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs uppercase tracking-wider text-red-800 flex items-center gap-1.5">
                    <AlertOctagon className="w-4 h-4 text-red-600" />
                    High Risk Alert
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-medium">Just Now</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 leading-snug">
                  Route capacity shortage detected in Collection Zone A affecting Fresh Vegetables transport.
                </h4>
                <div className="p-2.5 bg-white/80 rounded-lg border border-red-100 text-[11px] text-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 text-[10px] uppercase">Potential Impact:</div>
                  <p className="leading-relaxed">
                    Delayed market entry causing estimated 15% spoilage risk. Recommend immediate spot-market truck procurement.
                  </p>
                </div>
              </div>

              {/* Risk Alert 2 */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 relative">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-700" />
                    Moderate Risk
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-medium">- 2 hrs</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 leading-snug">
                  Border crossing delays on Southern Corridor extending transit times by 4+ hours.
                </h4>
                <div className="p-2.5 bg-white/80 rounded-lg border border-amber-100 text-[11px] text-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 text-[10px] uppercase">Potential Impact:</div>
                  <p className="leading-relaxed">
                    Cold chain integrity stress for dairy shipments. Monitor temperature logs continuously.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Logistics Opportunities (Left 6) & Systemic Impact Flow (Right 6) matching Stitch Image 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Logistics Opportunities Card */}
          <div className="lg:col-span-6 foodflow-card p-5 bg-white space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Lightbulb className="w-4 h-4 text-[#7C4A21]" />
              <h3 className="font-bold text-sm text-slate-900 tracking-tight">
                Logistics Opportunities
              </h3>
            </div>

            <div className="space-y-4">
              {DEMO_LOGISTICS_OPPORTUNITIES.map((opp) => (
                <div key={opp.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-xs text-slate-900">{opp.title}</h4>
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded border border-emerald-300">
                      {opp.badgeText}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {opp.description}
                  </p>

                  <button
                    onClick={() => alert(`Executing: ${opp.suggestedAction}`)}
                    className="text-xs font-extrabold text-[#155D3B] hover:underline flex items-center gap-1.5 cursor-pointer pt-1"
                  >
                    <span>{opp.suggestedAction}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Systemic Impact Flow Diagram */}
          <div className="lg:col-span-6">
            <SystemicImpactFlowDiagram />
          </div>
        </div>
      </div>

      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </AppShell>
  );
}
