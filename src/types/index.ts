export type CropType = 'Maize' | 'Banana' | 'Mango' | 'Enset' | 'Wheat' | 'Coffee';

export type StatusLevel = 'Critical' | 'High' | 'Warning' | 'Optimal' | 'On Time' | 'Delayed' | 'At Risk' | 'Low Risk' | 'Med Risk' | 'High Risk';

export interface CropSupplyItem {
  id: string;
  crop: CropType;
  volumeTons: number;
  sharePercentage: number;
  color: string;
  secondaryColor: string;
  harvestPeakMonth: string;
}

export interface CollectionCenter {
  id: string;
  name: string;
  region: string;
  capacityTons: number;
  currentUtilizationTons: number;
  utilizationPercentage: number;
  status: 'Critical' | 'High' | 'Optimal';
  coordinates: [number, number]; // [lat, lng]
}

export interface HarvestForecastPoint {
  week: string;
  Maize: number;
  Banana: number;
  Mango: number;
  Enset?: number;
  Wheat?: number;
}

export interface DensityPoint {
  id: string;
  locationName: string;
  density: 'High' | 'Med' | 'Low';
  count: number;
  coordinates: [number, number];
  cropFocus: CropType[];
}

export interface MarketOpportunity {
  id: string;
  crop: CropType;
  targetNode: string;
  opportunityScore: number; // 0 - 100
  badgeLabel: string; // e.g. "HIGH DEFICIT", "PRICE SPIKING"
  badgeSeverity: 'critical' | 'warning' | 'positive';
  marginPotential: string;
}

export interface MarketNodeComparison {
  id: string;
  nodeName: string;
  demandLevel: 'Critical' | 'High' | 'Moderate' | 'Low';
  avgPriceUsd: number;
  supplyGapTons: number;
  trend: 'up' | 'down' | 'stable';
  primaryCrops: CropType[];
}

export interface CommodityPricePoint {
  week: string;
  Maize: number;
  Banana?: number;
  Mango?: number;
  Enset?: number;
  Teff?: number;
  Wheat?: number;
}

export interface SupplyDemandPoint {
  date: string;
  demandTons: number;
  supplyTons: number;
}

export interface MarketAlertItem {
  id: string;
  category: 'DEMAND INCREASING' | 'PRICE VOLATILITY' | 'SUPPLY CHAIN RISK' | 'MARKET ACCESS';
  title: string;
  description: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'moderate' | 'low';
  affectedRegion: string;
}

export interface DemandGrowthItem {
  id: string;
  commodity: string;
  targetMarket: string;
  growthPct: number;
  supplyGapText: string;
  severity: 'critical' | 'warning' | 'neutral' | 'met';
  demandTons: number;
}

export interface OpportunityExplorerItem {
  id: string;
  crop: string;
  destinationMarket: string;
  score: number;
  isTopRecommendation?: boolean;
  routeType: string;
  breakdown: {
    demandGrowth: number;
    priceAdvantage: number;
    supplyGap: number;
    accessibility: number;
  };
  whyText: string;
  distanceKm: number;
  estTransitDays: number;
}

export interface PriceForecastPoint {
  month: string;
  historicalEtb?: number;
  forecastEtb?: number;
  confidenceUpperEtb?: number;
  confidenceLowerEtb?: number;
  isToday?: boolean;
}

export interface PriceIntelligenceRow {
  id: string;
  commodity: string;
  market: string;
  currentPriceEtb: number;
  previousPriceEtb: number;
  changePct: number;
  volatility: 'High' | 'Med' | 'Low';
  trend: 'up' | 'down' | 'stable';
}

export interface MarketRiskItem {
  id: string;
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Moderate' | 'Low';
  timestamp: string;
  affectedMarket: string;
}

export interface MarketDetailProfile {
  id: string;
  name: string;
  avgPriceEtb: number;
  avgPriceChangePct: number;
  weeklyDemandMt: number;
  weeklyDemandTrend: 'Stable' | 'Surging' | 'Declining';
  supplyGapMt: number;
  supplyGapStatus: 'Deficit widening' | 'Balanced' | 'Surplus';
  connectedSupplyAreas: {
    name: string;
    role: string;
    volumeSharePct: number;
    volLevel: 'High' | 'Medium' | 'Low';
  }[];
  majorBuyers: {
    entityName: string;
    type: 'Industrial' | 'Wholesale' | 'Government' | 'Retail';
    contractedVolMt: number;
  }[];
  connectedRoutes: {
    id: string;
    routeName: string;
    pathDescription: string;
    avgTransitHours: number;
    status: 'Active' | 'Minor Delays' | 'Restricted Access';
    statusColor: 'green' | 'amber' | 'red';
  }[];
}

export interface Shipment {
  id: string;
  route: string;
  origin: string;
  destination: string;
  cargo: string;
  quantityTons: number;
  status: 'On Time' | 'Delayed' | 'At Risk';
  estimatedArrival: string;
  carrier: string;
}

