'use client';

import React from 'react';
import { Clock, Route, Activity, ChevronRight, AlertTriangle } from 'lucide-react';
import { DetailedShipmentItem } from '@/types';

interface TimeSensitiveShipmentInspectorProps {
  shipment: DetailedShipmentItem;
  onOpenRouteOptions?: () => void;
}

export function TimeSensitiveShipmentInspector({
  shipment,
  onOpenRouteOptions,
}: TimeSensitiveShipmentInspectorProps) {
  return (
    <div className="foodflow-card p-5 bg-white space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-700" />
          <h3 className="font-bold text-sm text-slate-900 tracking-tight">Time-Sensitive Shipments</h3>
        </div>
        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
          Monitoring perishable goods in active transit routes.
        </p>
      </div>

      {/* Mini GIS / Network Visual Box */}
      <div className="h-32 bg-slate-50 border border-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs border border-slate-200 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-slate-600">
          Route Analytics Active
        </div>

        {/* Node & Animated Transit Line Graphic */}
        <div className="w-full flex items-center justify-between px-8 relative z-10">
          <div className="flex flex-col items-center">
            <span className="w-4 h-4 rounded-full bg-emerald-600 border-2 border-white ring-4 ring-emerald-100" />
            <span className="text-[10px] font-bold text-slate-700 mt-1">Chencha</span>
          </div>

          <div className="flex-1 mx-4 h-0.5 bg-slate-300 border-t-2 border-dashed border-amber-500 relative flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-amber-600 border-2 border-white shadow-md animate-pulse" />
          </div>

          <div className="flex flex-col items-center">
            <span className="w-4 h-4 rounded-full bg-[#7C4A21] border-2 border-white ring-4 ring-amber-100" />
            <span className="text-[10px] font-bold text-slate-700 mt-1">Hawassa</span>
          </div>
        </div>
      </div>

      {/* Active Selected Perishable Cargo Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              {shipment.commodity}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono font-extrabold bg-amber-100 text-amber-900 rounded border border-amber-200">
              {shipment.id}
            </span>
          </div>
          <Activity className="w-4 h-4 text-slate-400" />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          {shipment.route} • <strong className="text-slate-900 font-bold">{shipment.volumeTons}t</strong>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="font-bold text-slate-700">Perishability Risk</span>
            <span className="font-extrabold text-amber-800">High ({shipment.perishabilityRiskPct}%)</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-amber-500 to-[#7C4A21] h-2 rounded-full"
              style={{ width: `${shipment.perishabilityRiskPct}%` }}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 font-medium">Status: </span>
            <strong className="text-red-600 font-extrabold">{shipment.statusText}</strong>
          </div>

          <button
            type="button"
            onClick={onOpenRouteOptions}
            className="text-xs font-bold text-[#155D3B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Route options <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
