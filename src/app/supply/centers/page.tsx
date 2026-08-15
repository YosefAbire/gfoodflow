'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { DEMO_COLLECTION_CENTERS } from '@/data/supplyData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';

export default function SupplyCentersPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Collection Centers & Aggregation Facilities</h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Capacity utilization and stock telemetry for Gamo aggregation centers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_COLLECTION_CENTERS.map((c) => (
            <div key={c.id} className="foodflow-card p-5 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900">{c.name}</h3>
                <StatusBadge status={c.status} />
              </div>
              <div className="text-xs text-slate-600">Region: {c.region}</div>
              <div className="text-xs font-mono">
                Stock: {c.currentUtilizationTons}t / {c.capacityTons}t ({c.utilizationPercentage}% Utilization)
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    c.status === 'Critical' ? 'bg-red-600' : c.status === 'High' ? 'bg-amber-500' : 'bg-emerald-600'
                  }`}
                  style={{ width: `${c.utilizationPercentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
