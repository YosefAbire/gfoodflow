'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, Bell, Calendar, ChevronDown, LogOut, ShieldCheck, Mail } from 'lucide-react';
import { GlobalFilterState } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface TopBarProps {
  filters: GlobalFilterState;
  onOpenFilters: () => void;
  onOpenSearch: () => void;
  onOpenNotificationAlert?: () => void;
}

function getInitials(name?: string): string {
  if (!name) return 'GF';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function formatRole(role?: string): string {
  if (!role) return 'User';
  return role
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function TopBar({
  filters,
  onOpenFilters,
  onOpenSearch,
  onOpenNotificationAlert,
}: TopBarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const initials = getInitials(user?.full_name);
  const humanRole = formatRole(user?.role);

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

        {/* Right Icon Actions & Profile Menu */}
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

          {/* Profile Dropdown */}
          <div className="relative ml-1" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 focus:outline-none group p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#155D3B] text-white flex items-center justify-center font-extrabold text-xs shadow-sm ring-2 ring-emerald-600/20">
                {initials}
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[130px]">
                  {user?.full_name || 'Gamo User'}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 truncate max-w-[130px]">
                  {humanRole}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors hidden sm:block" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-3 border-b border-slate-100 space-y-1 bg-slate-50/50 rounded-t-xl">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {user?.full_name || 'GamoFoodFlow User'}
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5 truncate">
                    <Mail className="w-3 h-3 shrink-0 text-slate-400" />
                    <span className="truncate">{user?.email || 'user@gfoodflow.org'}</span>
                  </p>
                  <p className="text-[10px] font-extrabold text-[#155D3B] uppercase tracking-wider flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-3 h-3 text-[#155D3B]" />
                    <span>{humanRole}</span>
                  </p>
                </div>

                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
