'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Truck, Store, Sprout, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEARCH_ITEMS = [
  { id: '1', title: 'Maize Commodity Supply', category: 'Crop', route: '/supply', icon: Sprout, detail: '2,840 tons estimated harvest' },
  { id: '2', title: 'Banana Commodity Supply', category: 'Crop', route: '/supply', icon: Sprout, detail: '1,420 tons estimated harvest' },
  { id: '3', title: 'Arba Minch Collection Center', category: 'Collection Center', route: '/supply', icon: MapPin, detail: 'South Region - 92% Capacity (Critical)' },
  { id: '4', title: 'Mirab Abaya Market Node', category: 'Market Node', route: '/markets', icon: Store, detail: 'Central Region - $310/ton avg price' },
  { id: '5', title: 'Northern Corridor (Arba Minch – Mirab Abaya)', category: 'Transport Route', route: '/logistics', icon: Truck, detail: '4.2h avg transit - 98% reliability' },
  { id: '6', title: '#SH-493 Active Shipment', category: 'Shipment', route: '/logistics', icon: Truck, detail: 'Mirab Abaya → Central Silo B (Maize 18t)' },
  { id: '7', title: 'FoodFlow Scenario Simulator', category: 'Intelligence', route: '/intelligence/scenarios', icon: Store, detail: 'Simulate transport shortages & crop price impacts' },
];

export function SearchCommandPalette({ isOpen, onClose }: SearchCommandPaletteProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = SEARCH_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.detail.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (route: string) => {
    router.push(route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-150">
        <div className="p-3 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 ml-2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search markets, crops, routes, collection centers, shipments..."
            className="w-full text-sm font-medium text-slate-900 bg-transparent placeholder-slate-400 outline-none"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 font-medium">
              No matching entities found for &quot;{query}&quot;
            </div>
          ) : (
            <div className="space-y-1">
              {filteredItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.route)}
                    className="w-full text-left p-3 rounded-lg hover:bg-slate-50 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#155D3B] flex items-center justify-center">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#155D3B]">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">{item.detail}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#155D3B] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-slate-600 font-mono text-[10px]">ESC</kbd> to exit search</span>
          <span>Gamo FoodFlow Search Index</span>
        </div>
      </div>
    </div>
  );
}
