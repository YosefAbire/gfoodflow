'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, ShieldAlert, Play, AlertTriangle } from 'lucide-react';

export function ScenarioSimulator() {
  const [harvestVolume, setHarvestVolume] = useState<number>(20); // +20%
  const [transportAvailability, setTransportAvailability] = useState<string>('Baseline');
  const [marketDemand, setMarketDemand] = useState<string>('High');
  const [isSimulated, setIsSimulated] = useState<boolean>(true);

  const handleSimulate = () => {
    setIsSimulated(true);
  };

  return (
    <div className="foodflow-card p-6 bg-white border border-slate-200 rounded-xl space-y-6 shadow-xs">
      {/* Header */}
      <div className="space-y-1 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-slate-700" />
          <h3>Scenario Simulator</h3>
        </div>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Adjust parameters to forecast impact on logistics and risk.
        </p>
      </div>

      {/* Sliders / Controls */}
      <div className="space-y-4 text-xs font-semibold text-slate-700">
        {/* Harvest Volume Control */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-slate-700">Harvest Volume</span>
            <span className="font-mono font-bold text-emerald-800">
              {harvestVolume >= 0 ? `+${harvestVolume}%` : `${harvestVolume}%`}
            </span>
          </div>
          <input
            type="range"
            min={-30}
            max={50}
            step={5}
            value={harvestVolume}
            onChange={(e) => setHarvestVolume(Number(e.target.value))}
            className="w-full accent-[#0F382C] cursor-pointer"
          />
        </div>

        {/* Transport Availability Control */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-slate-700">Transport Availability</span>
            <span className="font-mono font-bold text-slate-900">{transportAvailability}</span>
          </div>
          <select
            value={transportAvailability}
            onChange={(e) => setTransportAvailability(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:ring-1 focus:ring-[#0F382C]"
          >
            <option value="Baseline">Baseline</option>
            <option value="-15% Deficit">-15% Fleet Maintenance</option>
            <option value="+20% Surplus">+20% Spot Fleet</option>
          </select>
        </div>

        {/* Market Demand Control */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-slate-700">Market Demand</span>
            <span className="font-mono font-bold text-red-600">{marketDemand}</span>
          </div>
          <select
            value={marketDemand}
            onChange={(e) => setMarketDemand(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:ring-1 focus:ring-[#0F382C]"
          >
            <option value="Moderate">Moderate Demand</option>
            <option value="High">High Demand (Surge)</option>
            <option value="Critical">Critical Export Demand</option>
          </select>
        </div>
      </div>

      {/* Simulate Button */}
      <button
        onClick={handleSimulate}
        className="w-full py-3 bg-[#0F382C] hover:bg-[#09281C] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        <span>SIMULATE</span>
      </button>

      {/* Simulation Results Section */}
      {isSimulated && (
        <div className="pt-2 space-y-4 border-t border-slate-100">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            SIMULATION RESULTS
          </div>

          {/* Shortage Highlight Callout */}
          <div className="p-3 bg-slate-100 border border-slate-200/80 rounded-lg flex items-center justify-center gap-2 text-xs font-bold text-slate-800">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>Zone B Shortage Highlighted</span>
          </div>

          {/* Food Loss Risk Forecast Bar Chart matching Image 2 */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-slate-800">Food Loss Risk Forecast</div>

            {/* Custom Bar Chart Canvas */}
            <div className="pt-6 pb-2 px-3 bg-slate-50 border border-slate-200 rounded-xl relative flex items-end justify-between h-36">
              {/* Bar 1 - Low Risk */}
              <div className="flex flex-col items-center gap-1.5 w-1/5">
                <div className="w-full bg-[#A8E6CF] rounded-t-sm h-8 transition-all" />
                <span className="text-[9px] font-semibold text-slate-500">Day 1</span>
              </div>

              {/* Bar 2 - Medium-Low Risk */}
              <div className="flex flex-col items-center gap-1.5 w-1/5">
                <div className="w-full bg-[#81C784] rounded-t-sm h-14 transition-all" />
                <span className="text-[9px] font-semibold text-slate-500">Day 2</span>
              </div>

              {/* Bar 3 - Medium-High Risk */}
              <div className="flex flex-col items-center gap-1.5 w-1/5">
                <div className="w-full bg-[#FFB74D] rounded-t-sm h-20 transition-all" />
                <span className="text-[9px] font-semibold text-slate-500">Day 3</span>
              </div>

              {/* Bar 4 - Peak Critical Risk */}
              <div className="flex flex-col items-center gap-1.5 w-1/5 relative">
                {/* Peak Label above bar */}
                <div className="absolute -top-5 text-[10px] font-black text-red-600 uppercase tracking-wider">
                  Peak
                </div>
                <div className="w-full bg-[#E57373] rounded-t-sm h-26 transition-all" />
                <span className="text-[9px] font-semibold text-slate-500">Day 4</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
