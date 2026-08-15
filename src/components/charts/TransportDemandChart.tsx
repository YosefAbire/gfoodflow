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
  ReferenceLine,
} from 'recharts';
import { TransportDemandPoint } from '@/types';

interface TransportDemandChartProps {
  data: TransportDemandPoint[];
}

export function TransportDemandChart({ data }: TransportDemandChartProps) {
  return (
    <div className="w-full h-[240px] relative">
      {/* PEAK Marker matching Stitch Logistics Screenshot */}
      <div className="absolute top-4 right-16 z-20 flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
        PEAK: 545t
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F2ED" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <YAxis
            domain={[250, 600]}
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
          {/* Constant Available Capacity Threshold line matching Stitch */}
          <ReferenceLine
            y={450}
            stroke="#6B7280"
            strokeDasharray="5 5"
            strokeWidth={1.5}
            label={{
              value: 'Fleet Limit: 450t',
              position: 'insideBottomLeft',
              fill: '#6B7280',
              fontSize: 10,
              fontWeight: 600,
            }}
          />
          <Line
            type="monotone"
            dataKey="demand"
            stroke="#09281C"
            strokeWidth={3.5}
            dot={{ r: 4, fill: '#09281C' }}
            activeDot={{ r: 6 }}
            name="Expected Transport Demand"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
