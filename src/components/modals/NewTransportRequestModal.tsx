'use client';

import React, { useState } from 'react';
import { X, Truck, Calendar, MapPin, Package, CheckCircle2 } from 'lucide-react';

interface NewTransportRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestCreated?: (request: any) => void;
}

export function NewTransportRequestModal({
  isOpen,
  onClose,
  onRequestCreated,
}: NewTransportRequestModalProps) {
  const [origin, setOrigin] = useState('Arba Minch Center');
  const [destination, setDestination] = useState('Mirab Abaya Wholesale Hub');
  const [cargo, setCargo] = useState('Maize');
  const [quantityTons, setQuantityTons] = useState(25);
  const [requiredDate, setRequiredDate] = useState('2026-08-15');
  const [priority, setPriority] = useState<'Normal' | 'High' | 'Urgent'>('High');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest = {
      id: `#TR-${Math.floor(100 + Math.random() * 900)}`,
      origin,
      destination,
      cargo: `${cargo} (${quantityTons}t)`,
      quantityTons,
      requiredDate,
      priority,
      notes,
      status: 'Pending Dispatch',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (onRequestCreated) {
      onRequestCreated(newRequest);
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 bg-[#09281C] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700/60 flex items-center justify-center text-emerald-300">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm tracking-tight text-white">New Transport Request</h3>
              <p className="text-[11px] text-emerald-200/80">Dispatch coordination across Gamo nodes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200/70 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce mb-3" />
            <h4 className="text-lg font-bold text-slate-900">Transport Request Created!</h4>
            <p className="text-xs text-slate-500 mt-1">
              Dispatched to active fleet allocation queue for approval.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Origin Hub</label>
                <div className="relative">
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-emerald-700 outline-none"
                  >
                    <option value="Arba Minch Center">Arba Minch Center</option>
                    <option value="Mirab Abaya Hub">Mirab Abaya Hub</option>
                    <option value="Chencha Facility">Chencha Facility</option>
                    <option value="Bonke Center">Bonke Center</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Node</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-emerald-700 outline-none"
                >
                  <option value="Mirab Abaya Wholesale Hub">Mirab Abaya Wholesale</option>
                  <option value="Arba Minch Central Node">Arba Minch Central Node</option>
                  <option value="Sawla Regional Market">Sawla Regional Market</option>
                  <option value="Chencha Highland Node">Chencha Highland Node</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Crop Commodity</label>
                <select
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-emerald-700 outline-none"
                >
                  <option value="Maize">Maize</option>
                  <option value="Banana">Banana</option>
                  <option value="Mango">Mango</option>
                  <option value="Enset">Enset</option>
                  <option value="Wheat">Wheat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity (Tons)</label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={quantityTons}
                  onChange={(e) => setQuantityTons(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Required By Date</label>
                <input
                  type="date"
                  value={requiredDate}
                  onChange={(e) => setRequiredDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Priority Level</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-emerald-700 outline-none"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent (Perishable Spoilage Risk)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Notes / Instructions</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., Requires refrigerated truck for fresh banana haul..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-emerald-700 outline-none resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#155D3B] hover:bg-[#0F472D] text-white text-xs font-semibold rounded-lg shadow transition-colors flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5" />
                Submit Transport Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
