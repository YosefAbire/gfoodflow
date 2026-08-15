import { CropSupplyItem, CollectionCenter, HarvestForecastPoint, DensityPoint } from '@/types';

export const DEMO_CROP_SUPPLY: CropSupplyItem[] = [
  {
    id: 'crop-1',
    crop: 'Maize',
    volumeTons: 2840,
    sharePercentage: 57,
    color: '#7C4A21', // Warm brown matching Stitch
    secondaryColor: '#B87A4B',
    harvestPeakMonth: 'October',
  },
  {
    id: 'crop-2',
    crop: 'Banana',
    volumeTons: 1420,
    sharePercentage: 28,
    color: '#F7A361', // Muted peach matching Stitch
    secondaryColor: '#FDCB9E',
    harvestPeakMonth: 'Year-round',
  },
  {
    id: 'crop-3',
    crop: 'Mango',
    volumeTons: 720,
    sharePercentage: 15,
    color: '#F87171', // Soft coral red matching Stitch
    secondaryColor: '#FCA5A5',
    harvestPeakMonth: 'May',
  },
  {
    id: 'crop-4',
    crop: 'Enset',
    volumeTons: 510,
    sharePercentage: 10,
    color: '#155D3B',
    secondaryColor: '#34D399',
    harvestPeakMonth: 'Continuous',
  },
];

export const DEMO_COLLECTION_CENTERS: CollectionCenter[] = [
  {
    id: 'center-1',
    name: 'Arba Minch Center',
    region: 'South Region',
    capacityTons: 1200,
    currentUtilizationTons: 1104,
    utilizationPercentage: 92,
    status: 'Critical',
    coordinates: [6.035, 37.550],
  },
  {
    id: 'center-2',
    name: 'Mirab Abaya Hub',
    region: 'Central Region',
    capacityTons: 850,
    currentUtilizationTons: 663,
    utilizationPercentage: 78,
    status: 'High',
    coordinates: [6.220, 37.780],
  },
  {
    id: 'center-3',
    name: 'Chencha Facility',
    region: 'Highland Region',
    capacityTons: 600,
    currentUtilizationTons: 270,
    utilizationPercentage: 45,
    status: 'Optimal',
    coordinates: [6.250, 37.570],
  },
  {
    id: 'center-4',
    name: 'Bonke Center',
    region: 'South-West Zone',
    capacityTons: 500,
    currentUtilizationTons: 310,
    utilizationPercentage: 62,
    status: 'Optimal',
    coordinates: [5.980, 37.320],
  },
];

export const DEMO_HARVEST_FORECAST: HarvestForecastPoint[] = [
  { week: 'W1', Maize: 180, Banana: 120, Mango: 60 },
  { week: 'W2', Maize: 290, Banana: 140, Mango: 80 },
  { week: 'W3', Maize: 450, Banana: 165, Mango: 110 },
  { week: 'W4', Maize: 680, Banana: 210, Mango: 145 },
  { week: 'W5', Maize: 920, Banana: 240, Mango: 190 },
  { week: 'W6', Maize: 1150, Banana: 260, Mango: 210 },
  { week: 'W7', Maize: 1380, Banana: 280, Mango: 220 },
  { week: 'W8', Maize: 1510, Banana: 310, Mango: 235 },
  { week: 'W9', Maize: 1650, Banana: 340, Mango: 240 },
  { week: 'W10', Maize: 1720, Banana: 370, Mango: 250 },
  { week: 'W11', Maize: 1700, Banana: 410, Mango: 255 },
  { week: 'W12', Maize: 1640, Banana: 440, Mango: 260 },
];

export const DEMO_DENSITY_POINTS: DensityPoint[] = [
  {
    id: 'density-1',
    locationName: 'Mirab Abaya Cluster',
    density: 'High',
    count: 86,
    coordinates: [6.220, 37.780],
    cropFocus: ['Banana', 'Maize'],
  },
  {
    id: 'density-2',
    locationName: 'Arba Minch Zuria Cluster',
    density: 'High',
    count: 42,
    coordinates: [6.035, 37.550],
    cropFocus: ['Maize', 'Mango'],
  },
  {
    id: 'density-3',
    locationName: 'Chencha Highlands Cluster',
    density: 'Med',
    count: 18,
    coordinates: [6.250, 37.570],
    cropFocus: ['Enset', 'Wheat'],
  },
  {
    id: 'density-4',
    locationName: 'Bonke Foothills Cluster',
    density: 'Low',
    count: 12,
    coordinates: [5.980, 37.320],
    cropFocus: ['Maize'],
  },
];
