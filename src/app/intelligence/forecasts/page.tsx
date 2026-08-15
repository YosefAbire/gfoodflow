'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { HarvestForecastChart } from '@/components/charts/HarvestForecastChart';
import { DEMO_HARVEST_FORECAST } from '@/data/supplyData';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';

export default function ForecastsSubRoute() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Machine Learning Yield Forecasts</h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            4-week forward crop yield predictions for Gamo agricultural zones.
          </p>
        </div>

        <div className="foodflow-card p-6 bg-white space-y-4">
          <HarvestForecastChart data={DEMO_HARVEST_FORECAST} />
        </div>
      </div>
    </AppShell>
  );
}
