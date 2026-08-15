import {
  SupplyDemandPoint,
  MarketAlertItem,
  DemandGrowthItem,
  OpportunityExplorerItem,
  PriceForecastPoint,
  PriceIntelligenceRow,
  MarketRiskItem,
  MarketDetailProfile,
} from '@/types';

// KPI Summary Metrics
export const MARKET_KPIS = {
  avgMarketPriceEtb: 4250,
  avgMarketPriceChangePct: 2.4,
  marketDemandMt: 12500,
  marketDemandChangePct: 5.1,
  availableSupplyMt: 9800,
  availableSupplyChangePct: -1.2,
  supplyDemandGapMt: 2700,
  supplyGapStatus: 'Deficit',
  supplyGapTrend: 'Widening gap',
  avgPriceChangeEtb: 125,
  avgPriceChangePeriod: '30-day moving avg',
  activeOpportunitiesCount: 14,
  highPriorityOpportunitiesCount: 4,
};

// 30-Day Supply & Demand Time Series Data
export const SUPPLY_DEMAND_TRENDS: SupplyDemandPoint[] = [
  { date: 'Oct 1', demandTons: 10500, supplyTons: 9200 },
  { date: 'Oct 5', demandTons: 11200, supplyTons: 9000 },
  { date: 'Oct 10', demandTons: 11800, supplyTons: 8700 },
  { date: 'Oct 15', demandTons: 12400, supplyTons: 8200 },
  { date: 'Oct 20', demandTons: 12100, supplyTons: 8400 },
  { date: 'Oct 25', demandTons: 12300, supplyTons: 8100 },
  { date: 'Oct 30', demandTons: 12500, supplyTons: 7900 },
];

// Market Alerts Live Feed
export const MARKET_ALERTS: MarketAlertItem[] = [
  {
    id: 'alt-1',
    category: 'DEMAND INCREASING',
    title: 'Teff demand spike detected in Southern district.',
    description: 'Surge in regional retail purchases driven by festival preparations.',
    timestamp: '2h ago',
    severity: 'high',
    affectedRegion: 'Southern District',
  },
  {
    id: 'alt-[#2]',
    category: 'PRICE VOLATILITY',
    title: 'Wheat prices fluctuating beyond normal standard deviation.',
    description: 'Uncertainty around import tariffs driving daily 4% swings in Addis market.',
    timestamp: '5h ago',
    severity: 'critical',
    affectedRegion: 'Addis Ababa',
  },
  {
    id: 'alt-[#3]',
    category: 'SUPPLY CHAIN RISK',
    title: 'Weather warning impacting key transport routes from Arba Minch.',
    description: 'Heavy unseasonal rain causing mudslides along Chencha Escarpment bypass.',
    timestamp: '1d ago',
    severity: 'moderate',
    affectedRegion: 'Arba Minch / Chencha',
  },
  {
    id: 'alt-4',
    category: 'MARKET ACCESS',
    title: 'Storage capacity bottleneck at Hawassa Silos.',
    description: 'Aggregation center reaching 92% occupancy.',
    timestamp: '2d ago',
    severity: 'low',
    affectedRegion: 'Hawassa',
  },
];

// Demand Growth Commodities Table
export const DEMAND_GROWTH_ITEMS: DemandGrowthItem[] = [
  {
    id: 'dg-1',
    commodity: 'Maize',
    targetMarket: 'Central Hub, Region A',
    growthPct: 24.5,
    supplyGapText: '1,240 Tons',
    severity: 'critical',
    demandTons: 1240,
  },
  {
    id: 'dg-2',
    commodity: 'Wheat',
    targetMarket: 'Northern Terminal',
    growthPct: 18.2,
    supplyGapText: '850 Tons',
    severity: 'warning',
    demandTons: 850,
  },
  {
    id: 'dg-3',
    commodity: 'Soybeans',
    targetMarket: 'Eastern Processors',
    growthPct: 12.0,
    supplyGapText: '420 Tons',
    severity: 'neutral',
    demandTons: 420,
  },
  {
    id: 'dg-4',
    commodity: 'Sorghum',
    targetMarket: 'Southern Silos',
    growthPct: -4.1,
    supplyGapText: 'Met (Surplus)',
    severity: 'met',
    demandTons: 0,
  },
];

