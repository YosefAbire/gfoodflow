'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { LogisticsSubNav } from '@/components/logistics/LogisticsSubNav';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';
import { ExportReportModal } from '@/components/modals/ExportReportModal';
import { NewShipmentModal } from '@/components/modals/NewShipmentModal';
import { TimeSensitiveShipmentInspector } from '@/components/logistics/TimeSensitiveShipmentInspector';
import { DEMO_DETAILED_SHIPMENTS } from '@/data/logisticsData';
import {
  Truck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  Plus,
  BrainCircuit,
  Filter,
  MoreVertical,
  ArrowRight,
  Package,
} from 'lucide-react';
import Link from 'next/link';

export default function ShipmentIntelligencePage() {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isNewShipmentOpen, setIsNewShipmentOpen] = useState(false);
  const [selectedShipmentId, setSelectedShipmentId] = useState('SH-504');

  const selectedShipment =
    DEMO_DETAILED_SHIPMENTS.find((s) => s.id === selectedShipmentId) ||
    DEMO_DETAILED_SHIPMENTS[1];

  return (
    <AppShell>
      <div className="space-y-6">
        <LogisticsSubNav />

        {/* Header & Primary Actions matching Stitch Image 3 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Shipment Intelligence
              </h1>
              <DemoDataBadge />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Real-time monitoring and coordination of agricultural logistics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExportOpen(true)}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs rounded-lg shadow-2xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Data</span>
            </button>

            <button
              onClick={() => setIsNewShipmentOpen(true)}
              className="px-4 py-2 bg-[#09281C] hover:bg-[#144A35] text-white font-extrabold text-xs rounded-lg shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New Shipment</span>
            </button>
          </div>
        </div>

        {/* Intelligence Insight Banner matching Stitch Image 3 */}
        <div className="foodflow-card p-4 bg-amber-50/70 border-amber-200 border-l-4 border-l-[#7C4A21] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-[#7C4A21] flex items-center justify-center shrink-0">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-900 uppercase">Intelligence Insight</span>
                <span className="w-2 h-2 rounded-full bg-[#7C4A21]" />
              </div>
              <p className="text-xs text-slate-700 font-medium mt-0.5 leading-snug">
                3 shipments of fresh produce are approaching high-traffic zones; <strong className="font-bold text-[#7C4A21]">priority routing recommended</strong> to preserve cargo integrity.
              </p>
            </div>
          </div>

          <Link
            href="/logistics/routes"
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-[#7C4A21] text-[#7C4A21] text-xs font-extrabold rounded-lg shadow-2xs shrink-0 flex items-center gap-1.5 transition-colors"
          >
            <span>Review Routes</span>
          </Link>
        </div>

        {/* Top 4 Stat Cards matching Stitch Image 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: In Transit */}
          <div className="foodflow-card p-5 bg-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">In Transit</span>
              <Truck className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">28</div>
            <p className="text-xs text-slate-400 font-medium">Active global network</p>
          </div>

          {/* Card 2: On Time */}
          <div className="foodflow-card p-5 bg-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">On Time</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">22</div>
            <p className="text-xs text-emerald-600 font-semibold">+12% from last week</p>
          </div>

          {/* Card 3: At Risk */}
          <div className="foodflow-card p-5 bg-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">At Risk</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-[#7C4A21] tracking-tight">4</div>
            <p className="text-xs text-[#7C4A21] font-semibold">Action required</p>
          </div>

          {/* Card 4: Delayed */}
          <div className="foodflow-card p-5 bg-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Delayed</span>
              <Clock className="w-4 h-4 text-red-600" />
            </div>
            <div className="text-3xl font-extrabold text-red-600 tracking-tight">2</div>
            <p className="text-xs text-red-600 font-semibold">Requires immediate routing</p>
          </div>
        </div>

        {/* Bottom Section: Active Agricultural Shipments Table (Left 7) & Inspector (Right 5) matching Stitch Image 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Agricultural Shipments Table */}
          <div className="lg:col-span-7 foodflow-card p-5 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#155D3B]" />
                <h3 className="font-bold text-sm text-slate-900 tracking-tight">
                  Active Agricultural Shipments
                </h3>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <button className="p-1 hover:text-slate-700 rounded cursor-pointer">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-1 hover:text-slate-700 rounded cursor-pointer">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Shipment ID</th>
                    <th className="py-3 px-3">Commodity</th>
                    <th className="py-3 px-3">Route</th>
                    <th className="py-3 px-3">Volume</th>
                    <th className="py-3 px-3">Transporter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                  {DEMO_DETAILED_SHIPMENTS.map((s) => {
                    const isSelected = s.id === selectedShipmentId;
                    return (
                      <tr
                        key={s.id}
                        onClick={() => setSelectedShipmentId(s.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-amber-50/60 font-bold' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-3.5 px-3 font-mono font-bold text-slate-600">{s.id}</td>
                        <td className="py-3.5 px-3 font-extrabold text-slate-900">{s.commodity}</td>
                        <td className="py-3.5 px-3 text-slate-600">{s.route}</td>
                        <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{s.volumeTons}t</td>
                        <td className="py-3.5 px-3 text-slate-700">{s.transporter}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Inspector Column matching Stitch Image 3 */}
          <div className="lg:col-span-5">
            <TimeSensitiveShipmentInspector
              shipment={selectedShipment}
              onOpenRouteOptions={() => alert(`Reviewing route options for ${selectedShipment.id}`)}
            />
          </div>
        </div>
      </div>

      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
      <NewShipmentModal isOpen={isNewShipmentOpen} onClose={() => setIsNewShipmentOpen(false)} />
    </AppShell>
  );
}
