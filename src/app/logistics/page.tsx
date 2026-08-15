'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { LogisticsSubNav } from '@/components/logistics/LogisticsSubNav';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ExportReportModal } from '@/components/modals/ExportReportModal';
import { AllocateCapacityModal } from '@/components/modals/AllocateCapacityModal';
import { InteractiveNetworkMap } from '@/components/maps/InteractiveNetworkMap';
import { TransportDemandChart } from '@/components/charts/TransportDemandChart';
import { logisticsService } from '@/services/logisticsService';
import { networkService } from '@/services/networkService';
import { RoutePerformance, TransportDemandPoint, NetworkZone } from '@/types';
import {
  Truck,
  AlertOctagon,
  Clock,
  AlertTriangle,
  ChevronRight,
  Download,
  MoreVertical,
  Layers,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';

export default function LogisticsPage() {
  const [routes, setRoutes] = useState<RoutePerformance[]>([]);
  const [demandForecast, setDemandForecast] = useState<TransportDemandPoint[]>([]);
  const [zones, setZones] = useState<NetworkZone[]>([]);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isAllocateOpen, setIsAllocateOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const [rData, dData, zData] = await Promise.all([
        logisticsService.getRoutePerformance(),
        logisticsService.getTransportDemand(),
        networkService.getNetworkZones(),
      ]);
      setRoutes(rData);
      setDemandForecast(dData);
      setZones(zData);
    }
    load();
  }, []);

  return (
    <AppShell>
      <div className="space-y-6">
        <LogisticsSubNav />

        {/* Header matching Stitch Image 2 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Logistics Intelligence</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Understand agricultural transportation demand, capacity, routes, bottlenecks, and logistics risks.
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

        {/* Top Stat Cards (6 Cards) matching Stitch Image 2 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Card 1 */}
          <div className="foodflow-card p-4 bg-white space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Active Shipments</span>
              <Truck className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">42</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">+5%</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="foodflow-card p-4 bg-white space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Available Cap.</span>
              <Truck className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">412 <span className="text-xs font-normal text-slate-500">tons</span></div>
          </div>

          {/* Card 3 */}
          <div className="foodflow-card p-4 bg-white space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Transport Demand</span>
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">486 <span className="text-xs font-normal text-slate-500">tons</span></div>
          </div>

          {/* Card 4 (Highlighted Red Gap Card matching Stitch Image 2) */}
          <div className="foodflow-card p-4 bg-red-50/80 border-red-300 border-l-4 border-l-red-600 space-y-2">
            <div className="flex items-center justify-between text-red-700">
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Capacity Gap</span>
              <AlertOctagon className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-extrabold text-red-700">-74 <span className="text-xs font-semibold text-red-600">tons</span></div>
          </div>

          {/* Card 5 */}
          <div className="foodflow-card p-4 bg-amber-50/60 border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-amber-800">
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Delayed</span>
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-extrabold text-amber-900">3</div>
          </div>

          {/* Card 6 */}
          <div className="foodflow-card p-4 bg-white space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">High-Risk Routes</span>
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">2</div>
          </div>
        </div>

        {/* Middle Section: Food Logistics Network Map (Left 7) & Alerts + Forecast (Right 5) matching Stitch Image 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Food Logistics Network Map */}
          <div className="lg:col-span-7 foodflow-card p-4 bg-white flex flex-col h-[520px]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#155D3B]" />
                  Food Logistics Network
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">Live routing and capacity visualization</p>
              </div>

              {/* Legend matching Stitch Image 2 */}
              <div className="flex items-center gap-3 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="text-[11px] text-slate-600">Normal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                  <span className="text-[11px] text-slate-600">Delayed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  <span className="text-[11px] text-slate-600">Blocked</span>
                </div>
              </div>
            </div>

            <div className="flex-1 rounded-xl overflow-hidden">
              <InteractiveNetworkMap
                zones={zones}
                onSelectZone={() => {}}
                selectedZone={null}
              />
            </div>
          </div>

          {/* Right Column: Logistics Alerts & Transportation Demand Forecast */}
          <div className="lg:col-span-5 space-y-6">
            {/* Logistics Alerts Box matching Stitch Image 2 */}
            <div className="foodflow-card p-4 bg-white space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <AlertTriangle className="w-4 h-4 text-[#7C4A21]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">Logistics Alerts</h3>
              </div>

              <div className="space-y-3">
                {/* Capacity Gap Alert */}
                <div className="p-3.5 bg-red-50/80 border border-red-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-red-700 font-bold text-xs">
                    <AlertOctagon className="w-4 h-4 shrink-0" />
                    <span>Capacity Gap Alert</span>
                  </div>
                  <p className="text-xs text-red-800 font-medium leading-relaxed">
                    Shortfall of 74 tons projected for Arba Minch Hub outbound routes tomorrow.
                  </p>
                  <button
                    onClick={() => setIsAllocateOpen(true)}
                    className="text-xs font-extrabold text-red-700 hover:underline flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <span>Re-allocate Assets</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Route Blockage Warning */}
                <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                    <Wrench className="w-4 h-4 shrink-0 text-amber-700" />
                    <span>Route Blockage Warning</span>
                  </div>
                  <p className="text-xs text-amber-900/90 font-medium leading-relaxed">
                    Southern transit route to South Market severely delayed due to infrastructure repair.
                  </p>
                </div>
              </div>
            </div>

            {/* Transportation Demand Forecast Chart matching Stitch Image 2 */}
            <div className="foodflow-card p-4 bg-white space-y-3">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  Transportation Demand Forecast
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">Expected vs Historical (Next 4 Weeks)</p>
              </div>

              <TransportDemandChart data={demandForecast} />
            </div>
          </div>
        </div>

        {/* Bottom Section: Route Performance Table matching Stitch Image 2 */}
        <div className="foodflow-card p-5 bg-white space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 tracking-tight">Route Performance</h3>
            <Link
              href="/logistics/routes"
              className="text-xs font-bold text-[#155D3B] hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Route Name</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Average Transit</th>
                  <th className="py-3 px-3">Reliability</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                {routes.map((route) => {
                  let statusBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                  let barColor = 'bg-[#09281C]';

                  if (route.riskLevel === 'Med Risk') {
                    statusBadge = 'bg-amber-100 text-amber-900 border-amber-300';
                    barColor = 'bg-[#7C4A21]';
                  } else if (route.riskLevel === 'High Risk') {
                    statusBadge = 'bg-red-100 text-red-700 border-red-300';
                    barColor = 'bg-red-600';
                  }

                  return (
                    <tr key={route.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-3 font-extrabold text-slate-900">{route.routeName}</td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded border ${statusBadge}`}>
                          {route.riskLevel === 'Low Risk' ? 'Active' : route.riskLevel === 'Med Risk' ? 'Delayed' : 'Blocked'}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-extrabold">
                        {route.avgTransitHours} hrs{' '}
                        {route.transitDelta && <span className="text-red-600 font-semibold text-[11px]">({route.transitDelta})</span>}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3 w-44">
                          <span className="font-mono font-bold text-slate-900 w-8">{route.reliabilityPercentage}%</span>
                          <div className="flex-1 bg-slate-100 rounded-full h-2">
                            <div className={`${barColor} h-2 rounded-full`} style={{ width: `${route.reliabilityPercentage}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-right text-slate-400">
                        <button className="p-1 hover:text-slate-700 rounded transition-colors cursor-pointer">
                          <MoreVertical className="w-4 h-4" />
                        </button>
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
