'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { NewTransportRequestModal } from '@/components/modals/NewTransportRequestModal';
import { GlobalFiltersModal } from '@/components/modals/GlobalFiltersModal';
import { SearchCommandPalette } from './SearchCommandPalette';
import { GlobalFilterState } from '@/types';
import { Sprout } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { status } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [globalFilters, setGlobalFilters] = useState<GlobalFilterState>({
    zone: 'All Gamo',
    crop: 'All',
    timeframe: '30 Days',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      const nextParam = pathname ? `?next=${encodeURIComponent(pathname)}` : '';
      router.replace(`/login${nextParam}`);
    }
  }, [status, pathname, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#F7F8F6] flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="w-14 h-14 bg-[#09281C] rounded-2xl flex items-center justify-center shadow-lg shadow-[#09281C]/20 border border-[#155D3B]/40">
            <Sprout className="w-8 h-8 text-[#F7A361]" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-black text-[#09281C] tracking-tight">GamoFoodFlow</h1>
            <p className="text-xs font-semibold text-slate-500">Verifying session...</p>
          </div>
          <div className="w-6 h-6 border-2 border-[#155D3B] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

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
