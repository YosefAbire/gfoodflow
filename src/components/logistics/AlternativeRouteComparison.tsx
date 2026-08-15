'use client';

import React from 'react';
import { Truck, GitFork, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { AlternativeRouteData } from '@/types';

interface AlternativeRouteComparisonProps {
  data: AlternativeRouteData;
}

export function AlternativeRouteComparison({ data }: AlternativeRouteComparisonProps) {
  return (
    <div className="foodflow-card p-5 bg-white space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <GitFork className="w-4 h-4 text-[#155D3B]" />
          <h3 className="font-bold text-sm text-slate-900 tracking-tight">Alternative Route Analysis</h3>
        </div>
        <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
          {data.corridorName}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Primary Route */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 relative">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-slate-500" />
              Primary Route
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 rounded border border-emerald-300">
              Optimal
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Distance</span>
              <span className="font-mono font-extrabold text-slate-900 text-sm">{data.primaryRoute.distanceKm} km</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Est. Travel Time</span>
              <span className="font-mono font-extrabold text-slate-900 text-sm">{data.primaryRoute.estTravelTime}</span>
            </div>

            <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
              <span className="text-slate-500 font-medium">Risk Profile</span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded">
                {data.primaryRoute.riskProfile}
              </span>
            </div>
          </div>
        </div>

        {/* Alternative Route (Bypass) */}
        <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 space-y-3 relative">
          <div className="flex items-center justify-between border-b border-amber-200 pb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              Alternative Route (Bypass)
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-100 text-amber-900 rounded border border-amber-300">
              Detour
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-amber-800 font-medium">Distance</span>
              <span className="font-mono font-extrabold text-slate-900 text-sm">{data.alternativeRoute.distanceKm} km</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-amber-800 font-medium">Est. Travel Time</span>
              <span className="font-mono font-extrabold text-slate-900 text-sm">{data.alternativeRoute.estTravelTime}</span>
            </div>

            <div className="flex justify-between items-center pt-1 border-t border-amber-200">
              <span className="text-amber-800 font-medium">Risk Profile</span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-red-100 text-red-800 rounded border border-red-300">
                {data.alternativeRoute.riskProfile}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
