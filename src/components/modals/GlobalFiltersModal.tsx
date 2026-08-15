'use client';

import React from 'react';
import { X, Filter, Check } from 'lucide-react';
import { GlobalFilterState, CropType } from '@/types';

interface GlobalFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: GlobalFilterState;
  onApplyFilters: (newFilters: GlobalFilterState) => void;
}

export function GlobalFiltersModal({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
}: GlobalFiltersModalProps) {
  const [localState, setLocalState] = React.useState<GlobalFilterState>(filters);

  if (!isOpen) return null;

  const handleSave = () => {
    onApplyFilters(localState);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Global Platform Filters</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Zone / Jurisdiction</label>
            <div className="grid grid-cols-2 gap-2">
              {['All Gamo', 'Arba Minch Zuria', 'Mirab Abaya', 'Chencha Highlands', 'Bonke & South Gamo'].map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => setLocalState({ ...localState, zone: z })}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left flex items-center justify-between transition-colors ${
                    localState.zone === z
                      ? 'border-[#155D3B] bg-emerald-50 text-[#155D3B]'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{z}</span>
                  {localState.zone === z && <Check className="w-3.5 h-3.5 text-[#155D3B]" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Crop Focus</label>
            <div className="grid grid-cols-3 gap-2">
              {(['All', 'Maize', 'Banana', 'Mango', 'Enset', 'Wheat'] as (CropType | 'All')[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setLocalState({ ...localState, crop: c })}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-colors ${
                    localState.crop === c
                      ? 'border-[#155D3B] bg-emerald-50 text-[#155D3B]'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Timeframe Horizon</label>
            <div className="grid grid-cols-2 gap-2">
              {(['7 Days', '30 Days', '4 Weeks', 'Quarter'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setLocalState({ ...localState, timeframe: t })}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-colors ${
                    localState.timeframe === t
                      ? 'border-[#155D3B] bg-emerald-50 text-[#155D3B]'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#155D3B] hover:bg-[#0F472D] text-white text-xs font-bold rounded-lg shadow"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
