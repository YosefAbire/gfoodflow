'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LOGISTICS_TABS = [
  { name: 'Overview', href: '/logistics' },
  { name: 'Demand & Capacity', href: '/logistics/capacity' },
  { name: 'Shipments', href: '/logistics/shipments' },
  { name: 'Routes', href: '/logistics/routes' },
  { name: 'Risks & Opportunities', href: '/logistics/vehicles' },
];

export function LogisticsSubNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-6 border-b border-slate-200 pb-2 mb-6 overflow-x-auto scrollbar-none">
      <div className="text-sm font-extrabold text-slate-900 tracking-tight shrink-0 pr-2 border-r border-slate-200">
        Logistics Module
      </div>
      <nav className="flex items-center gap-6 text-xs font-semibold">
        {LOGISTICS_TABS.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`pb-1 transition-colors relative whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'text-slate-900 font-extrabold border-b-2 border-slate-900'
                  : 'text-slate-500 hover:text-slate-900 font-semibold'
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
