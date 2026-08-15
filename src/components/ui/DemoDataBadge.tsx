'use client';

import React from 'react';
import { Info } from 'lucide-react';

export function DemoDataBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded border border-slate-200 ${className}`}
      title="This application displays prototype demonstration data for research purposes."
    >
      <Info className="w-3 h-3 text-slate-400" />
      DEMO DATA
    </span>
  );
}
