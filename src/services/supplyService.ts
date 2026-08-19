import { fetchWithFallback } from '@/lib/apiClient';
import { DEMO_CROP_SUPPLY, DEMO_COLLECTION_CENTERS, DEMO_HARVEST_FORECAST, DEMO_DENSITY_POINTS } from '@/data/supplyData';
import { CropSupplyItem, CollectionCenter, HarvestForecastPoint, DensityPoint } from '@/types';

export const supplyService = {
  getCropSupply: async (): Promise<CropSupplyItem[]> => {
    return fetchWithFallback('/agriculture/crop-supply', DEMO_CROP_SUPPLY);
  },
  getCollectionCenters: async (): Promise<CollectionCenter[]> => {
    return fetchWithFallback('/agriculture/collection-centers', DEMO_COLLECTION_CENTERS);
  },
  getHarvestForecast: async (): Promise<HarvestForecastPoint[]> => {
    return fetchWithFallback('/agriculture/harvest-forecast', DEMO_HARVEST_FORECAST);
  },
  getDensityPoints: async (): Promise<DensityPoint[]> => {
    return fetchWithFallback('/agriculture/density-points', DEMO_DENSITY_POINTS);
  },
};
