'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { NetworkZone } from '@/types';
import { Layers } from 'lucide-react';

interface InteractiveNetworkMapProps {
  zones: NetworkZone[];
  onSelectZone: (zone: NetworkZone) => void;
  selectedZone: NetworkZone | null;
}

const InteractiveNetworkMapInner = dynamic(
  () => import('./InteractiveNetworkMapInner'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[500px] bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-sm font-bold text-slate-400">
        Initializing Gamo Food System Interactive GIS Canvas...
      </div>
    ),
  }
);

export function InteractiveNetworkMap({
  zones,
  onSelectZone,
}: InteractiveNetworkMapProps) {
  const [activeLayers, setActiveLayers] = useState({
    supply: true,
    aggregation: true,
    transport: true,
    market: true,
    risk: true,
  });

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden border border-slate-200 min-h-[550px] flex">
      {/* Floating Layer Control Bar */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg px-3 py-2 shadow-md flex items-center gap-3 text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Layers className="w-3.5 h-3.5 text-slate-600" />
          <span className="font-medium text-[11px]">Layers:</span>
        </div>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
          <input
            type="checkbox"
            checked={activeLayers.supply}
            onChange={(e) => setActiveLayers({ ...activeLayers, supply: e.target.checked })}
            className="rounded border-slate-300 text-[#0F382C] focus:ring-[#0F382C]"
          />
          <span>Crops</span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
          <input
            type="checkbox"
            checked={activeLayers.transport}
            onChange={(e) => setActiveLayers({ ...activeLayers, transport: e.target.checked })}
            className="rounded border-slate-300 text-[#0F382C] focus:ring-[#0F382C]"
          />
          <span>Logistics</span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
          <input
            type="checkbox"
            checked={activeLayers.risk}
            onChange={(e) => setActiveLayers({ ...activeLayers, risk: e.target.checked })}
            className="rounded border-slate-300 text-red-600 focus:ring-red-600"
          />
          <span>Risk</span>
        </label>
      </div>

      <InteractiveNetworkMapInner
        zones={zones}
        activeLayers={activeLayers}
        onSelectZone={onSelectZone}
      />
    </div>
  );
}