// Market Opportunities Explorer List
export const OPPORTUNITY_EXPLORER_ITEMS: OpportunityExplorerItem[] = [
  {
    id: 'opp-exp-1',
    crop: 'Maize',
    destinationMarket: 'Central Market',
    score: 82,
    isTopRecommendation: true,
    routeType: 'HIGH YIELD ROUTE',
    breakdown: {
      demandGrowth: 24,
      priceAdvantage: 21,
      supplyGap: 18,
      accessibility: 12,
    },
    whyText:
      'Current harvest peaks in the Northern plains perfectly align with an acute supply shortage in the Central Market urban center. Favorable logistics costs due to low return-freight rates this week amplify profitability margins by an estimated 14%.',
    distanceKm: 340,
    estTransitDays: 1.2,
  },
  {
    id: 'opp-exp-2',
    crop: 'Wheat',
    destinationMarket: 'Northern Terminal',
    score: 68,
    isTopRecommendation: false,
    routeType: 'Storage & Reserve Arbitrage',
    breakdown: {
      demandGrowth: 18,
      priceAdvantage: 16,
      supplyGap: 15,
      accessibility: 19,
    },
    whyText:
      'Silo capacities at Northern Terminal are at 40%, creating temporary premium pricing for incoming reserve wheat stocks.',
    distanceKm: 210,
    estTransitDays: 0.8,
  },
  {
    id: 'opp-exp-3',
    crop: 'Soybeans',
    destinationMarket: 'Eastern Processors',
    score: 54,
    isTopRecommendation: false,
    routeType: 'Processing Demand Spike',
    breakdown: {
      demandGrowth: 12,
      priceAdvantage: 14,
      supplyGap: 12,
      accessibility: 16,
    },
    whyText:
      'Oilseed processing mills in the Eastern district have expanded operational shifts, increasing daily crushing throughput requirement.',
    distanceKm: 420,
    estTransitDays: 1.6,
  },
];

// Price Forecast Chart Points
export const PRICE_FORECAST_POINTS: PriceForecastPoint[] = [
  { month: 'Jan', historicalEtb: 52 },
  { month: 'Mar', historicalEtb: 74 },
  { month: 'May', historicalEtb: 65 },
  { month: 'Today', historicalEtb: 98.5, forecastEtb: 98.5, isToday: true },
  { month: 'Sep', forecastEtb: 110, confidenceUpperEtb: 118, confidenceLowerEtb: 102 },
  { month: 'Nov', forecastEtb: 104, confidenceUpperEtb: 114, confidenceLowerEtb: 96 },
];

// Price Spread between Key Markets
export const PRICE_SPREAD = [
  { market: 'Addis', priceEtbKg: 98.5, percentage: 95 },
  { market: 'Arba Minch', priceEtbKg: 82.0, percentage: 78 },
  { market: 'Hawassa', priceEtbKg: 91.2, percentage: 88 },
];

// Current Price Intelligence Table
export const PRICE_INTELLIGENCE_TABLE: PriceIntelligenceRow[] = [
  {
    id: 'pi-1',
    commodity: 'Maize',
    market: 'Addis',
    currentPriceEtb: 45.20,
    previousPriceEtb: 42.10,
    changePct: 7.3,
    volatility: 'Med',
    trend: 'up',
  },
  {
    id: 'pi-2',
    commodity: 'Wheat',
    market: 'Hawassa',
    currentPriceEtb: 68.50,
    previousPriceEtb: 70.00,
    changePct: -2.1,
    volatility: 'Low',
    trend: 'down',
  },
  {
    id: 'pi-3',
    commodity: 'Teff',
    market: 'Arba Minch',
    currentPriceEtb: 112.00,
    previousPriceEtb: 105.50,
    changePct: 6.1,
    volatility: 'High',
    trend: 'up',
  },
  {
    id: 'pi-4',
    commodity: 'Coffee',
    market: 'Addis',
    currentPriceEtb: 340.00,
    previousPriceEtb: 338.50,
    changePct: 0.4,
    volatility: 'Low',
    trend: 'stable',
  },
];

