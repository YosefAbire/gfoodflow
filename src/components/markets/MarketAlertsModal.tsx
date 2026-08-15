'use client';

import React, { useState } from 'react';
import { X, Bell, ShieldAlert, TrendingUp, AlertTriangle, CheckCircle2, Filter } from 'lucide-react';
import { MarketAlertItem } from '@/types';

interface MarketAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: MarketAlertItem[];
}

export function MarketAlertsModal({ isOpen, onClose, alerts }: MarketAlertsModalProps) {
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleResolve = (id: string) => {
    setResolvedIds((prev) => [...prev, id]);
  };

  const filteredAlerts = alerts.filter((a) => {
    if (resolvedIds.includes(a.id)) return false;
    if (filterSeverity === 'all') return true;
    return a.severity === filterSeverity;
  });

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-50 text-red-700 rounded-lg">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Market Risk & Intelligence Alerts</h3>
              <p className="text-xs text-slate-500 font-medium">
                Active alerts affecting agricultural market demand, price volatility, and routes.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Severity:</span>
          </div>

          <div className="flex items-center gap-1.5">
            {['all', 'critical', 'high', 'moderate'].map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-3 py-1 text-[11px] font-extrabold rounded-lg capitalize transition-colors ${
                  filterSeverity === sev
                    ? 'bg-[#0F382C] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 text-[9px] font-black uppercase rounded ${
                        alert.severity === 'critical'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : alert.severity === 'high'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      }`}
                    >
                      {alert.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{alert.timestamp}</span>
                  </div>

                  <h4 className="text-xs font-extrabold text-slate-900">{alert.title}</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{alert.description}</p>

                  <div className="text-[10px] text-slate-500 font-semibold">
                    Region: <span className="text-slate-800">{alert.affectedRegion}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleResolve(alert.id)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-extrabold rounded-lg border border-slate-200 shrink-0 transition-colors"
                >
                  Mark Resolved
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-xs text-slate-400 font-medium">
              No active market alerts matching the selected filter.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#0F382C] text-white text-xs font-extrabold rounded-lg shadow hover:bg-[#09281C] transition-all cursor-pointer"
          >
            Close Alerts Window
          </button>
        </div>
      </div>
    </div>
  );
}
