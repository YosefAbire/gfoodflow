'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { InteractiveNetworkMap } from '@/components/maps/InteractiveNetworkMap';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';
import { NewTransportRequestModal } from '@/components/modals/NewTransportRequestModal';
import { networkService } from '@/services/networkService';
import { NetworkZone } from '@/types';
import { Users, Sprout, Truck, Building2, ShieldAlert, ArrowRight, X, Play } from 'lucide-react';
import Link from 'next/link';

export default function NetworkPage() {
  const [zones, setZones] = useState<NetworkZone[]>([]);
  const [selectedZone, setSelectedZone] = useState<NetworkZone | null>(null);
  const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await networkService.getNetworkZones();
      setZones(data);
      if (data.length > 0) {
        setSelectedZone(data[0]); // Select Zone A by default
      }
    }
    load();
  }, []);

  return (
    <AppShell>
      <div className="space-y-4 h-[calc(100vh-6rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Food System Network</h1>
              <DemoDataBadge />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Spatial interaction topology connecting Gamo farm clusters, collection centers, routes, and markets.
            </p>
          </div>
        </div>

        {/* Full-Screen Map Container with Side Drawer */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 relative">
          {/* Main Map */}
          <div className="lg:col-span-8 h-full rounded-xl overflow-hidden shadow-2xs border border-slate-200">
            <InteractiveNetworkMap
              zones={zones}
              selectedZone={selectedZone}
              onSelectZone={(zone) => setSelectedZone(zone)}
            />
          </div>

          {/* Selected Zone Side Panel / Drawer matching Image 1 */}
          <div className="lg:col-span-4 h-full foodflow-card p-6 bg-white overflow-y-auto space-y-6 flex flex-col justify-between border border-slate-200 rounded-xl shadow-xs">
            {selectedZone ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8B5E3C]">ACTIVE SELECTION</span>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">{selectedZone.name}</h2>
                  </div>
                  {selectedZone && (
                    <button
                      onClick={() => setSelectedZone(null)}
                      className="text-slate-400 hover:text-slate-600 p-1 transition-colors"
                      title="Close Selection"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Risk Warning Badge */}
                <div className="flex items-center gap-2 p-2.5 bg-red-50/80 border border-red-200 rounded-lg text-xs font-semibold text-red-700">
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Transport Shortage Expected</span>
                </div>

                {/* Key Zone Metrics Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                    <div className="text-[11px] font-semibold text-slate-500">Farmers</div>
                    <div className="text-2xl font-extrabold text-slate-900 mt-1">
                      {selectedZone.farmersCount || 842}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                    <div className="text-[11px] font-semibold text-slate-500">Harvest</div>
                    <div className="text-2xl font-extrabold text-slate-900 mt-1">
                      {selectedZone.expectedHarvestTons ? `${selectedZone.expectedHarvestTons}t` : '640t'}
                    </div>
                  </div>
                </div>

                {/* Top Crop */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">Top Crop</span>
                  <span className="text-xs font-extrabold text-slate-900">
                    {selectedZone.mainCrops?.[0] || 'Maize'}
                  </span>
                </div>

                {/* Transport Gap Red Highlight Box */}
                <div className="p-4 bg-red-50/50 border border-red-200 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-red-700">Transport Gap</span>
                  <span className="text-2xl font-black text-red-600 font-mono tracking-tight">-9 vehicles</span>
                </div>

                {/* Quick Operational Actions */}
                <div className="pt-2 space-y-2.5">
                  <button
                    onClick={() => setIsTransportModalOpen(true)}
                    className="w-full py-3 bg-[#0F382C] hover:bg-[#09281C] text-white text-xs font-extrabold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Create Transport Plan</span>
                  </button>

                  <Link
                    href="/intelligence"
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-extrabold rounded-lg border border-slate-200 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Analyze Zone</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs font-medium">
                Click any zone or aggregation hub marker on the map to inspect spatial intelligence details.
              </div>
            )}

            <div className="text-[10px] text-slate-400 font-medium text-center border-t border-slate-100 pt-3">
              Gamo Regional Spatial Database • Coordinate System: WGS 84
            </div>
          </div>
        </div>
      </div>

      <NewTransportRequestModal
        isOpen={isTransportModalOpen}
        onClose={() => setIsTransportModalOpen(false)}
      />
    </AppShell>
  );
}
