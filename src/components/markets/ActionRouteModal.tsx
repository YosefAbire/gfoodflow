'use client';

import React, { useState } from 'react';
import { X, Navigation, CheckCircle2, ArrowRight, Truck, MapPin } from 'lucide-react';
import { OpportunityExplorerItem } from '@/types';

interface ActionRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: OpportunityExplorerItem | null;
}

export function ActionRouteModal({ isOpen, onClose, opportunity }: ActionRouteModalProps) {
  const [dispatched, setDispatched] = useState(false);

  if (!isOpen || !opportunity) return null;

  const handleDispatch = () => {
    setDispatched(true);
  };

  const handleClose = () => {
    setDispatched(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B5E3C]">
              ROUTE DISPATCH ACTION
            </span>
            <h3 className="text-lg font-extrabold text-slate-900">
              {opportunity.crop} → {opportunity.destinationMarket}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!dispatched ? (
          <div className="space-y-4 text-xs">
            {/* Route Summary Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-[#0F382C] text-white rounded uppercase">
                  {opportunity.routeType}
                </span>
                <span className="text-xs font-mono font-extrabold text-[#0F382C]">
                  Score: {opportunity.score} / 100
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-slate-900 pt-1 border-t border-slate-200/60">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>Northern Aggregation Hub</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>{opportunity.destinationMarket}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-slate-500 font-medium">Distance:</span>{' '}
                  <strong className="text-slate-900">{opportunity.distanceKm} km</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Est. Transit:</span>{' '}
                  <strong className="text-slate-900">{opportunity.estTransitDays} Days</strong>
                </div>
              </div>
            </div>

            {/* Why This Opportunity */}
            <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/80 rounded-xl space-y-1">
              <div className="text-[10px] font-extrabold uppercase text-emerald-800">Operational Rationale</div>
              <p className="text-[11px] text-slate-700 font-medium leading-relaxed">{opportunity.whyText}</p>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 text-xs font-extrabold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDispatch}
                className="px-5 py-2.5 bg-[#0F382C] hover:bg-[#09281C] text-white text-xs font-extrabold rounded-lg shadow flex items-center gap-2 transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Confirm & Dispatch Route</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-900">Route Plan Activated</h4>
              <p className="text-xs text-slate-600 font-medium mt-1 max-w-sm mx-auto">
                Fleet dispatch notification sent for {opportunity.crop} shipment to {opportunity.destinationMarket}. Scheduled transit time: {opportunity.estTransitDays} days.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="px-5 py-2.5 bg-[#0F382C] text-white text-xs font-extrabold rounded-lg shadow hover:bg-[#09281C] transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
