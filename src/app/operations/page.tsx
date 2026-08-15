'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { NewTransportRequestModal } from '@/components/modals/NewTransportRequestModal';
import { Boxes, Truck, Store, Plus, CheckCircle2, Clock } from 'lucide-react';

const INITIAL_REQUESTS = [
  { id: '#TR-842', origin: 'Chencha Facility', destination: 'Arba Minch Central', cargo: 'Wheat (24t)', date: '2026-08-14', priority: 'High', status: 'Approved' },
  { id: '#TR-843', origin: 'Arba Minch Center', destination: 'Mirab Abaya Wholesale', cargo: 'Maize (30t)', date: '2026-08-15', priority: 'Urgent', status: 'Pending Dispatch' },
  { id: '#TR-844', origin: 'Mirab Abaya Hub', destination: 'Sawla Regional Market', cargo: 'Banana (18t)', date: '2026-08-16', priority: 'Normal', status: 'In Transit' },
];

export default function OperationsPage() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestCreated = (newReq: any) => {
    setRequests((prev) => [newReq, ...prev]);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Operations & Logistics Dispatch</h1>
              <DemoDataBadge />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Aggregation management, transport requests queue, and wholesale order coordination for Gamo.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-[#155D3B] hover:bg-[#0F472D] text-white font-extrabold text-xs rounded-lg shadow flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Transport Request</span>
          </button>
        </div>

        {/* Operational Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Module 1: Aggregation Management */}
          <div className="foodflow-card p-5 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Boxes className="w-4 h-4 text-[#155D3B]" />
                Aggregation Status
              </h3>
              <span className="text-xs text-slate-400 font-medium">4 Active Hubs</span>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Arba Minch Center', stock: '1,104 t / 1,200 t', status: 'Critical' },
                { name: 'Mirab Abaya Hub', stock: '663 t / 850 t', status: 'High' },
                { name: 'Chencha Facility', stock: '270 t / 600 t', status: 'Optimal' },
                { name: 'Bonke Center', stock: '310 t / 500 t', status: 'Optimal' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">{item.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{item.stock}</div>
                  </div>
                  <StatusBadge status={item.status} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Module 2 & 3: Transport Requests Queue */}
          <div className="lg:col-span-2 foodflow-card p-5 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#7C4A21]" />
                Transport Requests Queue
              </h3>
              <span className="text-xs text-slate-400 font-medium">{requests.length} Pending Requests</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Req ID</th>
                    <th className="py-2.5 px-3">Route</th>
                    <th className="py-2.5 px-3">Cargo</th>
                    <th className="py-2.5 px-3">Required Date</th>
                    <th className="py-2.5 px-3">Priority</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">{req.id}</td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900">{req.origin} → {req.destination}</div>
                      </td>
                      <td className="py-3 px-3">{req.cargo}</td>
                      <td className="py-3 px-3 font-mono text-slate-600">{req.date}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          req.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {req.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <StatusBadge status={req.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <NewTransportRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRequestCreated={handleRequestCreated}
      />
    </AppShell>
  );
}
