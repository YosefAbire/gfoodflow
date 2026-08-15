'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { DEMO_AI_INSIGHTS } from '@/data/intelligenceData';
import { AIInsightCard } from '@/components/intelligence/AIInsightCard';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';

export default function NetworkRisksPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Spatial Risk Areas</h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Geographic bottleneck and supply loss risk areas in Gamo.
          </p>
        </div>

        <div className="space-y-4">
          {DEMO_AI_INSIGHTS.map((insight) => (
            <AIInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
