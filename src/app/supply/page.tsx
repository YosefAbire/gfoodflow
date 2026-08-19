'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { GeographicDensityMap } from '@/components/maps/GeographicDensityMap';
import { HarvestForecastChart } from '@/components/charts/HarvestForecastChart';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DemoDataBadge } from '@/components/ui/DemoDataBadge';
import { ExportReportModal } from '@/components/modals/ExportReportModal';
import { supplyService } from '@/services/supplyService';
import { CropSupplyItem, CollectionCenter, HarvestForecastPoint, DensityPoint } from '@/types';
import { Download, MoreVertical, Building2, Sprout, Filter } from 'lucide-react';

export default function SupplyPage() {
  const [crops, setCrops] = useState<CropSupplyItem[]>([]);
  const [centers, setCenters] = useState<CollectionCenter[]>([]);
  const [forecast, setForecast] = useState<HarvestForecastPoint[]>([]);
  const [densityPoints, setDensityPoints] = useState<DensityPoint[]>([]);
  const [isExportOpen, setIsExportOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const [cData, cntData, fData, dData] = await Promise.all([
        supplyService.getCropSupply(),
        supplyService.getCollectionCenters(),
        supplyService.getHarvestForecast(),
        supplyService.getDensityPoints(),
      ]);
      setCrops(cData);
      setCenters(cntData);
      setForecast(fData);
      setDensityPoints(dData);
    }
    load();
  }, []);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Header matching Stitch Reference */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Supply Intelligence</h1>
              <DemoDataBadge />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Agricultural supply distribution and harvest forecasts across Gamo.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExportOpen(true)}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs rounded-lg shadow-2xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Top Grid: Supply by Crop (Left) & Geographic Density Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Supply by Crop Card matching Stitch Image 2 */}
          <div className="lg:col-span-5 foodflow-card p-5 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="font-bold text-sm text-slate-900 tracking-tight">Supply by Crop</h3>
                <button className="text-slate-400 hover:text-slate-600 p-1">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-5">
                {crops.map((item) => (
                  <div key={item.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.crop}</span>
                      </div>
                      <span className="font-extrabold text-slate-900 font-mono">
                        {(item.volumeTons ?? 0).toLocaleString()}t
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${item.sharePercentage}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between font-medium">
              <span>Total Projected Harvest: 5,490 Tons</span>
              <span>Updated Today</span>
            </div>
          </div>

          {/* Geographic Density Map Card matching Stitch Image 2 */}
          <div className="lg:col-span-7 foodflow-card p-4 bg-white flex flex-col h-[340px]">
            <GeographicDensityMap points={densityPoints} />
          </div>
        </div>

        {/* Bottom Grid: Harvest Forecast Line Chart (Left) & Centers Capacity (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Harvest Forecast (4-Week) Card matching Stitch Image 2 */}
          <div className="lg:col-span-8 foodflow-card p-5 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight">Harvest Forecast (4-Week)</h3>
                <p className="text-[11px] text-slate-400 font-medium">Projected crop volume yield across weeks</p>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold text-slate-600 bg-slate-100 rounded-md border border-slate-200">
                Volume (t)
              </span>
            </div>

            <HarvestForecastChart data={forecast} />
          </div>

          {/* Centers Capacity List Card matching Stitch Image 2 */}
          <div className="lg:col-span-4 foodflow-card p-5 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="font-bold text-sm text-slate-900 tracking-tight">Centers Capacity</h3>
                <span className="text-[11px] text-slate-400 font-medium">4 Active Hubs</span>
              </div>

              <div className="space-y-4">
                {centers.map((center) => (
                  <div
                    key={center.id}
                    className="p-3 bg-slate-50/80 rounded-lg border border-slate-200 flex items-center justify-between hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4 text-[#155D3B]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{center.name}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{center.region}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-extrabold text-slate-900 font-mono">
                        {center.utilizationPercentage}%
                      </div>
                      <StatusBadge status={center.status} size="sm" className="mt-0.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center font-medium">
              Average Gamo Utilization: 69.2%
            </div>
          </div>
        </div>
      </div>

      <ExportReportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </AppShell>
  );
}
