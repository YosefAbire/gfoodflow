'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { CommodityPricePoint } from '@/types';

interface CommodityPriceTrendsChartProps {
  data: CommodityPricePoint[];
}

export function CommodityPriceTrendsChart({ data }: CommodityPriceTrendsChartProps) {
  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <YAxis
            domain={[140, 380]}
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(val) => `$${val}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E2E6DF',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: any, name: any) => [`$${value} / MT`, name]}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ fontSize: '12px', paddingBottom: '12px' }}
          />
          <Line
            type="monotone"
            dataKey="Maize"
            stroke="#155D3B"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#155D3B' }}
            activeDot={{ r: 5 }}
            name="Maize"
          />
          <Line
            type="monotone"
            dataKey="Banana"
            stroke="#F7A361"
            strokeWidth={2.5}
            strokeDasharray="4 4"
            dot={{ r: 3, fill: '#F7A361' }}
            activeDot={{ r: 5 }}
            name="Banana"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
