'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';
import { Sprout } from 'lucide-react';

export default function SupplyProductionPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Crop Production Output</h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Seasonal harvest yields and crop production telemetry in Gamo.
          </p>
        </div>

        <div className="foodflow-card p-6 bg-white space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">Production Metrics</h3>
          <p className="text-xs text-slate-600">Total estimated output for August 2026 cycle is 5,490 tons across Maize, Banana, Mango, Enset, and Wheat.</p>
        </div>
      </div>
    </AppShell>
  );
}
