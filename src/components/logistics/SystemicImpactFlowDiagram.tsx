'use client';

import React from 'react';
import { Tractor, Truck, Store, X, ChevronsRight } from 'lucide-react';

export function SystemicImpactFlowDiagram() {
  return (
    <div className="foodflow-card p-5 bg-white space-y-4">
      <div className="border-b border-slate-100 pb-2">
        <h3 className="font-bold text-sm text-slate-900 tracking-tight">Systemic Impact Flow</h3>
        <p className="text-[11px] text-slate-400 font-medium">
          Visualizing how logistics bottlenecks cascade across the value chain.
        </p>
      </div>

      <div className="py-6 flex flex-col md:flex-row items-center justify-around gap-6">
        {/* Node 1: SUPPLY */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-emerald-700 shadow-xs relative">
            <Tractor className="w-7 h-7" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 absolute top-0 right-0 border-2 border-white" />
          </div>
          <div>
            <div className="text-xs font-extrabold tracking-wider uppercase text-slate-900">Supply</div>
            <div className="text-[10px] font-mono text-slate-500 font-medium">Volume Nominal</div>
          </div>
        </div>

        {/* Connector 1 */}
        <div className="flex items-center justify-center">
          <div className="w-7 h-7 rounded-md bg-red-100 border border-red-300 text-red-600 flex items-center justify-center">
            <X className="w-4 h-4 stroke-[3]" />
          </div>
        </div>

        {/* Node 2: LOGISTICS */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-red-50 border-2 border-red-500 flex items-center justify-center text-red-600 shadow-xs relative">
            <Truck className="w-7 h-7" />
            <span className="w-3 h-3 rounded-full bg-red-500 absolute top-0 right-0 border-2 border-white animate-ping" />
          </div>
          <div>
            <div className="text-xs font-extrabold tracking-wider uppercase text-red-700">Logistics</div>
            <div className="text-[10px] font-mono text-red-600 font-bold">↓ Delayed Truck</div>
            <div className="text-[10px] font-mono text-red-600 font-bold">↑ Food Loss Risk</div>
          </div>
        </div>

        {/* Connector 2 */}
        <div className="flex items-center justify-center text-slate-300">
          <ChevronsRight className="w-6 h-6 text-slate-400" />
        </div>

        {/* Node 3: MARKET */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-[#7C4A21] flex items-center justify-center text-[#7C4A21] shadow-xs relative">
            <Store className="w-7 h-7" />
            <span className="w-3 h-3 rounded-full bg-[#7C4A21] absolute top-0 right-0 border-2 border-white" />
          </div>
          <div>
            <div className="text-xs font-extrabold tracking-wider uppercase text-slate-900">Market</div>
            <div className="text-[10px] font-mono text-amber-800 font-bold">↓ Supply Available</div>
            <div className="text-[10px] font-mono text-amber-800 font-bold">↑ Price Volatility</div>
          </div>
        </div>
      </div>
    </div>
  );
}
