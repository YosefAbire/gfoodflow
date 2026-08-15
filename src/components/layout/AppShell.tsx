'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { NewTransportRequestModal } from '@/components/modals/NewTransportRequestModal';
import { GlobalFiltersModal } from '@/components/modals/GlobalFiltersModal';
import { SearchCommandPalette } from './SearchCommandPalette';
import { GlobalFilterState } from '@/types';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [globalFilters, setGlobalFilters] = useState<GlobalFilterState>({
    zone: 'All Gamo',
    crop: 'All',
    timeframe: '30 Days',
  });

  return (
    <div className="flex min-h-screen bg-[#F7F8F6] text-slate-900 font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        onOpenTransportModal={() => setIsTransportModalOpen(true)}
        className="hidden md:flex"
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          filters={globalFilters}
          onOpenFilters={() => setIsFiltersModalOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        <main className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {children}
        </main>
      </div>

      {/* Modals & Palettes */}
      <NewTransportRequestModal
        isOpen={isTransportModalOpen}
        onClose={() => setIsTransportModalOpen(false)}
      />

      <GlobalFiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        filters={globalFilters}
        onApplyFilters={(newFilters) => setGlobalFilters(newFilters)}
      />

      <SearchCommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
