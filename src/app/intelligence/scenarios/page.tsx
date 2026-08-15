'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { ScenarioSimulator } from '@/components/intelligence/ScenarioSimulator';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';
import { Play } from 'lucide-react';

export default function ScenariosPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                <Play className="w-6 h-6 text-[#155D3B]" />
                Scenario Simulator
              </h1>
              <DemoDataBadge />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Simulate harvest surges, transport shortages, fuel costs, and route disruptions across Gamo.
            </p>
          </div>
        </div>

        <ScenarioSimulator />
      </div>
    </AppShell>
  );
}
