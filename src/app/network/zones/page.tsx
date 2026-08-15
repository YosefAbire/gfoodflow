'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { DEMO_NETWORK_ZONES } from '@/data/networkData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';

export default function NetworkZonesPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Food System Supply Zones</h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Geographic zone breakdown across Gamo woredas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_NETWORK_ZONES.map((z) => (
            <div key={z.id} className="foodflow-card p-5 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900">{z.name}</h3>
                <StatusBadge status={z.riskRating} />
              </div>
              <div className="text-xs text-slate-600">Farmers: <strong className="font-mono">{z.farmersCount}</strong></div>
              <div className="text-xs text-slate-600">Harvest: <strong className="font-mono">{z.expectedHarvestTons} tons</strong></div>
              <div className="text-xs text-slate-500">Crops: {z.mainCrops.join(', ')}</div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
