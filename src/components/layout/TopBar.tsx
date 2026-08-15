'use client';

import React from 'react';
import { Search, SlidersHorizontal, Bell, Calendar, User, ChevronDown } from 'lucide-react';
import { GlobalFilterState } from '@/types';

interface TopBarProps {
  filters: GlobalFilterState;
  onOpenFilters: () => void;
  onOpenSearch: () => void;
  onOpenNotificationAlert?: () => void;
}

export function TopBar({
  filters,
  onOpenFilters,
  onOpenSearch,
  onOpenNotificationAlert,
}: TopBarProps) {
  return (
    <header className="h-16 bg-white border-b border-[#E2E6DF] px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      {/* Search Input Box */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={onOpenSearch}
          className="w-full bg-[#F5F7F4] hover:bg-[#EDF0EC] border border-slate-200 text-slate-500 rounded-lg px-3.5 py-2 text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="truncate">Search markets, crops, routes...</span>
          <kbd className="ml-auto text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 font-mono hidden sm:inline-block">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Global Filter Indicators & Actions */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-normal">Zone:</span>
            <span className="text-slate-900 font-bold">{filters.zone}</span>
          </div>
          <div className="h-3 w-px bg-slate-300" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-normal">Crop:</span>
            <span className="text-slate-900 font-bold">{filters.crop}</span>
          </div>
          <div className="h-3 w-px bg-slate-300" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-normal">Timeframe:</span>
            <span className="text-slate-900 font-bold">{filters.timeframe}</span>
          </div>
        </div>

        <button
          onClick={onOpenFilters}
          className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded-lg shadow-2xs flex items-center gap-2 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
          <span>Global Filters</span>
        </button>

        <div className="h-5 w-px bg-slate-200 mx-1" />

        {/* Right Icon Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenNotificationAlert || (() => alert('Notifications: 1 Critical Transport Alert pending for Arba Minch Zuria.'))}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          <button
            type="button"
            onClick={() => alert('Calendar View: August 2026 Harvest Cycle Schedule.')}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Harvest Calendar"
          >
            <Calendar className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 ml-1 cursor-pointer" onClick={() => alert('User: Agricultural Program Coordinator (Gamo Zone Office)')}>
            <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shadow-inner">
              GA
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </div>
        </div>
      </div>
    </header>
  );
}
