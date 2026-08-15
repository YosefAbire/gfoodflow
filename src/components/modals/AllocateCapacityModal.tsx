'use client';

import React, { useState } from 'react';
import { X, Truck, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface AllocateCapacityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AllocateCapacityModal({ isOpen, onClose }: AllocateCapacityModalProps) {
  const [origin, setOrigin] = useState('Chencha Hub');
  const [destination, setDestination] = useState('Arba Minch Central');
  const [truckCount, setTruckCount] = useState(6);
  const [commodity, setCommodity] = useState('Maize');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-5 relative border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#09281C] text-white flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Allocate Transport Capacity</h2>
            <p className="text-xs text-slate-500 font-medium">Re-route fleet capacity to cover regional gaps</p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-sm font-extrabold text-slate-900">Capacity Successfully Re-allocated!</h3>
            <p className="text-xs text-slate-500 font-medium">
              {truckCount} trucks dispatched from {origin} to {destination} for {commodity}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Source Hub (Origin)</label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-900 focus:ring-2 focus:ring-[#155D3B]"
              >
                <option value="Chencha Hub">Chencha Hub (Idle Capacity Available)</option>
                <option value="Arba Minch Depot">Arba Minch Depot</option>
                <option value="Hawassa Hub">Hawassa Hub</option>
                <option value="Sodo Station">Sodo Station</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Demand Area (Destination)</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-900 focus:ring-2 focus:ring-[#155D3B]"
              >
                <option value="Arba Minch Central">Arba Minch Central (Deficit: -74t)</option>
                <option value="Chencha Escarpment">Chencha Escarpment (Shortage)</option>
                <option value="Sodo Market">Sodo Market (Critical)</option>
                <option value="Bonke Aggregation">Bonke Aggregation</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Truck Fleet Size</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={truckCount}
                  onChange={(e) => setTruckCount(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Commodity Type</label>
                <select
                  value={commodity}
                  onChange={(e) => setCommodity(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-900"
                >
                  <option value="Maize">Maize</option>
                  <option value="Bananas">Bananas</option>
                  <option value="Apples">Apples</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Vegetables">Vegetables</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-amber-900 text-[11px] leading-snug">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Re-allocating fleet assets will resolve the active -74 ton capacity gap in ~3.5 hours.</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#09281C] hover:bg-[#144A35] text-white font-extrabold rounded-lg shadow-sm"
              >
                Confirm Allocation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
