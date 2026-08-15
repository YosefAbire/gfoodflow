'use client';

import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { DensityPoint } from '@/types';

interface GeographicDensityMapInnerProps {
  points: DensityPoint[];
}

export default function GeographicDensityMapInner({ points }: GeographicDensityMapInnerProps) {
  const center: [number, number] = [6.12, 37.58];

  const createCustomIcon = (count: number, density: 'High' | 'Med' | 'Low') => {
    let bg = '#7C4A21'; // High = Warm Brown
    if (density === 'Med') bg = '#F7A361'; // Med = Muted Peach
    if (density === 'Low') bg = '#374151'; // Low = Dark Gray

    return L.divIcon({
      className: 'custom-density-marker',
      html: `<div style="background-color: ${bg}; color: white; border-radius: 9999px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">${count}</div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });
  };

  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden border border-slate-200 min-h-[280px]">
      <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-xs border border-slate-200 rounded-lg px-3 py-1.5 shadow-md flex items-center gap-3 text-xs font-semibold text-slate-700">
        <span className="font-bold text-slate-900">Geographic Density</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7C4A21]" />
          <span className="text-[11px] text-slate-600">High</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F7A361]" />
          <span className="text-[11px] text-slate-600">Med</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#374151]" />
          <span className="text-[11px] text-slate-600">Low</span>
        </div>
      </div>

      <MapContainer center={center} zoom={9.5} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {points.map((pt) => (
          <Marker key={pt.id} position={pt.coordinates} icon={createCustomIcon(pt.count, pt.density)}>
            <Popup>
              <div className="p-2 text-xs font-sans space-y-1">
                <div className="font-bold text-slate-900">{pt.locationName}</div>
                <div className="text-slate-600 font-medium">Density Level: {pt.density}</div>
                <div className="text-slate-500">Crops: {pt.cropFocus.join(', ')}</div>
                <div className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-1">
                  {pt.count} Farmer Clusters Registered
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
