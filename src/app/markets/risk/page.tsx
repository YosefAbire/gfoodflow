'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { MarketNavigationTabs } from '@/components/markets/MarketNavigationTabs';
import { ExportReportModal } from '@/components/modals/ExportReportModal';
import { marketService } from '@/services/marketService';
import { MarketRiskItem, MarketDetailProfile } from '@/types';
import {
  ShieldAlert,
  TrendingUp,
  AlertTriangle,
  Download,
  CheckCircle2,
  Navigation,
  ArrowRight,
  Filter,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

export default function MarketRiskPage() {
  const [severityDist, setSeverityDist] = useState<any[]>([]);
  const [emergingRisks, setEmergingRisks] = useState<MarketRiskItem[]>([]);
  const [marketProfile, setMarketProfile] = useState<MarketDetailProfile | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [sData, rData, pData] = await Promise.all([
        marketService.getGlobalSeverityDistribution(),
        marketService.getEmergingRisks(),
        marketService.getAddisCentralMarketProfile(),
      ]);
      setSeverityDist(sData);
      setEmergingRisks(rData);
      setMarketProfile(pData);
    }
    loadData();
  }, []);

  if (!marketProfile) {
    return (
      <AppShell>
        <div className="p-8 text-center text-xs font-bold text-slate-400">
          Loading Risk & Market Profile Intelligence...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header Bar matching Image 1 */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Market Risk & Detail View</h1>
            <p className="text-xs text-slate-500 font-medium">
              Operational intelligence and volatility tracking across active regions.
            </p>
          </div>

          <MarketNavigationTabs />
        </div>

        {/* Section 1: Market Risk Overview matching Image 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
            <h2>Market Risk Overview</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Global Severity Distribution Card (Left 5 cols) */}
            <div className="lg:col-span-5 foodflow-card p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900">Global Severity Distribution</h3>
              </div>

              <div className="space-y-3 pt-1">
                {severityDist.map((item) => (
                  <div key={item.severity} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-700">{item.severity}</span>
                      <span className="font-mono text-slate-900">{item.count}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className={`h-full ${item.colorClass}`} style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emerging Risks Live Feed Card (Right 7 cols) matching Image 1 */}
            <div className="lg:col-span-7 foodflow-card p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <h3 className="font-extrabold text-sm text-slate-900">Emerging Risks</h3>
                </div>

                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-slate-100 text-slate-600 rounded border border-slate-200">
                  Live Feed
                </span>
              </div>

              <div className="space-y-3">
                {emergingRisks.map((risk) => (
                  <div
                    key={risk.id}
                    className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-red-600" />
                        <h4 className="text-xs font-extrabold text-slate-900">{risk.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {risk.description}
                      </p>
                    </div>

                    <span
                      className={`px-2.5 py-1 text-[10px] font-black uppercase rounded shrink-0 border ${
                        risk.severity === 'Critical'
                          ? 'bg-red-100 text-red-800 border-red-200'
                          : risk.severity === 'High'
                          ? 'bg-amber-100 text-amber-900 border-amber-200'
                          : 'bg-emerald-100 text-emerald-900 border-emerald-200'
                      }`}
                    >
                      {risk.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: MARKET DETAIL PROFILE matching Image 1 */}
        <div className="space-y-6 pt-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B5E3C] font-mono">
                MARKET DETAIL PROFILE
              </span>
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
                <span>{marketProfile.name}</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-extrabold rounded-lg border border-slate-300 shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Report</span>
              </button>

              <Link
                href="/logistics/routes"
                className="px-4 py-2 bg-[#0F382C] hover:bg-[#09281C] text-white text-xs font-extrabold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Route Planning</span>
              </Link>
            </div>
          </div>

          {/* Top 3 Profile Metric Cards matching Image 1 mockup */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Avg Price Card */}
            <div className="foodflow-card p-5 bg-white border border-slate-200 rounded-xl space-y-2">
              <span className="text-[11px] font-semibold text-slate-500">Current Average Prices</span>
              <div className="text-2xl font-black text-slate-900 font-mono">
                ETB {marketProfile.avgPriceEtb.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ Quintal</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-red-600 bg-red-50 rounded border border-red-200">
                <TrendingUp className="w-3 h-3" />
                <span>+{marketProfile.avgPriceChangePct}% vs last week</span>
              </div>
            </div>

            {/* Demand Card */}
            <div className="foodflow-card p-5 bg-white border border-slate-200 rounded-xl space-y-2">
              <span className="text-[11px] font-semibold text-slate-500">Estimated Weekly Demand</span>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {marketProfile.weeklyDemandMt.toLocaleString()} <span className="text-xs font-normal text-slate-500">MT</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-slate-700 bg-slate-100 rounded border border-slate-200">
                <span>— {marketProfile.weeklyDemandTrend}</span>
              </div>
            </div>

            {/* Supply Gap Highlighted Red Box matching Image 1 */}
            <div className="foodflow-card p-5 bg-white border-l-4 border-l-red-600 border-slate-200 rounded-xl space-y-2 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500">Current Supply Gap</span>
              <div className="text-2xl font-black text-red-600 font-mono">
                {marketProfile.supplyGapMt.toLocaleString()} <span className="text-xs font-normal text-red-500">MT</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-red-700 bg-red-50 rounded border border-red-200">
                <AlertTriangle className="w-3 h-3 text-red-600" />
                <span>{marketProfile.supplyGapStatus}</span>
              </div>
            </div>
          </div>

          {/* Connected Supply Areas & Major Buyers Grid matching Image 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Connected Supply Areas Card */}
            <div className="foodflow-card p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900">Connected Supply Areas</h3>
              </div>

              <div className="space-y-3">
                {marketProfile.connectedSupplyAreas.map((area) => (
                  <div
                    key={area.name}
                    className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0F382C] text-white flex items-center justify-center font-bold text-xs">
                        {area.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900">{area.name}</h4>
                        <span className="text-[10px] text-slate-500 font-medium">{area.role}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-extrabold text-slate-900">Vol: {area.volLevel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Major Buyers / Demand Sources Table Card */}
            <div className="foodflow-card p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900">Major Buyers / Demand Sources</h3>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Entity</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3 text-right">Contracted Vol.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                    {marketProfile.majorBuyers.map((buyer) => (
                      <tr key={buyer.entityName} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-bold text-slate-900">{buyer.entityName}</td>
                        <td className="py-3 px-3 text-slate-600">{buyer.type}</td>
                        <td className="py-3 px-3 text-right font-mono font-bold">
                          {buyer.contractedVolMt.toLocaleString()} MT
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Connected Transport Routes matching Image 1 */}
          <div className="foodflow-card p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900">Connected Transport Routes</h3>
              <Link
                href="/logistics/routes"
                className="text-xs font-extrabold text-[#0F382C] hover:underline flex items-center gap-1"
              >
                <span>View Logistics Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketProfile.connectedRoutes.map((route) => (
                <div key={route.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-900">{route.routeName}</h4>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        route.statusColor === 'green'
                          ? 'bg-emerald-600'
                          : route.statusColor === 'amber'
                          ? 'bg-amber-600'
                          : 'bg-red-600'
                      }`}
                    />
                  </div>

                  <p className="text-[11px] text-slate-600 font-medium">{route.pathDescription}</p>

                  <div className="text-[10px] font-bold text-slate-500 border-t border-slate-200/60 pt-2 flex items-center justify-between">
                    <span>⏱ {route.avgTransitHours}h avg</span>
                    <span
                      className={`font-black ${
                        route.statusColor === 'green'
                          ? 'text-emerald-700'
                          : route.statusColor === 'amber'
                          ? 'text-amber-800'
                          : 'text-red-600'
                      }`}
                    >
                      {route.status}
                    </span>
                  </div>
                </div>
              ))}

              {/* Plan New Route Card */}
              <Link
                href="/logistics/routes"
                className="p-4 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-slate-100/60 transition-colors text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <Plus className="w-5 h-5 text-slate-500" />
                <span className="text-xs font-bold">Plan New Route</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </AppShell>
  );
}
