'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Sprout,
  Store,
  Truck,
  Map,
  BrainCircuit,
  Boxes,
  BookOpen,
  Building2,
  Settings,
  Plus,
  HelpCircle,
  Mail,
  Leaf,
} from 'lucide-react';

interface SidebarProps {
  onOpenTransportModal: () => void;
  className?: string;
}

const NAV_ITEMS = [
  { name: 'Overview', href: '/overview', icon: LayoutDashboard },
  { name: 'Supply', href: '/supply', icon: Sprout },
  { name: 'Markets', href: '/markets', icon: Store },
  { name: 'Logistics', href: '/logistics', icon: Truck },
  { name: 'Network', href: '/network', icon: Map },
  { name: 'Intelligence', href: '/intelligence', icon: BrainCircuit },
  { name: 'Operations', href: '/operations', icon: Boxes },
  { name: 'Knowledge', href: '/knowledge', icon: BookOpen },
  { name: 'Organizations', href: '/organizations', icon: Building2 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar({ onOpenTransportModal, className = '' }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/overview') {
      return pathname === '/' || pathname === '/overview';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className={`w-64 sidebar-container flex flex-col justify-between p-4 shrink-0 text-[#A3B1AA] min-h-screen ${className}`}>
      <div className="space-y-6">
        {/* Brand Header matching UI mockup */}
        <div className="flex items-center gap-3 px-2 pt-2">
          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white font-extrabold text-sm shadow-inner shrink-0">
            GF
          </div>
          <div>
            <h1 className="font-extrabold text-white tracking-tight text-sm leading-tight">
              Gamo FoodFlow
            </h1>
            <p className="text-[10px] font-medium text-emerald-300/70 tracking-tight mt-0.5">
              Supply Chain Intelligence
            </p>
          </div>
        </div>

        {/* Primary Action Button matching visual reference */}
        <div className="px-1">
          <button
            onClick={onOpenTransportModal}
            className="w-full py-2.5 px-4 bg-[#C1F7D5] hover:bg-[#A6F0C0] text-[#09281C] font-extrabold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer border border-[#A2EBB7]"
          >
            <Plus className="w-4 h-4 text-[#09281C] stroke-[2.5]" />
            <span>New Transport Request</span>
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`sidebar-nav-item flex items-center gap-3 px-3 py-2.5 text-xs font-semibold ${
                  active ? 'active' : ''
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-emerald-400/60'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="pt-4 border-t border-emerald-900/50 space-y-1 px-1">
        <button
          type="button"
          onClick={() => alert('Help Center: Documentation for Gamo FoodFlow Coordinators & Program Managers.')}
          className="w-full sidebar-nav-item flex items-center gap-3 px-3 py-2 text-xs font-medium hover:text-white"
        >
          <HelpCircle className="w-4 h-4 text-emerald-500/60" />
          <span>Help Center</span>
        </button>
        <button
          type="button"
          onClick={() => alert('Contact Admin: Support Team for Gamo Regional Agricultural Coordination Office.')}
          className="w-full sidebar-nav-item flex items-center gap-3 px-3 py-2 text-xs font-medium hover:text-white"
        >
          <Mail className="w-4 h-4 text-emerald-500/60" />
          <span>Contact Admin</span>
        </button>
      </div>
    </aside>
  );
}
