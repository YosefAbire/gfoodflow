'use client';

import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LogisticsBottleneck } from '@/types';

interface BottleneckMapInnerProps {
  bottlenecks: LogisticsBottleneck[];
}

export default function BottleneckMapInner({ bottlenecks }: BottleneckMapInnerProps) {
  const center: [number, number] = [6.18, 37.62];

  const createIcon = (severity: 'Critical' | 'Warning') => {
    const color = severity === 'Critical' ? '#DC2626' : '#D97706';
    return L.divIcon({
      className: 'bottleneck-marker',
      html: `<div style="background-color: ${color}; color: white; border-radius: 9999px; width: 20px; height: 20px; border: 3px solid white; box-shadow: 0 0 0 4px ${color}33; display:flex; align-items:center; justify-content:center;"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden border border-slate-200 min-h-[260px]">
      <div className="absolute bottom-3 right-3 z-[1000] bg-white/95 backdrop-blur-xs border border-slate-200 rounded-lg p-2 shadow-md space-y-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
          <span className="text-[11px] font-semibold text-slate-700">Route A7 (Delay: +45m)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-[11px] font-semibold text-slate-700">Hub North (Slowdown)</span>
        </div>
      </div>

      <MapContainer center={center} zoom={9} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {bottlenecks.map((b) => (
          <Marker key={b.id} position={b.coordinates} icon={createIcon(b.severity)}>
            <Popup>
              <div className="p-2 text-xs space-y-1">
                <div className="font-bold text-slate-900">{b.locationName}</div>
                <div className="text-red-600 font-semibold">Delay: +{b.delayMinutes} mins</div>
                <div className="text-slate-500">{b.impactText}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