// Global Severity Distribution for Risk View
export const GLOBAL_SEVERITY_DISTRIBUTION = [
  { severity: 'Critical', count: 3, percentage: 7, colorClass: 'bg-red-500' },
  { severity: 'High', count: 8, percentage: 20, colorClass: 'bg-[#7C4A21]' },
  { severity: 'Moderate', count: 14, percentage: 35, colorClass: 'bg-[#155D3B]' },
  { severity: 'Low', count: 42, percentage: 100, colorClass: 'bg-emerald-400' },
];

// Emerging Risks Feed Items
export const EMERGING_RISKS: MarketRiskItem[] = [
  {
    id: 'risk-1',
    title: 'Price volatility detected in Zone B',
    description: 'Teff prices fluctuating rapidly due to unseasonal rain patterns disrupting early harvest transport.',
    severity: 'Critical',
    timestamp: 'Live Feed',
    affectedMarket: 'Zone B / Arba Minch',
  },
  {
    id: 'risk-2',
    title: 'Logistics bottleneck affecting Market Access',
    description: 'Route 4 partial closure is delaying 12% of expected incoming volume to central hubs.',
    severity: 'High',
    timestamp: 'Live Feed',
    affectedMarket: 'Central Hubs',
  },
  {
    id: 'risk-3',
    title: 'Buyer consortium adjusting forward contracts',
    description: 'Major processors are hedging against predicted Q3 shortages.',
    severity: 'Moderate',
    timestamp: 'Live Feed',
    affectedMarket: 'Addis Central',
  },
];

// Detailed Profile for Addis Central Market
export const ADDIS_CENTRAL_MARKET_PROFILE: MarketDetailProfile = {
  id: 'mkt-addis-central',
  name: 'Addis Central Market',
  avgPriceEtb: 4250,
  avgPriceChangePct: 5.2,
  weeklyDemandMt: 12500,
  weeklyDemandTrend: 'Stable',
  supplyGapMt: -1850,
  supplyGapStatus: 'Deficit widening',
  connectedSupplyAreas: [
    { name: 'Gamo Highlands', role: 'Primary Source (45%)', volumeSharePct: 45, volLevel: 'High' },
    { name: 'Oromia Central', role: 'Secondary Source (30%)', volumeSharePct: 30, volLevel: 'Medium' },
    { name: 'SNNPR South', role: 'Supplemental (15%)', volumeSharePct: 15, volLevel: 'Low' },
  ],
  majorBuyers: [
    { entityName: 'Alpha Processors Ltd.', type: 'Industrial', contractedVolMt: 4000 },
    { entityName: 'Addis Metro Distributors', type: 'Wholesale', contractedVolMt: 3200 },
    { entityName: 'National Reserve Agency', type: 'Government', contractedVolMt: 2500 },
  ],
  connectedRoutes: [
    {
      id: 'route-a1',
      routeName: 'Route A1',
      pathDescription: 'Gamo → Addis (Direct)',
      avgTransitHours: 12,
      status: 'Active',
      statusColor: 'green',
    },
    {
      id: 'route-b3',
      routeName: 'Route B3',
      pathDescription: 'Oromia → Hub 2 → Addis',
      avgTransitHours: 16,
      status: 'Minor Delays',
      statusColor: 'amber',
    },
    {
      id: 'route-c1',
      routeName: 'Route C1',
      pathDescription: 'South Sector Bypass',
      avgTransitHours: 22,
      status: 'Restricted Access',
      statusColor: 'red',
    },
  ],
};
