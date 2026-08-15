'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { MarketNavigationTabs } from '@/components/markets/MarketNavigationTabs';
import { LogisticsPivotModal } from '@/components/markets/LogisticsPivotModal';
import { MarketAlertsModal } from '@/components/markets/MarketAlertsModal';
import { ExportReportModal } from '@/components/modals/ExportReportModal';
import { marketService } from '@/services/marketService';
import { MarketAlertItem, SupplyDemandPoint } from '@/types';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  ArrowUpRight,
  Download,
  Filter,
  Layers,
  MapPin,
  Bell,
  CheckCircle2,
  ChevronDown,
  Maximize2,
} from 'lucide-react';

export default function MarketOverviewPage() {
  const [kpis, setKpis] = useState<any>(null);
  const [supplyDemandData, setSupplyDemandData] = useState<SupplyDemandPoint[]>([]);
  const [alerts, setAlerts] = useState<MarketAlertItem[]>([]);
  const [selectedCommodityFilter, setSelectedCommodityFilter] = useState('All Commodities');
  const [selectedMarketFilter, setSelectedMarketFilter] = useState('All Markets');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Last 30 Days');

  const [isPivotModalOpen, setIsPivotModalOpen] = useState(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(3); // Oct 15 default

  useEffect(() => {
    async function loadData() {
      const [kData, sdData, aData] = await Promise.all([
        marketService.getMarketKPIs(),
        marketService.getSupplyDemandTrends(),
        marketService.getMarketAlerts(),
      ]);
      setKpis(kData);
      setSupplyDemandData(sdData);
      setAlerts(aData);
    }
    loadData();
  }, []);

  if (!kpis) {
    return (
      <AppShell>
        <div className="p-8 text-center text-xs font-bold text-slate-400">
          Loading Market Intelligence Engine...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Top Navigation & Sub-Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-slate-900">Market Intelligence</h1>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Understand agricultural market demand, price movements, supply gaps, opportunities, and emerging risks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <MarketNavigationTabs />

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-extrabold rounded-lg border border-slate-200 shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Global Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
          <div className="flex flex-wrap items-center gap-2">
            {/* Commodity Dropdown */}
            <select
              value={selectedCommodityFilter}
              onChange={(e) => setSelectedCommodityFilter(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 shadow-2xs focus:ring-1 focus:ring-[#0F382C] cursor-pointer"
            >
              <option value="All Commodities">All Commodities</option>
              <option value="Maize">Maize</option>
              <option value="Wheat">Wheat</option>
              <option value="Teff">Teff</option>
              <option value="Coffee">Coffee</option>
            </select>

            {/* Market Dropdown */}
            <select
              value={selectedMarketFilter}
              onChange={(e) => setSelectedMarketFilter(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 shadow-2xs focus:ring-1 focus:ring-[#0F382C] cursor-pointer"
            >
              <option value="All Markets">All Markets</option>
              <option value="Addis Central">Addis Central</option>
              <option value="Arba Minch">Arba Minch</option>
              <option value="Hawassa">Hawassa</option>
            </select>

            {/* Timeframe Dropdown */}
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 shadow-2xs focus:ring-1 focus:ring-[#0F382C] cursor-pointer"
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
            </select>
          </div>

          <button
            type="button"
            className="px-3 py-1.5 bg-white text-slate-700 text-xs font-bold rounded-lg border border-slate-200 flex items-center gap-1.5 hover:bg-slate-100"
          >
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Global Filters</span>
          </button>
        </div>

        {/* 6 KPI Cards Grid matching Image 3 mockup */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1: Avg Market Price */}
          <div className="foodflow-card p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Avg Market Price</div>
            <div className="text-xl font-black text-slate-900 font-mono tracking-tight">
              4,250 <span className="text-xs font-normal text-slate-500">ETB/Q</span>
            </div>
            <div className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+2.4% vs last week</span>
            </div>
          </div>

          {/* Card 2: Market Demand */}
          <div className="foodflow-card p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Market Demand</div>
            <div className="text-xl font-black text-slate-900 font-mono tracking-tight">
              12.5k <span className="text-xs font-normal text-slate-500">MT</span>
            </div>
            <div className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+5.1% vs last week</span>
            </div>
          </div>

          {/* Card 3: Available Supply */}
          <div className="foodflow-card p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Available Supply</div>
            <div className="text-xl font-black text-slate-900 font-mono tracking-tight">
              9.8k <span className="text-xs font-normal text-slate-500">MT</span>
            </div>
            <div className="text-[10px] font-bold text-red-600 flex items-center gap-0.5">
              <TrendingDown className="w-3 h-3" />
              <span>-1.2% vs last week</span>
            </div>
          </div>

          {/* Card 4: Supply-Demand Gap (HIGHLIGHTED DARK GREEN CONTAINER matching Image 3) */}
          <div className="foodflow-card p-4 bg-[#154636] border border-[#0F382C] text-white rounded-xl space-y-1 shadow-sm">
            <div className="text-[10px] font-bold text-emerald-200/80 uppercase tracking-wider flex items-center justify-between">
              <span>Supply-Demand Gap</span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-black text-white font-mono tracking-tight">
              2.7k <span className="text-xs font-normal text-emerald-200">MT</span>
            </div>
            <div className="text-[10px] font-bold text-emerald-300 flex items-center gap-1">
              <span>Deficit</span>
              <span className="text-emerald-200/60">•</span>
              <span>⇧ Widening gap</span>
            </div>
          </div>

          {/* Card 5: Avg Price Change */}
          <div className="foodflow-card p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Avg Price Change</div>
            <div className="text-xl font-black text-slate-900 font-mono tracking-tight">
              +125 <span className="text-xs font-normal text-slate-500">ETB</span>
            </div>
            <div className="text-[10px] font-semibold text-slate-500">30-day moving avg</div>
          </div>

          {/* Card 6: Active Opportunities */}
          <div className="foodflow-card p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Opportunities</div>
            <div className="text-xl font-black text-slate-900 font-mono tracking-tight">14</div>
            <div className="text-[10px] font-bold text-emerald-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>4 high priority</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols): Supply/Demand Chart & Bottom Cards */}
          <div className="lg:col-span-8 space-y-6">
            {/* Market Supply & Demand Chart Card matching Image 3 */}
            <div className="foodflow-card p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">Market Supply & Demand</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    30-Day aggregate trends across tracked commodities
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-extrabold">
                  <div className="flex items-center gap-1.5 text-[#155D3B]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#155D3B]" />
                    <span>Demand</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#7C4A21]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7C4A21]" />
                    <span>Supply</span>
                  </div>
                </div>
              </div>

              {/* Time Series Visualization Canvas with Hover Tooltip */}
              <div className="relative pt-6 pb-2 px-2 bg-slate-50/50 border border-slate-200/60 rounded-xl h-64 flex flex-col justify-between">
                {/* SVG Curves */}
                <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 200">
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#E2E8F0" strokeDasharray="3 3" strokeWidth="1" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#E2E8F0" strokeDasharray="3 3" strokeWidth="1" />
                  <line x1="0" y1="160" x2="500" y2="160" stroke="#E2E8F0" strokeDasharray="3 3" strokeWidth="1" />

                  {/* Demand Line (Dark Green Curve) */}
                  <path
                    d="M 20 140 Q 150 70 250 50 T 480 30"
                    fill="none"
                    stroke="#155D3B"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Supply Line (Brown Curve) */}
                  <path
                    d="M 20 170 Q 150 140 250 110 T 480 150"
                    fill="none"
                    stroke="#7C4A21"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Hover Point Marker */}
                  <circle cx="250" cy="50" r="5" fill="#155D3B" stroke="white" strokeWidth="2" />
                  <circle cx="250" cy="110" r="5" fill="#7C4A21" stroke="white" strokeWidth="2" />
                </svg>

                {/* Simulated Hover Tooltip Box matching Image 3 mockup (Oct 15: Demand 12.4k MT, Supply 8.2k MT) */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white rounded-lg p-3 text-xs shadow-xl border border-slate-700 space-y-1.5 z-10 w-44">
                  <div className="font-bold text-slate-300 border-b border-slate-700 pb-1">Oct 15</div>
                  <div className="flex items-center justify-between text-[11px] font-medium">
                    <span className="text-emerald-400 font-bold">Demand:</span>
                    <span className="font-mono font-bold">12.4k MT</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-medium">
                    <span className="text-amber-400 font-bold">Supply:</span>
                    <span className="font-mono font-bold">8.2k MT</span>
                  </div>
                </div>

                {/* X Axis Labels */}
                <div className="flex justify-between text-[10px] font-bold text-slate-400 pt-48 px-4 border-t border-slate-200/80 z-0">
                  <span>Oct 1</span>
                  <span>Oct 5</span>
                  <span>Oct 10</span>
                  <span className="text-slate-900 font-black">Oct 15</span>
                  <span>Oct 20</span>
                  <span>Oct 25</span>
                  <span>Oct 30</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Commodity Price Trends & Opportunity Map */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Commodity Price Trends */}
              <div className="foodflow-card p-5 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                    Commodity Price Trends
                  </h4>
                  <Maximize2 className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                </div>

                {/* Trend Legend Checkboxes */}
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <span className="w-2.5 h-2.5 rounded-xs bg-red-400" />
                    <span>Teff</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <span className="w-2.5 h-2.5 rounded-xs bg-amber-600" />
                    <span>Maize</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
                    <span>Wheat</span>
                  </label>
                </div>

                {/* Sparkline Canvas */}
                <div className="pt-2 h-24 bg-slate-50 border border-slate-100 rounded-lg p-2 flex items-end justify-between">
                  <div className="w-full h-full flex items-end justify-between gap-1 border-b border-slate-200 pb-1">
                    <div className="w-2 bg-red-400 rounded-t h-[40%]" />
                    <div className="w-2 bg-amber-600 rounded-t h-[60%]" />
                    <div className="w-2 bg-emerald-600 rounded-t h-[50%]" />
                    <div className="w-2 bg-red-400 rounded-t h-[70%]" />
                    <div className="w-2 bg-amber-600 rounded-t h-[80%]" />
                    <div className="w-2 bg-emerald-600 rounded-t h-[65%]" />
                    <div className="w-2 bg-red-400 rounded-t h-[90%]" />
                  </div>
                </div>
              </div>

              {/* Opportunity Map Widget */}
              <div className="foodflow-card p-5 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#155D3B]" />
                    <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                      Opportunity Map
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-slate-100 text-slate-600 rounded border border-slate-200">
                    Gamo Region
                  </span>
                </div>

                {/* Map Mini Canvas */}
                <div className="relative h-28 bg-emerald-50/40 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center p-3">
                  {/* Central Node Badge */}
                  <div className="absolute top-3 left-4 bg-white/90 backdrop-blur-xs border border-slate-300 rounded px-2 py-1 shadow-xs text-[10px] font-extrabold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Central: High Demand</span>
                  </div>

                  {/* North Node Badge */}
                  <div className="absolute bottom-3 right-4 bg-white/90 backdrop-blur-xs border border-slate-300 rounded px-2 py-1 shadow-xs text-[10px] font-extrabold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>North: Supply</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): RECOMMENDED ACTION & Market Alerts */}
          <div className="lg:col-span-4 space-y-6">
            {/* RECOMMENDED ACTION Card matching Image 3 mockup */}
            <div className="foodflow-card p-6 bg-white border-l-4 border-l-[#7C4A21] border-y border-r border-slate-200 rounded-xl space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#7C4A21]" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7C4A21]">
                  RECOMMENDED ACTION
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                Redirect Maize Supply to Central Market
              </h3>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Demand in Central Market has surged 15% above predicted models due to delayed regional harvests. Current supply will deplete in 4 days. Redirecting logistics from North Hub could capture a 12% price premium.
              </p>

              <button
                onClick={() => setIsPivotModalOpen(true)}
                className="w-full py-3 bg-[#7C4A21] hover:bg-[#5C3415] text-white text-xs font-extrabold rounded-lg shadow transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Execute Logistics Pivot</span>
              </button>
            </div>

            {/* Market Alerts Panel matching Image 3 mockup */}
            <div className="foodflow-card p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">Market Alerts</h3>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-red-100 text-red-700 rounded-full border border-red-200">
                  3 New
                </span>
              </div>

              {/* Alerts List */}
              <div className="space-y-3">
                {/* Alert 1 */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="p-2 bg-[#155D3B] text-white rounded-lg shrink-0 mt-0.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-[#155D3B] text-white rounded">
                        DEMAND INCREASING
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">2h ago</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      Teff demand spike detected in Southern district.
                    </p>
                  </div>
                </div>

                {/* Alert 2 */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="p-2 bg-red-100 text-red-700 rounded-lg shrink-0 mt-0.5">
                    <TrendingDown className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-red-600 text-white rounded">
                        PRICE VOLATILITY
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">5h ago</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      Wheat prices fluctuating beyond normal standard deviation.
                    </p>
                  </div>
                </div>

                {/* Alert 3 */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-amber-600 text-white rounded">
                        SUPPLY CHAIN RISK
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">1d ago</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      Weather warning impacting key transport routes from Arba Minch.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsAlertsModalOpen(true)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold rounded-lg border border-slate-200 transition-colors cursor-pointer"
              >
                View All Alerts
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Workflows */}
      <LogisticsPivotModal
        isOpen={isPivotModalOpen}
        onClose={() => setIsPivotModalOpen(false)}
      />

      <MarketAlertsModal
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
        alerts={alerts}
      />

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </AppShell>
  );
}
