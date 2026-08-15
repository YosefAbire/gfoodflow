'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, TrendingUp, DollarSign, ShieldAlert } from 'lucide-react';

export function MarketNavigationTabs() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/markets', icon: Store },
    { name: 'Demand Intelligence', href: '/markets/demand', icon: TrendingUp },
    { name: 'Price Intelligence', href: '/markets/prices', icon: DollarSign },
    { name: 'Market Risk & Details', href: '/markets/risk', icon: ShieldAlert },
  ];

  const isActive = (href: string) => {
    if (href === '/markets') {
      return pathname === '/markets';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="bg-slate-100/80 p-1 rounded-xl border border-slate-200 inline-flex items-center gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
              active
                ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#0F382C]' : 'text-slate-500'}`} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
