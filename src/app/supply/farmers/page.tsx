'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';
import { Users, Sprout, MapPin } from 'lucide-react';

export default function SupplyFarmersPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Smallholder Farmer Clusters</h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Registered smallholder farmer groups and cooperatives providing agricultural supply data in Gamo.
          </p>
        </div>

        <div className="foodflow-card p-6 bg-white space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">Primary Farmer Unions & Clusters</h3>
            <span className="text-xs text-slate-400 font-medium">12,480 Total Farmers</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Cluster Name</th>
                  <th className="py-2.5 px-3">Woreda / Region</th>
                  <th className="py-2.5 px-3">Farmer Count</th>
                  <th className="py-2.5 px-3">Main Crops</th>
                  <th className="py-2.5 px-3">Avg Land Area</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {[
                  { name: 'Arba Minch Zuria Union', region: 'South Gamo', farmers: '3,840', crops: 'Maize, Banana, Mango', land: '1.2 ha / farmer' },
                  { name: 'Mirab Abaya Producer Coop', region: 'Central Gamo', farmers: '2,950', crops: 'Banana, Maize', land: '1.5 ha / farmer' },
                  { name: 'Chencha Highland Growers', region: 'North Gamo', farmers: '2,120', crops: 'Enset, Wheat', land: '0.8 ha / farmer' },
                  { name: 'Bonke Foothills Association', region: 'South-West Gamo', farmers: '1,780', crops: 'Maize, Coffee', land: '1.1 ha / farmer' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-slate-900">{row.name}</td>
                    <td className="py-3 px-3 text-slate-600">{row.region}</td>
                    <td className="py-3 px-3 font-mono font-bold text-[#155D3B]">{row.farmers}</td>
                    <td className="py-3 px-3">{row.crops}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">{row.land}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
