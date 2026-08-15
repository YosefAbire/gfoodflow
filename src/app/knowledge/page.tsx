'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';
import { BookOpen, FileText, Download, Search } from 'lucide-react';

export default function KnowledgePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Knowledge & Best Practices</h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Agricultural extension guidelines, crop storage protocols, and supply chain standards for Gamo actors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Post-Harvest Loss Prevention for Maize', category: 'Storage Protocol', date: 'August 2026', size: '2.4 MB' },
            { title: 'Cold-Chain Transport Best Practices for Fresh Banana', category: 'Logistics Standard', date: 'July 2026', size: '1.8 MB' },
            { title: 'Gamo Cooperative Transport Coordination Guide', category: 'Operations Manual', date: 'June 2026', size: '3.1 MB' },
          ].map((doc, idx) => (
            <div key={idx} className="foodflow-card p-5 bg-white space-y-3 flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-50 text-[#155D3B] rounded border border-emerald-200">
                  {doc.category}
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-2">{doc.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Official guidance document for Gamo agricultural program coordinators.</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>{doc.date} • {doc.size}</span>
                <button className="text-[#155D3B] font-bold hover:underline flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
