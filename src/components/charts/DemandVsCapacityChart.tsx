'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface DemandVsCapacityChartProps {
  data: {
    weekLabel: string;
    availableCapacity: number;
    forecastDemand: number;
  }[];
}

export function DemandVsCapacityChart({ data }: DemandVsCapacityChartProps) {
  const [viewMode, setViewMode] = useState<'Weekly' | 'Monthly'>('Weekly');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-slate-900 tracking-tight">Demand vs Available Capacity</h3>
        </div>

        <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setViewMode('Weekly')}
            className={`px-3 py-1 rounded transition-colors ${
              viewMode === 'Weekly' ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setViewMode('Monthly')}
            className={`px-3 py-1 rounded transition-colors ${
              viewMode === 'Monthly' ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Legend Matching Stitch Image 1 */}
      <div className="flex items-center justify-end gap-4 text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-slate-200 border border-slate-400 rounded-2xs inline-block" />
          <span>Available Capacity</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-[#F5EBE1] border border-dashed border-[#7C4A21] rounded-2xs inline-block" />
          <span>Forecast Demand</span>
        </div>
      </div>

      <div className="h-[280px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="weekLabel"
              tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: '#CBD5E1' }}
            />
            <YAxis
              tickFormatter={(v) => `${v}t`}
              tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }}
              tickLine={false}
              axisLine={false}
              domain={[0, 1500]}
              ticks={[0, 500, 1000, 1500]}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs space-y-1 font-sans border border-slate-700">
                      <div className="font-extrabold text-emerald-400">{label}</div>
                      <div>
                        Available Capacity: <span className="font-mono font-bold">{payload[0]?.value} tons</span>
                      </div>
                      <div>
                        Forecast Demand: <span className="font-mono font-bold text-amber-300">{payload[1]?.value} tons</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="availableCapacity"
              fill="#E2E8F0"
              stroke="#475569"
              strokeWidth={2}
              fillOpacity={0.4}
            />
            <Line
              type="monotone"
              dataKey="forecastDemand"
              stroke="#7C4A21"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 4, fill: '#7C4A21' }}
              activeDot={{ r: 6, fill: '#7C4A21' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
