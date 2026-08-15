'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { MarketNavigationTabs } from '@/components/markets/MarketNavigationTabs';
import { ExportReportModal } from '@/components/modals/ExportReportModal';
import { marketService } from '@/services/marketService';
import { PriceForecastPoint, PriceIntelligenceRow } from '@/types';
import {
  TrendingUp,
  TrendingDown,
  Download,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';

export default function PriceIntelligencePage() {
  const [forecastPoints, setForecastPoints] = useState<PriceForecastPoint[]>([]);
  const [priceSpread, setPriceSpread] = useState<any[]>([]);
  const [priceRows, setPriceRows] = useState<PriceIntelligenceRow[]>([]);

  const [selectedCommodity, setSelectedCommodity] = useState('All');
  const [selectedMarket, setSelectedMarket] = useState('All');
  const [selectedTimeframe, setSelectedTimeframe] = useState('6 Months');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [fData, sData, rData] = await Promise.all([
        marketService.getPriceForecastPoints(),
        marketService.getPriceSpread(),
        marketService.getPriceIntelligenceRows(),
      ]);
      setForecastPoints(fData);
      setPriceSpread(sData);
      setPriceRows(rData);
    }
    loadData();
  }, []);

  const filteredPriceRows = priceRows.filter((r) => {
    if (selectedCommodity !== 'All' && r.commodity !== selectedCommodity) return false;
    if (selectedMarket !== 'All' && r.market !== selectedMarket) return false;
    return true;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header Bar matching Image 2 */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-serif text-slate-900 tracking-tight">Price Intelligence</h1>
            <p className="text-xs text-slate-500 font-medium">
              Deep price analysis and forecasting across commodities and regional markets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MarketNavigationTabs />

            {/* Filter Dropdowns matching Image 2 */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <select
                value={selectedCommodity}
                onChange={(e) => setSelectedCommodity(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs text-xs font-bold text-slate-800"
              >
                <option value="All">Commodity: All</option>
                <option value="Maize">Maize</option>
                <option value="Wheat">Wheat</option>
                <option value="Teff">Teff</option>
                <option value="Coffee">Coffee</option>
              </select>

              <select
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs text-xs font-bold text-slate-800"
              >
                <option value="All">Market: All</option>
                <option value="Addis">Addis</option>
                <option value="Arba Minch">Arba Minch</option>
                <option value="Hawassa">Hawassa</option>
              </select>

              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs text-xs font-bold text-slate-800"
              >
                <option value="3 Months">Timeframe: 3 Months</option>
                <option value="6 Months">Timeframe: 6 Months</option>
                <option value="1 Year">Timeframe: 1 Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Top 2 Cards Grid matching Image 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Historical Price Trends & Forecasts (Left 7 cols) */}
          <div className="lg:col-span-7 foodflow-card p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#7C4A21]" />
                <h3 className="font-extrabold text-sm text-slate-900 tracking-tight font-serif">
                  Historical Price Trends & Forecasts
                </h3>
              </div>

              <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-0.5 bg-[#0F382C]" />
                  <span>Historical (ETB/kg)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-0.5 border-b border-dashed border-[#7C4A21]" />
                  <span>AI Forecast Region</span>
                </div>
              </div>
            </div>

            {/* Time Series Canvas matching Image 2 mockup */}
            <div className="relative pt-6 pb-2 px-2 bg-slate-50/50 border border-slate-200/60 rounded-xl h-56 flex flex-col justify-between">
              <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" viewBox="0 0 400 180" preserveAspectRatio="none">
                {/* Shaded AI Forecast Confidence Region */}
                <polygon points="200,80 300,50 380,60 380,100 300,90 200,80" fill="#7C4A21" fillOpacity="0.12" />

                {/* Historical Solid Line */}
                <path d="M 20 130 L 100 90 L 150 110 L 200 80" fill="none" stroke="#0F382C" strokeWidth="3" />

                {/* AI Forecast Dashed Line */}
                <path d="M 200 80 L 300 65 L 380 75" fill="none" stroke="#7C4A21" strokeWidth="3" strokeDasharray="4 4" />

                {/* Today Marker */}
                <circle cx="200" cy="80" r="5" fill="#0F382C" stroke="white" strokeWidth="2" />
                <line x1="200" y1="20" x2="200" y2="150" stroke="#0F382C" strokeWidth="1.5" strokeDasharray="2 2" />
              </svg>

              <div className="flex justify-between text-[10px] font-bold text-slate-400 pt-40 px-4 border-t border-slate-200/80">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span className="text-slate-900 font-extrabold bg-slate-200/70 px-1.5 py-0.5 rounded">Today</span>
                <span>Sep</span>
                <span>Nov</span>
              </div>
            </div>
          </div>

          {/* Price Spread Card (Right 5 cols) matching Image 2 */}
          <div className="lg:col-span-5 foodflow-card p-6 bg-white border border-slate-200 rounded-xl space-y-5 shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 tracking-tight font-serif">Price Spread</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Variance between key markets</p>
            </div>

            {/* Market Progress Bars */}
            <div className="space-y-4">
              {priceSpread.map((item) => (
                <div key={item.market} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-900 font-serif">{item.market}</span>
                    <span className="font-mono text-slate-600">{item.priceEtbKg} ETB/kg</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.market === 'Arba Minch' ? 'bg-[#7C4A21]' : 'bg-[#155D3B]'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Price Intelligence Table Card matching Image 2 */}
        <div className="foodflow-card p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 tracking-tight font-serif">
                Current Price Intelligence
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Real-time commodity valuation across tracked markets.
              </p>
            </div>

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-extrabold rounded-lg border border-slate-300 shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Data</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-50 text-[10px] font-extrabold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Commodity</th>
                  <th className="py-3 px-4">Market</th>
                  <th className="py-3 px-4">Current Price (ETB/kg)</th>
                  <th className="py-3 px-4">Previous Price</th>
                  <th className="py-3 px-4">% Change</th>
                  <th className="py-3 px-4">Volatility</th>
                  <th className="py-3 px-4">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                {filteredPriceRows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.commodity}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-serif">{row.market}</td>
                    <td className="py-3.5 px-4 font-mono font-bold">{row.currentPriceEtb.toFixed(2)}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">{row.previousPriceEtb.toFixed(2)}</td>
                    <td className={`py-3.5 px-4 font-mono font-bold ${row.changePct > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                      {row.changePct > 0 ? `+${row.changePct}%` : `${row.changePct}%`}
                    </td>
                    <td className="py-3.5 px-4">
                      {row.volatility === 'High' ? (
                        <span className="px-2.5 py-1 text-[10px] font-extrabold bg-red-100 text-red-800 rounded border border-red-200">
                          High
                        </span>
                      ) : row.volatility === 'Med' ? (
                        <span className="px-2.5 py-1 text-[10px] font-extrabold bg-amber-100 text-amber-900 rounded border border-amber-200">
                          Med
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-[10px] font-extrabold bg-[#155D3B] text-white rounded">
                          Low
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {row.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-700" />
                      ) : row.trend === 'down' ? (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      ) : (
                        <Minus className="w-4 h-4 text-slate-400" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
