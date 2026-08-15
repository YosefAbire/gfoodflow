'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { DEMO_MARKET_OPPORTUNITIES } from '@/data/marketData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';

export default function MarketOpportunitiesPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Highest Margin Market Opportunities</h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Algorithmic crop-market matching to maximize farmer income and eliminate regional supply deficits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_MARKET_OPPORTUNITIES.map((opp) => (
            <div key={opp.id} className="foodflow-card p-5 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-900">{opp.crop} → {opp.targetNode}</h3>
                <StatusBadge status={opp.badgeLabel} />
              </div>
              <div className="text-xs text-slate-600">Opportunity Score: <strong className="text-slate-900 font-mono">{opp.opportunityScore} / 100</strong></div>
              <div className="text-xs text-emerald-700 font-bold">Margin Potential: {opp.marginPotential}</div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
