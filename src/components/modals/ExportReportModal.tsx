'use client';

import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2 } from 'lucide-react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle?: string;
}

export function ExportReportModal({
  isOpen,
  onClose,
  reportTitle = 'Gamo Food System Intelligence Report',
}: ExportReportModalProps) {
  const [format, setFormat] = useState<'csv' | 'pdf'>('csv');
  const [includeForecasts, setIncludeForecasts] = useState(true);
  const [includeLogistics, setIncludeLogistics] = useState(true);
  const [includeAIInsights, setIncludeAIInsights] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      // Generate CSV download
      const csvContent =
        'data:text/csv;charset=utf-8,' +
        `Gamo FoodFlow Intelligence Report\nGenerated: ${new Date().toLocaleString()}\nDomain: Gamo Ethiopia\n\n` +
        `Crop,Volume (Tons),Center Capacity,Capacity Utilization,Market Premium\n` +
        `Maize,2840,Arba Minch Center,92%,+22.4%\n` +
        `Banana,1420,Mirab Abaya Hub,78%,+18.1%\n` +
        `Mango,720,Chencha Facility,45%,+14.5%\n`;

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `Gamo_FoodFlow_Report_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExporting(false);
      setIsComplete(true);
      setTimeout(() => {
        setIsComplete(false);
        onClose();
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Export Intelligence Report</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isComplete ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce mb-3" />
            <h4 className="text-lg font-bold text-slate-900">Report Exported Successfully!</h4>
            <p className="text-xs text-slate-500 mt-1">File downloaded to your local computer.</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Report Title</label>
              <input
                type="text"
                value={reportTitle}
                readOnly
                className="w-full bg-slate-100 border border-slate-200 text-slate-700 text-xs rounded-lg p-2.5 font-medium cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Export Format</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormat('csv')}
                  className={`p-3 rounded-lg border text-left flex items-center gap-2.5 ${
                    format === 'csv'
                      ? 'border-[#155D3B] bg-emerald-50 text-[#155D3B]'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <div>
                    <div className="text-xs font-bold">CSV Spreadsheet</div>
                    <div className="text-[10px] text-slate-500">Raw data tables & metrics</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat('pdf')}
                  className={`p-3 rounded-lg border text-left flex items-center gap-2.5 ${
                    format === 'pdf'
                      ? 'border-[#155D3B] bg-emerald-50 text-[#155D3B]'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <div>
                    <div className="text-xs font-bold">Executive PDF</div>
                    <div className="text-[10px] text-slate-500">Formatted visual summary</div>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Include Sections</label>
              <div className="space-y-2">
                {[
                  { label: 'Harvest Supply Forecasts', state: includeForecasts, set: setIncludeForecasts },
                  { label: 'Logistics Capacity & Shipments', state: includeLogistics, set: setIncludeLogistics },
                  { label: 'AI Risk Alerts & Recommendations', state: includeAIInsights, set: setIncludeAIInsights },
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.state}
                      onChange={(e) => item.set(e.target.checked)}
                      className="rounded border-slate-300 text-[#155D3B] focus:ring-[#155D3B]"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900">
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="px-4 py-2 bg-[#155D3B] hover:bg-[#0F472D] text-white text-xs font-bold rounded-lg shadow flex items-center gap-2"
              >
                {isExporting ? (
                  <span>Generating Report...</span>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
