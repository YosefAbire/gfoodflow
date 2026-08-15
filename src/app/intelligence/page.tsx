'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AIInsightCard } from '@/components/intelligence/AIInsightCard';
import { ZoneBRiskExplanationTable } from '@/components/intelligence/ZoneBRiskExplanationTable';
import { ScenarioSimulator } from '@/components/intelligence/ScenarioSimulator';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';

export default function IntelligencePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header matching Image 2 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-900">Intelligence</h1>
              <DemoDataBadge />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              AI decision-support and scenario simulation.
            </p>
          </div>
        </div>

        {/* 2-Column Main Layout matching Image 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Risk Report & Breakdown Table */}
          <div className="lg:col-span-7 space-y-6">
            <AIInsightCard />
            <ZoneBRiskExplanationTable />
          </div>

          {/* Right Column: Scenario Simulator Sidebar */}
          <div className="lg:col-span-5">
            <ScenarioSimulator />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
