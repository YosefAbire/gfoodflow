'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { LogisticsSubNav } from '@/components/logistics/LogisticsSubNav';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';
import { ExportReportModal } from '@/components/modals/ExportReportModal';
import { AllocateCapacityModal } from '@/components/modals/AllocateCapacityModal';
import { DemandVsCapacityChart } from '@/components/charts/DemandVsCapacityChart';
import {
  DEMO_CAPACITY_DEMAND_AREAS,
  DEMO_CAPACITY_BOTTLENECK_ALERTS,
  DEMO_DEMAND_VS_CAPACITY_TIME_SERIES,
} from '@/data/logisticsData';
import {
  Truck,
  CheckCircle2,
  Hourglass,
  Download,
  Plus,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  Filter,
} from 'lucide-react';

export default function LogisticsCapacityPage() {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isAllocateOpen, setIsAllocateOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('All Regions');

  const filteredAreas =
    selectedRegion === 'All Regions'
      ? DEMO_CAPACITY_DEMAND_AREAS
      : DEMO_CAPACITY_DEMAND_AREAS.filter((a) => a.origin === selectedRegion);

  return (
    <AppShell>
      <div className="space-y-6">
        <LogisticsSubNav />

        {/* Header & Primary Actions matching Stitch Image 1 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Transport Demand & Capacity
              </h1>
              <DemoDataBadge />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Real-time intelligence on transport logistics and capacity matching.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExportOpen(true)}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs rounded-lg shadow-2xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>

            <button
              onClick={() => setIsAllocateOpen(true)}
              className="px-4 py-2 bg-[#09281C] hover:bg-[#144A35] text-white font-extrabold text-xs rounded-lg shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Allocate Capacity</span>
            </button>
          </div>
        </div>

        {/* Top 3 KPI Cards matching Stitch Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Total Capacity Card */}
          <div className="foodflow-card p-5 bg-white space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-slate-400" />
                Total Capacity
              </span>
              <Truck className="w-8 h-8 text-slate-200 stroke-[1.5]" />
            </div>

            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                1,200 <span className="text-sm font-semibold text-slate-500">tons</span>
              </div>
              <div className="text-xs font-semibold text-emerald-600 mt-1">
                📈 +5.2% vs last week
              </div>
            </div>
          </div>

          {/* Assigned Capacity Card */}
          <div className="foodflow-card p-5 bg-white space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-slate-400" />
                Assigned
              </span>
              <CheckCircle2 className="w-8 h-8 text-slate-200 stroke-[1.5]" />
            </div>

            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                850 <span className="text-sm font-semibold text-slate-500">tons</span>
              </div>
              <div className="mt-2 space-y-1">
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-[#09281C] h-2 rounded-full" style={{ width: '70.8%' }} />
                </div>
                <div className="text-right text-[11px] font-mono font-bold text-slate-500">70.8%</div>
              </div>
            </div>
          </div>

          {/* Idle Capacity Card */}
          <div className="foodflow-card p-5 bg-white space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Hourglass className="w-4 h-4 text-slate-400" />
                Idle
              </span>
              <Hourglass className="w-8 h-8 text-slate-200 stroke-[1.5]" />
            </div>

            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                350 <span className="text-sm font-semibold text-slate-500">tons</span>
              </div>
              <div className="text-xs font-semibold text-amber-700 mt-2 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Approaching inefficiency threshold</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Chart (Left 7) & Capacity Bottlenecks (Right 5) matching Stitch Image 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart Card */}
          <div className="lg:col-span-8 foodflow-card p-5 bg-white">
            <DemandVsCapacityChart data={DEMO_DEMAND_VS_CAPACITY_TIME_SERIES} />
          </div>

          {/* Capacity Bottlenecks Alerts Box matching Stitch Image 1 */}
          <div className="lg:col-span-4 foodflow-card p-5 bg-white space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-sm text-slate-900 tracking-tight">Capacity Bottlenecks</h3>
            </div>

            <div className="space-y-4">
              {DEMO_CAPACITY_BOTTLENECK_ALERTS.map((alert) => {
                const isHigh = alert.severity === 'HIGH ALERT';
                return (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-xl border ${
                      isHigh
                        ? 'bg-amber-50/60 border-amber-200 border-l-4 border-l-[#7C4A21]'
                        : 'bg-slate-50 border-slate-200'
                    } space-y-2.5`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-extrabold uppercase rounded ${
                          isHigh ? 'bg-amber-200 text-amber-900' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {alert.severity}
                      </span>
                      <span className="text-[11px] font-mono font-medium text-slate-500">
                        {alert.outlookText}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-xs text-slate-900">{alert.title}</h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {alert.description}
                    </p>

                    <button
                      onClick={() => setIsAllocateOpen(true)}
                      className="text-xs font-extrabold text-[#7C4A21] hover:underline flex items-center gap-1.5 cursor-pointer pt-1"
                    >
                      <span>{alert.actionLabel}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section: Top Transport Demand Areas Table matching Stitch Image 1 */}
        <div className="foodflow-card p-5 bg-white space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">
              Top Transport Demand Areas
            </h3>

            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="pl-3 pr-8 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 cursor-pointer focus:ring-2 focus:ring-[#155D3B]"
              >
                <option value="All Regions">All Regions</option>
                <option value="Chencha">Chencha</option>
                <option value="Arba Minch">Arba Minch</option>
                <option value="Hawassa">Hawassa</option>
                <option value="Sodo">Sodo</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Origin</th>
                  <th className="py-3 px-3">Commodity</th>
                  <th className="py-3 px-3">Expected Volume</th>
                  <th className="py-3 px-3">Required Capacity</th>
                  <th className="py-3 px-3">Capacity Gap</th>
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                {filteredAreas.map((row) => {
                  let gapColor = 'text-slate-900';
                  let statusBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';

                  if (row.status === 'SHORTAGE') {
                    gapColor = 'text-red-600';
                    statusBadge = 'bg-red-100 text-red-700 border-red-300';
                  } else if (row.status === 'CRITICAL') {
                    gapColor = 'text-red-700';
                    statusBadge = 'bg-red-200 text-red-900 border-red-400';
                  } else if (row.status === 'SURPLUS') {
                    gapColor = 'text-amber-700';
                    statusBadge = 'bg-amber-100 text-amber-900 border-amber-300';
                  }

                  return (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        {row.origin}
                      </td>
                      <td className="py-3.5 px-3 text-slate-700">{row.commodity}</td>
                      <td className="py-3.5 px-3 font-mono font-bold">{row.expectedVolumeTons} tons</td>
                      <td className="py-3.5 px-3 font-mono font-bold">{row.requiredCapacityTrucks} trucks</td>
                      <td className={`py-3.5 px-3 font-mono font-extrabold ${gapColor}`}>
                        {row.capacityGapTrucks > 0 ? `+${row.capacityGapTrucks}` : row.capacityGapTrucks} truck{Math.abs(row.capacityGapTrucks) !== 1 ? 's' : ''}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <span className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded border ${statusBadge}`}>
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
      </div>

      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
      <AllocateCapacityModal isOpen={isAllocateOpen} onClose={() => setIsAllocateOpen(false)} />
    </AppShell>
  );
}
