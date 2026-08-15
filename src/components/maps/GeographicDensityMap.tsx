'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { DensityPoint } from '@/types';

interface GeographicDensityMapProps {
  points: DensityPoint[];
}

const GeographicDensityMapInner = dynamic(
  () => import('./GeographicDensityMapInner'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[300px] bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-xs font-semibold text-slate-400">
        Loading Operational Density Map...
      </div>
    ),
  }
);

export function GeographicDensityMap(props: GeographicDensityMapProps) {
  return <GeographicDensityMapInner {...props} />;
}
