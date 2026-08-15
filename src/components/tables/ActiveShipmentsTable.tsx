'use client';

import React, { useState } from 'react';
import { Shipment } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Truck } from 'lucide-react';

interface ActiveShipmentsTableProps {
  shipments: Shipment[];
}

export function ActiveShipmentsTable({ shipments }: ActiveShipmentsTableProps) {
  const [filter, setFilter] = useState<'All' | 'On Time' | 'Delayed' | 'At Risk'>('All');

  const filtered = filter === 'All' ? shipments : shipments.filter((s) => s.status === filter);

  return (
    <div className="space-y-3">
      {/* Table Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1">
          {(['All', 'On Time', 'Delayed', 'At Risk'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                filter === tab
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400 font-medium">{filtered.length} Active Cargoes</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-2.5 px-3">ID</th>
              <th className="py-2.5 px-3">Route</th>
              <th className="py-2.5 px-3">Cargo</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-3 font-mono font-bold text-slate-900">{s.id}</td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-slate-900">{s.route}</div>
                  <div className="text-[10px] text-slate-400">{s.carrier}</div>
                </td>
                <td className="py-3 px-3 font-medium text-slate-700">{s.cargo}</td>
                <td className="py-3 px-3">
                  <StatusBadge status={s.status} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
