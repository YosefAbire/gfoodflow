import { DEMO_CROP_SUPPLY, DEMO_COLLECTION_CENTERS, DEMO_HARVEST_FORECAST, DEMO_DENSITY_POINTS } from '@/data/supplyData';
import { CropSupplyItem, CollectionCenter, HarvestForecastPoint, DensityPoint } from '@/types';

export const supplyService = {
  getCropSupply: async (): Promise<CropSupplyItem[]> => {
    return DEMO_CROP_SUPPLY;
  },
  getCollectionCenters: async (): Promise<CollectionCenter[]> => {
    return DEMO_COLLECTION_CENTERS;
  },
  getHarvestForecast: async (): Promise<HarvestForecastPoint[]> => {
    return DEMO_HARVEST_FORECAST;
  },
  getDensityPoints: async (): Promise<DensityPoint[]> => {
    return DEMO_DENSITY_POINTS;
  },
};
