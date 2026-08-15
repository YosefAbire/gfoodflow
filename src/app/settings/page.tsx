'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';
import { Settings, Bell, Database, Shield, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Platform Settings</h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Configure system parameters, AI threshold alerts, GIS map layers, and user permissions for Gamo FoodFlow.
          </p>
        </div>

        <div className="max-w-3xl foodflow-card p-6 bg-white space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              AI Risk Thresholds
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1">Transport Deficit Alert Sensitivity</label>
                <select className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2 font-medium">
                  <option>High Sensitivity (&gt; 25 tons gap)</option>
                  <option>Medium Sensitivity (&gt; 50 tons gap)</option>
                  <option>Low Sensitivity (&gt; 100 tons gap)</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Price Volatility Spike Threshold</label>
                <select className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2 font-medium">
                  <option>+15% Margin Expansion</option>
                  <option>+20% Margin Expansion</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Data Synchronization
            </h3>

            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <div>
                <div>Automatic Telemetry Sync</div>
                <div className="text-[10px] text-slate-400 font-normal">Sync collection center scale sensors & GPS trucks</div>
              </div>
              <input type="checkbox" defaultChecked className="rounded text-[#155D3B]" />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
