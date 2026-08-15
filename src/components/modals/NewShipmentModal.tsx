'use client';

import React, { useState } from 'react';
import { X, Package, CheckCircle2 } from 'lucide-react';

interface NewShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewShipmentModal({ isOpen, onClose }: NewShipmentModalProps) {
  const [commodity, setCommodity] = useState('Bananas');
  const [route, setRoute] = useState('Bonke → Arba Minch');
  const [volumeTons, setVolumeTons] = useState(12);
  const [transporter, setTransporter] = useState('Gamo Logistics');
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
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Create New Shipment</h2>
            <p className="text-xs text-slate-500 font-medium">Register an agricultural cargo dispatch</p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-sm font-extrabold text-slate-900">Shipment Successfully Dispatched!</h3>
            <p className="text-xs text-slate-500 font-medium">
              Shipment ID <strong className="font-mono text-slate-900">SH-524</strong> registered for {volumeTons}t of {commodity}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Commodity Cargo</label>
              <select
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-900"
              >
                <option value="Bananas">Bananas (Fresh Produce)</option>
                <option value="Maize">Maize (Grain)</option>
                <option value="Apples">Apples (Highland Fruit)</option>
                <option value="Vegetables">Mixed Vegetables</option>
                <option value="Coffee">Coffee (Export Grade)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Transport Route</label>
              <select
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-900"
              >
                <option value="Bonke → Arba Minch">Bonke → Arba Minch</option>
                <option value="Chencha → Hawassa">Chencha → Hawassa</option>
                <option value="Kamba → Addis Ababa">Kamba → Addis Ababa</option>
                <option value="Dita → Djibouti Port">Dita → Djibouti Port</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Volume (Tons)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={volumeTons}
                  onChange={(e) => setVolumeTons(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Logistics Transporter</label>
                <select
                  value={transporter}
                  onChange={(e) => setTransporter(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-900"
                >
                  <option value="Gamo Logistics">Gamo Logistics</option>
                  <option value="Rift Valley Trans">Rift Valley Trans</option>
                  <option value="Highland Express">Highland Express</option>
                  <option value="Abaya Freight">Abaya Freight</option>
                </select>
              </div>
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
                Dispatch Shipment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
