'use client';

import React from 'react';
import { HelpCircle, TrendingUp, AlertTriangle, Truck } from 'lucide-react';

export function ZoneBRiskExplanationTable() {
  return (
    <div className="foodflow-card p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <HelpCircle className="w-4 h-4 text-slate-500" />
        <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
          Why is Zone B at risk?
        </h3>
      </div>

      {/* Narrative Explanation */}
      <p className="text-xs text-slate-600 font-medium leading-relaxed">
        Analysis indicates a critical bottleneck emerging in Zone B logistics. The correlation between a{' '}
        <strong className="text-slate-900 font-bold">22% surge in projected harvest yield</strong> over the next 72 hours and an{' '}
        <strong className="text-red-600 font-bold">unexpected 15% drop in available fleet capacity</strong> (due to ongoing maintenance schedules) creates a significant deficit.
      </p>

      {/* Metric Table matching Image 2 */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3">Metric</th>
              <th className="py-2.5 px-3">Current</th>
              <th className="py-2.5 px-3">Projected (72h)</th>
              <th className="py-2.5 px-3">Variance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            <tr className="hover:bg-slate-50/50">
              <td className="py-2.5 px-3 font-bold text-slate-900">Harvest Yield (Tons)</td>
              <td className="py-2.5 px-3 font-mono">1,240</td>
              <td className="py-2.5 px-3 font-mono text-red-600 font-bold">1,510</td>
              <td className="py-2.5 px-3 text-emerald-700 font-bold">+21.7%</td>
            </tr>

            <tr className="hover:bg-slate-50/50">
              <td className="py-2.5 px-3 font-bold text-slate-900">Available Fleet</td>
              <td className="py-2.5 px-3 font-mono">42 units</td>
              <td className="py-2.5 px-3 font-mono text-red-600 font-bold">36 units</td>
              <td className="py-2.5 px-3 text-red-600 font-bold">-14.2%</td>
            </tr>

            <tr className="bg-red-50/20">
              <td className="py-2.5 px-3 font-bold text-slate-900">Capacity Deficit</td>
              <td className="py-2.5 px-3 font-mono">0 tons</td>
              <td className="py-2.5 px-3 font-mono text-red-600 font-bold">270 tons</td>
              <td className="py-2.5 px-3">
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-red-100 text-red-700 rounded border border-red-200 uppercase">
                  Critical
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
