'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const DEMO_REGIONAL_GAP_DATA = [
  { region: 'Arba Minch', demand: 140, supply: 95 },
  { region: 'Mirab Abaya', demand: 110, supply: 78 },
  { region: 'Chencha', demand: 75, supply: 62 },
  { region: 'Sawla', demand: 90, supply: 55 },
  { region: 'Bonke', demand: 60, supply: 48 },
];

export function RegionalSupplyGapChart() {
  return (
    <div className="w-full h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DEMO_REGIONAL_GAP_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F2ED" vertical={false} />
          <XAxis
            dataKey="region"
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(val) => `${val}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E2E6DF',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
            }}
            formatter={(val: any, name: any) => [`${val}k MT`, name]}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="square"
            wrapperStyle={{ fontSize: '11px', paddingBottom: '8px' }}
          />
          <Bar dataKey="demand" name="Market Demand" fill="#7C4A21" radius={[4, 4, 0, 0]} />
          <Bar dataKey="supply" name="Local Supply" fill="#6EE7B7" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
