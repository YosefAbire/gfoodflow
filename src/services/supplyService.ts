import { fetchWithFallback } from '@/lib/apiClient';
import { DEMO_CROP_SUPPLY, DEMO_COLLECTION_CENTERS, DEMO_HARVEST_FORECAST, DEMO_DENSITY_POINTS } from '@/data/supplyData';
import { CropSupplyItem, CollectionCenter, HarvestForecastPoint, DensityPoint } from '@/types';

export const supplyService = {
  getCropSupply: async (): Promise<CropSupplyItem[]> => {
    const rawData = await fetchWithFallback<Array<Partial<CropSupplyItem> & { volume_tons?: number; share_percentage?: number; harvest_peak_month?: string; secondary_color?: string }>>(
      '/agriculture/crop-supply',
      DEMO_CROP_SUPPLY
    );

    return rawData.map((item) => ({
      id: item.id || `crop-${Math.random()}`,
      crop: item.crop || 'Maize',
      volumeTons: item.volumeTons ?? item.volume_tons ?? 0,
      sharePercentage: item.sharePercentage ?? item.share_percentage ?? 0,
      color: item.color || '#155D3B',
      secondaryColor: item.secondaryColor ?? item.secondary_color ?? '#F7A361',
      harvestPeakMonth: item.harvestPeakMonth ?? item.harvest_peak_month ?? 'N/A',
    }));
  },

  getCollectionCenters: async (): Promise<CollectionCenter[]> => {
    const rawData = await fetchWithFallback<Array<Partial<CollectionCenter> & { capacity_tons?: number; current_utilization_tons?: number; utilization_percentage?: number }>>(
      '/agriculture/collection-centers',
      DEMO_COLLECTION_CENTERS
    );

    return rawData.map((center) => ({
      id: center.id || `cc-${Math.random()}`,
      name: center.name || 'Collection Center',
      region: center.region || 'Gamo Zone',
      capacityTons: center.capacityTons ?? center.capacity_tons ?? 0,
      currentUtilizationTons: center.currentUtilizationTons ?? center.current_utilization_tons ?? 0,
      utilizationPercentage: center.utilizationPercentage ?? center.utilization_percentage ?? 0,
      status: center.status || 'Optimal',
      coordinates: center.coordinates || [6.0333, 37.55],
    }));
  },

  getHarvestForecast: async (): Promise<HarvestForecastPoint[]> => {
    return fetchWithFallback('/agriculture/harvest-forecast', DEMO_HARVEST_FORECAST);
  },

  getDensityPoints: async (): Promise<DensityPoint[]> => {
    return fetchWithFallback('/agriculture/density-points', DEMO_DENSITY_POINTS);
  },
};
