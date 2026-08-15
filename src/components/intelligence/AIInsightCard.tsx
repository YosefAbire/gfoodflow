'use client';

import React, { useState } from 'react';
import { Lightbulb, ShieldAlert, TrendingUp, Truck, AlertOctagon, CheckCircle2 } from 'lucide-react';

import { AIInsight } from '@/types';

interface IntelligenceRiskReportProps {
  insight?: AIInsight;
  onExecuteAction?: () => void;
}

export function AIInsightCard({ insight, onExecuteAction }: IntelligenceRiskReportProps) {
  const [executed, setExecuted] = useState(false);

  const handleExecute = () => {
    setExecuted(true);
    if (onExecuteAction) onExecuteAction();
  };

  return (
    <div className="foodflow-card p-6 bg-white border border-slate-200 rounded-xl space-y-5 shadow-xs">
      {/* Header with High Priority Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-700" />
          <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
            Intelligence Risk Report
          </h3>
        </div>

        <span className="px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider bg-red-50 text-red-700 border border-red-200 rounded-md flex items-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
          High Priority
        </span>
      </div>

      {/* Main Title */}
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-base font-extrabold uppercase tracking-wide text-red-600 font-mono">
          TRANSPORT CAPACITY RISK - Zone B
        </h2>
      </div>

      {/* 3 Factors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Factor 1</span>
          <div className="flex items-start gap-2 text-xs font-extrabold text-slate-900">
            <TrendingUp className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>Harvest volume increasing</span>
          </div>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Factor 2</span>
          <div className="flex items-start gap-2 text-xs font-extrabold text-slate-900">
            <Truck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>Insufficient vehicle capacity</span>
          </div>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Factor 3</span>
          <div className="flex items-start gap-2 text-xs font-extrabold text-slate-900">
            <AlertOctagon className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>Route disruption (Red alert)</span>
          </div>
        </div>
      </div>

      {/* Recommended Action Container */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-emerald-100 rounded-lg text-[#0F382C] shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4 text-[#0F382C]" />
          </div>
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Recommended Action
            </div>
            <p className="text-xs font-extrabold text-slate-900 mt-0.5">
              Secure 15 additional transport units by Friday.
            </p>
          </div>
        </div>

        <button
          onClick={handleExecute}
          disabled={executed}
          className={`px-4 py-2.5 text-xs font-extrabold rounded-lg shadow-sm transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
            executed
              ? 'bg-emerald-700 text-white'
              : 'bg-[#0F382C] hover:bg-[#09281C] text-white'
          }`}
        >
          {executed ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Action Dispatched</span>
            </>
          ) : (
            <span>Execute Action</span>
          )}
        </button>
      </div>
    </div>
  );
}
