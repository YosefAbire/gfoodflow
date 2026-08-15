'use client';

import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon?: LucideIcon;
  variant?: 'default' | 'critical' | 'warning';
  badge?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendDirection = 'up',
  icon: Icon,
  variant = 'default',
  badge,
}: MetricCardProps) {
  if (variant === 'critical') {
    return (
      <div className="foodflow-card p-5 bg-red-50/60 border-red-200 relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-red-600" />}
            <span className="text-xs font-bold uppercase tracking-wider text-red-700">{title}</span>
          </div>
          {badge && (
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest bg-red-100 text-red-700 rounded border border-red-300">
              {badge}
            </span>
          )}
        </div>
        <div className="mt-3">
          <div className="text-3xl font-extrabold tracking-tight text-red-700">{value}</div>
          {subtitle && <p className="text-xs text-red-600 font-medium mt-1 leading-snug">{subtitle}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="foodflow-card p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</span>
          {Icon && <Icon className="w-3.5 h-3.5 text-slate-400" />}
        </div>
        {badge && (
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-slate-100 text-slate-600 rounded">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <div className="text-3xl font-extrabold tracking-tight text-slate-900">{value}</div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold ${
              trendDirection === 'up'
                ? 'text-emerald-600'
                : trendDirection === 'down'
                ? 'text-red-600'
                : 'text-slate-500'
            }`}
          >
            {trendDirection === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
            {trendDirection === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
            <span>{trend}</span>
          </div>
        )}
      </div>

      {subtitle && <p className="text-xs text-slate-500 mt-1 font-medium">{subtitle}</p>}
    </div>
  );
}
