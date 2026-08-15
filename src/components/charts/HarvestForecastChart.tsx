'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { HarvestForecastPoint } from '@/types';

interface HarvestForecastChartProps {
  data: HarvestForecastPoint[];
}

export function HarvestForecastChart({ data }: HarvestForecastChartProps) {
  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMaize" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7C4A21" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#7C4A21" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorBanana" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F7A361" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#F7A361" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorMango" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F87171" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#F87171" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F2ED" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(val) => `${val}t`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E2E6DF',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
            }}
            formatter={(val: any, name: any) => [`${val} Tons`, name]}
          />
          <Area
            type="monotone"
            dataKey="Maize"
            stroke="#7C4A21"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorMaize)"
            name="Maize"
          />
          <Area
            type="monotone"
            dataKey="Banana"
            stroke="#F7A361"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorBanana)"
            name="Banana"
          />
          <Area
            type="monotone"
            dataKey="Mango"
            stroke="#F87171"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorMango)"
            name="Mango"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