export interface RoutePerformance {
  id: string;
  routeName: string;
  riskLevel: 'Low Risk' | 'Med Risk' | 'High Risk';
  avgTransitHours: number;
  transitDelta?: string;
  reliabilityPercentage: number;
  congestionPoints: string[];
}

export interface LogisticsBottleneck {
  id: string;
  locationName: string;
  type: 'Route Delay' | 'Hub Slowdown' | 'Capacity Shortage';
  delayMinutes: number;
  impactText: string;
  coordinates: [number, number];
  severity: 'Critical' | 'Warning';
}

export interface TransportDemandPoint {
  week: string;
  capacity: number;
  demand: number;
  peak?: number;
}

export interface NetworkZone {
  id: string;
  name: string;
  farmersCount: number;
  expectedHarvestTons: number;
  mainCrops: CropType[];
  collectionCapacityTons: number;
  transportCapacityTons: number;
  riskRating: 'Low' | 'Medium' | 'High' | 'Critical';
  polygonCoordinates: [number, number][];
  centerCoordinates: [number, number];
}

export interface AIInsight {
  id: string;
  title: string;
  category: 'Transport' | 'Supply' | 'Market' | 'Harvest';
  confidence: 'HIGH CONFIDENCE' | 'MEDIUM CONFIDENCE';
  summary: string;
  contributingFactors: string[];
  recommendedAction: string;
  affectedZoneIds: string[];
  evidenceData: {
    forecastGap: string;
    financialImpact: string;
    timeframe: string;
  };
}

export interface FoodFlowAnalystMessage {
  id: string;
  sender: 'user' | 'analyst';
  timestamp: string;
  text: string;
  evidenceCards?: {
    type: 'forecast' | 'capacity' | 'risk';
    title: string;
    stat: string;
    detail: string;
  }[];
}

export interface ScenarioInput {
  harvestVolumeChangePct: number; // e.g. +20%
  transportCapacityChangePct: number; // e.g. 0%
  marketDemandChangePct: number; // e.g. +10%
  fuelCostChangePct: number; // e.g. +15%
  routeDisruptionsActive: boolean;
}

export interface ScenarioOutput {
  transportShortageTons: number;
  marketPricePressurePct: number;
  foodLossRiskIndex: number; // 0 - 100
  estimatedCostUsd: number;
  recommendedInterventions: string[];
}

export interface GlobalFilterState {
  zone: string;
  crop: CropType | 'All';
  timeframe: '7 Days' | '30 Days' | '4 Weeks' | 'Quarter';
}

// Logistics Module Specific Interfaces matching Stitch Mockups
export interface CapacityDemandAreaItem {
  id: string;
  origin: string;
  commodity: string;
  expectedVolumeTons: number;
  requiredCapacityTrucks: number;
  capacityGapTrucks: number;
  status: 'SHORTAGE' | 'MATCHED' | 'SURPLUS' | 'CRITICAL';
}

export interface CapacityBottleneckAlert {
  id: string;
  severity: 'HIGH ALERT' | 'MONITOR';
  outlookText: string;
  title: string;
  description: string;
  actionLabel: string;
}

export interface DetailedShipmentItem {
  id: string;
  commodity: string;
  route: string;
  volumeTons: number;
  transporter: string;
  perishabilityRiskPct: number;
  status: 'In Transit' | 'On Time' | 'At Risk' | 'Delayed';
  statusText: string;
}

export interface RouteMatrixItem {
  id: string;
  routeName: string;
  avgTimeHours: number;
  variability: 'Low' | 'Medium' | 'High';
  reliabilityPct: number;
  estCostEtbPerTon: number;
  status: 'Active' | 'Delayed' | 'Blocked';
}

export interface AlternativeRouteData {
  corridorName: string;
  primaryRoute: {
    distanceKm: number;
    estTravelTime: string;
    riskProfile: 'Low Risk' | 'Med Risk' | 'High Risk';
  };
  alternativeRoute: {
    distanceKm: number;
    estTravelTime: string;
    riskProfile: 'Low Risk' | 'Med Risk' | 'High Risk';
  };
}

export interface LogisticsRiskRow {
  id: string;
  routeOriginDestination: string;
  volumeTons: number;
  statusText: string;
  statusSeverity: 'Critical' | 'High' | 'Low';
  riskScore: number;
}

export interface LogisticsOpportunityItem {
  id: string;
  title: string;
  badgeText: string;
  description: string;
  suggestedAction: string;
}
export interface UserResponse {
  id: string;
  email: string;
  full_name: string;
  role: string;
  organization_id?: string | null;
  is_active: boolean;
  is_superuser: boolean;
}

export interface OrganizationResponse {
  id: string;
  name: string;
  code: string;
  org_type: string;
  contact_email?: string | null;
  contact_phone?: string | null;
}
