'use client';

import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import { NetworkZone } from '@/types';

interface InteractiveNetworkMapInnerProps {
  zones: NetworkZone[];
  activeLayers: {
    supply: boolean;
    aggregation: boolean;
    transport: boolean;
    market: boolean;
    risk: boolean;
  };
  onSelectZone: (zone: NetworkZone) => void;
}

export default function InteractiveNetworkMapInner({
  zones,
  activeLayers,
  onSelectZone,
}: InteractiveNetworkMapInnerProps) {
  const center: [number, number] = [6.12, 37.58];

  const getZoneColor = (risk: string) => {
    if (risk === 'Critical' || risk === 'High') return '#DC2626';
    if (risk === 'Medium') return '#D97706';
    return '#059669';
  };

  const createHubIcon = (name: string) => {
    return L.divIcon({
      className: 'network-hub-marker',
      html: `<div style="background-color: #155D3B; color: white; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 10px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap;">🏢 ${name}</div>`,
      iconAnchor: [30, 15],
    });
  };

  return (
    <MapContainer center={center} zoom={9.5} scrollWheelZoom style={{ width: '100%', height: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {activeLayers.supply &&
        zones.map((zone) => {
          const color = getZoneColor(zone.riskRating);
          return (
            <React.Fragment key={zone.id}>
              <Polygon
                positions={zone.polygonCoordinates}
                pathOptions={{
                  color,
                  fillColor: color,
                  fillOpacity: 0.15,
                  weight: 2,
                }}
                eventHandlers={{
                  click: () => onSelectZone(zone),
                }}
              />
              <Marker
                position={zone.centerCoordinates}
                icon={createHubIcon(zone.name.split(' ')[0])}
                eventHandlers={{
                  click: () => onSelectZone(zone),
                }}
              >
                <Popup>
                  <div className="p-2.5 text-xs space-y-1.5 font-sans">
                    <div className="font-extrabold text-slate-900">{zone.name}</div>
                    <div className="text-slate-600 font-medium">Farmers: {zone.farmersCount}</div>
                    <div className="text-slate-600 font-medium">Harvest: {zone.expectedHarvestTons} tons</div>
                    <div className="text-slate-500">Crops: {zone.mainCrops.join(', ')}</div>
                    <button
                      onClick={() => onSelectZone(zone)}
                      className="w-full mt-2 py-1 bg-[#155D3B] text-white text-[11px] font-bold rounded"
                    >
                      Inspect Zone Metrics
                    </button>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
    </MapContainer>
  );
}
