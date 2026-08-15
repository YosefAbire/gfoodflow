'use client';

import React, { useState } from 'react';
import { X, Truck, ArrowRight, CheckCircle2, ShieldAlert, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

interface LogisticsPivotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogisticsPivotModal({ isOpen, onClose }: LogisticsPivotModalProps) {
  const [step, setStep] = useState<'review' | 'confirmed'>('review');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleConfirmPivot = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('confirmed');
    }, 800);
  };

  const handleClose = () => {
    setStep('review');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B5E3C]">
              DECISION WORKFLOW
            </span>
            <h3 className="text-lg font-extrabold text-slate-900">Execute Logistics Pivot</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'review' ? (
          <div className="space-y-4 text-xs">
            {/* Context Callout */}
            <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1.5">
              <div className="font-extrabold text-amber-900 flex items-center gap-1.5 text-xs">
                <TrendingUp className="w-4 h-4 text-amber-700" />
                <span>Redirect Maize Supply to Central Market</span>
              </div>
              <p className="text-amber-800/90 font-medium leading-relaxed text-[11px]">
                Demand in Central Market has surged 15% above predicted models. Current supply depletes in 4 days. Redirecting 1,240 Tons from North Hub captures an estimated 12% price premium.
              </p>
            </div>

            {/* Workflow Matrix */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-semibold text-slate-500 uppercase">Commodity</span>
                <div className="text-sm font-extrabold text-slate-900 mt-0.5">Maize</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-semibold text-slate-500 uppercase">Redirect Quantity</span>
                <div className="text-sm font-extrabold text-slate-900 mt-0.5 font-mono">1,240 Tons</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-semibold text-slate-500 uppercase">Origin → Destination</span>
                <div className="text-xs font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                  <span>North Hub</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Central Market</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-semibold text-slate-500 uppercase">Est. Margin Advantage</span>
                <div className="text-sm font-extrabold text-emerald-700 mt-0.5 font-mono">+12.4% Premium</div>
              </div>
            </div>

            {/* Fleet & Risk Assessment */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-between">
                <span>Fleet & Risk Assessment</span>
                <span className="text-emerald-700 font-bold">Risk: Low</span>
              </div>
              <ul className="space-y-1.5 text-[11px] font-medium text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>14 Available 10-ton trucks identified in North Hub fleet.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Route A1 (Direct Highway) currently clear with no road delays.</span>
                </li>
              </ul>
            </div>

            {/* Action Footer */}
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
                onClick={handleConfirmPivot}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-[#0F382C] hover:bg-[#09281C] text-white text-xs font-extrabold rounded-lg shadow flex items-center gap-2 transition-all cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>{isSubmitting ? 'Dispatching Orders...' : 'Authorize & Execute Pivot'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-900">Logistics Pivot Dispatched</h4>
              <p className="text-xs text-slate-600 font-medium mt-1 max-w-sm mx-auto">
                14 trucks have been assigned to reroute 1,240 Tons of Maize from North Hub to Addis Central Market. Dispatch order #GF-PV-9042 logged.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="px-5 py-2.5 bg-[#0F382C] text-white text-xs font-extrabold rounded-lg shadow hover:bg-[#09281C] transition-all cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
