'use client';

import React from 'react';

interface StatusBadgeProps {
  status: string;
  className?: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, className = '', size = 'md' }: StatusBadgeProps) {
  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';

  const normalized = status.toLowerCase();

  if (normalized.includes('critical')) {
    badgeStyle = 'badge-critical';
  } else if (normalized.includes('high') || normalized.includes('warning')) {
    badgeStyle = 'badge-high';
  } else if (normalized.includes('optimal') || normalized.includes('on time') || normalized.includes('low risk')) {
    badgeStyle = 'badge-optimal';
  } else if (normalized.includes('delayed')) {
    badgeStyle = 'badge-delayed';
  } else if (normalized.includes('at risk') || normalized.includes('med risk')) {
    badgeStyle = 'badge-at-risk';
  }

  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs font-semibold' : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span className={`inline-flex items-center rounded-md font-medium border ${padding} ${badgeStyle} ${className}`}>
      {status}
    </span>
  );
}
