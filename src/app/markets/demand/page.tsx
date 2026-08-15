'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { MarketNavigationTabs } from '@/components/markets/MarketNavigationTabs';
import { ActionRouteModal } from '@/components/markets/ActionRouteModal';
import { marketService } from '@/services/marketService';
import { DemandGrowthItem, OpportunityExplorerItem } from '@/types';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles,
  Info,
  Navigation,
  MapPin,
  Filter,
} from 'lucide-react';

export default function DemandIntelligencePage() {
  const [demandGrowthItems, setDemandGrowthItems] = useState<DemandGrowthItem[]>([]);
  const [opportunities, setOpportunities] = useState<OpportunityExplorerItem[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityExplorerItem | null>(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [dgData, oppData] = await Promise.all([
        marketService.getDemandGrowthItems(),
        marketService.getOpportunityExplorerItems(),
      ]);
      setDemandGrowthItems(dgData);
      setOpportunities(oppData);
      if (oppData.length > 0) {
        setSelectedOpportunity(oppData[0]); // Select Top Recommendation by default
      }
    }
    loadData();
  }, []);

  const handleRowClick = (commodityName: string) => {
    const found = opportunities.find((o) => o.crop.toLowerCase() === commodityName.toLowerCase());
    if (found) {
      setSelectedOpportunity(found);
    }
  };

  const handleOpenActionRoute = (opp: OpportunityExplorerItem) => {
    setSelectedOpportunity(opp);
    setIsActionModalOpen(true);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-slate-900">Demand Intelligence</h1>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Analyze market pull, identify supply gaps, and prioritize agricultural distribution routes based on real-time and predictive demand data.
            </p>
          </div>

          <MarketNavigationTabs />
        </div>

        {/* Global Filter Bar matching Image 4 */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-700">
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs">Zone: All</span>
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs border-b-2 border-b-[#0F382C]">Crop: Maize</span>
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs">Timeframe: 30 Days</span>
          </div>

          <button className="px-3 py-1.5 bg-white text-slate-700 text-xs font-bold rounded-lg border border-slate-200 flex items-center gap-1.5 hover:bg-slate-100">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Global Filters</span>
          </button>
        </div>

        {/* Main 2-Column Layout matching Image 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols): Demand Trend Chart & Highest Growth Table */}
          <div className="lg:col-span-7 space-y-6">
            {/* Demand Trend by Commodity Card matching Image 4 mockup */}
            <div className="foodflow-card p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#0F382C]" />
                  <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                    Demand Trend by Commodity
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#155D3B]" />
                    <span>Maize</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7C4A21]" />
                    <span>Wheat</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    <span>Sorghum</span>
                  </div>
                </div>
              </div>

              {/* Bar Chart Canvas */}
              <div className="pt-6 pb-2 px-4 bg-slate-50/50 border border-slate-200/60 rounded-xl h-56 flex items-end justify-between gap-3">
                <div className="w-1/8 h-[40%] bg-slate-300 rounded-t-sm" />
                <div className="w-1/8 h-[55%] bg-[#155D3B] rounded-t-sm" />
                <div className="w-1/8 h-[65%] bg-[#7C4A21] rounded-t-sm" />
                <div className="w-1/8 h-[45%] bg-slate-300 rounded-t-sm" />
                <div className="w-1/8 h-[70%] bg-[#155D3B] rounded-t-sm" />
                <div className="w-1/8 h-[80%] bg-[#7C4A21] rounded-t-sm" />
                <div className="w-1/8 h-[75%] bg-slate-400 rounded-t-sm" />
                <div className="w-1/8 h-[95%] bg-[#0F382C] rounded-t-sm" />
              </div>
            </div>

            {/* Highest Demand Growth Table matching Image 4 mockup */}
            <div className="foodflow-card p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                  Highest Demand Growth
                </h3>
                <button className="text-xs font-extrabold text-slate-600 hover:text-slate-900 flex items-center gap-1">
                  <span>View Full Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Commodity</th>
                      <th className="py-3 px-4">Target Market</th>
                      <th className="py-3 px-4 text-right">Growth (MOM)</th>
                      <th className="py-3 px-4 text-right">Supply Gap</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                    {demandGrowthItems.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => handleRowClick(item.commodity)}
                        className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                          selectedOpportunity?.crop === item.commodity ? 'bg-emerald-50/40' : ''
                        }`}
                      >
                        <td className="py-3 px-4 flex items-center gap-2 font-extrabold text-slate-900">
                          <div className="w-6 h-6 rounded bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-mono">
                            {item.commodity.slice(0, 2).toUpperCase()}
                          </div>
                          <span>{item.commodity}</span>
                        </td>

                        <td className="py-3 px-4 text-slate-600">{item.targetMarket}</td>

                        <td className="py-3 px-4 text-right font-mono font-bold">
                          <span className={item.growthPct > 0 ? 'text-emerald-700' : 'text-red-600'}>
                            {item.growthPct > 0 ? `+${item.growthPct}%` : `${item.growthPct}%`}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right font-mono">
                          {item.severity === 'critical' ? (
                            <span className="px-2.5 py-1 text-[10px] font-extrabold bg-red-100 text-red-700 rounded-md border border-red-200">
                              {item.supplyGapText}
                            </span>
                          ) : item.severity === 'warning' ? (
                            <span className="px-2.5 py-1 text-[10px] font-extrabold bg-amber-100 text-amber-900 rounded-md border border-amber-200">
                              {item.supplyGapText}
                            </span>
                          ) : item.severity === 'met' ? (
                            <span className="text-slate-500 font-normal">{item.supplyGapText}</span>
                          ) : (
                            <span className="px-2.5 py-1 text-[10px] font-bold bg-slate-100 text-slate-700 rounded-md">
                              {item.supplyGapText}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Market Opportunities Explorer matching Image 4 */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Sparkles className="w-4 h-4 text-[#7C4A21]" />
              <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                Market Opportunities Explorer
              </h3>
            </div>

            {/* Opportunity Cards List */}
            {opportunities.map((opp) => {
              const isSelected = selectedOpportunity?.id === opp.id;
              return (
                <div
                  key={opp.id}
                  className={`foodflow-card p-5 bg-white rounded-xl transition-all border ${
                    opp.isTopRecommendation
                      ? 'border-l-4 border-l-[#7C4A21] border-slate-200 shadow-xs'
                      : isSelected
                      ? 'border-[#0F382C] ring-1 ring-[#0F382C] shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Top Badge */}
                  {opp.isTopRecommendation && (
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-mono">
                        {opp.routeType}
                      </span>
                      <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 rounded border border-amber-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-700" />
                        Top Recommendation
                      </span>
                    </div>
                  )}

                  {/* Title & Score */}
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <span>{opp.crop}</span>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                        <span>{opp.destinationMarket}</span>
                      </h4>
                    </div>

                    <div className="w-11 h-11 rounded-xl bg-[#155D3B] text-white flex flex-col items-center justify-center shrink-0">
                      <span className="text-base font-black leading-none">{opp.score}</span>
                      <span className="text-[8px] font-bold uppercase tracking-tighter opacity-80">Score</span>
                    </div>
                  </div>

                  {/* Score Breakdown Bar */}
                  <div className="grid grid-cols-4 gap-1 py-3 text-center border-b border-slate-100">
                    <div>
                      <div className="text-xs font-black text-slate-900 font-mono">+{opp.breakdown.demandGrowth}</div>
                      <div className="text-[9px] font-bold uppercase text-slate-400">Demand Growth</div>
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 font-mono">+{opp.breakdown.priceAdvantage}</div>
                      <div className="text-[9px] font-bold uppercase text-slate-400">Price Advantage</div>
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 font-mono">+{opp.breakdown.supplyGap}</div>
                      <div className="text-[9px] font-bold uppercase text-slate-400">Supply Gap</div>
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 font-mono">+{opp.breakdown.accessibility}</div>
                      <div className="text-[9px] font-bold uppercase text-slate-400">Accessibility</div>
                    </div>
                  </div>

                  {/* Why this opportunity callout */}
                  <div className="my-3 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                      <Info className="w-3 h-3 text-slate-500" />
                      Why this opportunity?
                    </div>
                    <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
                      {opp.whyText}
                    </p>
                  </div>

                  {/* Footer & Action Button */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-500 font-semibold">
                      Distance: <strong className="text-slate-900 font-mono">{opp.distanceKm} km</strong> • Est. Transit: <strong className="text-slate-900 font-mono">{opp.estTransitDays} Days</strong>
                    </div>

                    <button
                      onClick={() => handleOpenActionRoute(opp)}
                      className="px-4 py-2 bg-[#0F382C] hover:bg-[#09281C] text-white text-xs font-extrabold rounded-lg shadow-sm flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Action Route</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ActionRouteModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        opportunity={selectedOpportunity}
      />
    </AppShell>
  );
}
