'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';
import { Building2, Users, Phone, MapPin } from 'lucide-react';

const ORGANIZATIONS = [
  { name: 'Gamo Farmers Cooperative Union', type: 'Farmer Union', location: 'Arba Minch, Gamo', members: '8,400 Farmers', phone: '+251 46 881 1234' },
  { name: 'Arba Minch Agri-Development Office', type: 'Government Bureau', location: 'Arba Minch Central', members: '12 Program Officers', phone: '+251 46 881 5678' },
  { name: 'Rift Valley Transport Logistics Association', type: 'Transport Coordinator', location: 'Mirab Abaya', members: '45 Truck Fleets', phone: '+251 46 881 9101' },
];

export default function OrganizationsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Partner Organizations</h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Agricultural unions, cooperatives, transport coordinators, NGOs, and government offices in Gamo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ORGANIZATIONS.map((org, idx) => (
            <div key={idx} className="foodflow-card p-5 bg-white space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">{org.name}</h3>
                  <span className="text-[11px] text-slate-500 font-medium">{org.type}</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#155D3B] flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{org.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{org.members}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{org.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
