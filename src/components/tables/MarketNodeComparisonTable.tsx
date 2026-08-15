'use client';

import React from 'react';
import { MarketNodeComparison } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MarketNodeComparisonTableProps {
  nodes: MarketNodeComparison[];
}

export function MarketNodeComparisonTable({ nodes }: MarketNodeComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
          <tr>
            <th className="py-3 px-4">Market Node</th>
            <th className="py-3 px-4">Demand Level</th>
            <th className="py-3 px-4 text-right">Avg Price (USD)</th>
            <th className="py-3 px-4 text-right">Supply Gap (t)</th>
            <th className="py-3 px-4 text-center">Trend</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
          {nodes.map((node) => (
            <tr key={node.id} className="hover:bg-slate-50/80 transition-colors">
              <td className="py-3 px-4">
                <div className="font-bold text-slate-900">{node.nodeName}</div>
                <div className="text-[11px] text-slate-400 font-normal">{node.primaryCrops.join(', ')}</div>
              </td>
              <td className="py-3 px-4">
                <StatusBadge status={node.demandLevel} size="sm" />
              </td>
              <td className="py-3 px-4 text-right font-extrabold text-slate-900">
                ${node.avgPriceUsd.toFixed(2)}
              </td>
              <td className="py-3 px-4 text-right font-extrabold text-red-600">
                {node.supplyGapTons.toLocaleString()} t
              </td>
              <td className="py-3 px-4 text-center">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100">
                  {node.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />}
                  {node.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-600" />}
                  {node.trend === 'stable' && <Minus className="w-3.5 h-3.5 text-slate-400" />}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
