import {
  Shipment,
  RoutePerformance,
  LogisticsBottleneck,
  TransportDemandPoint,
  CapacityDemandAreaItem,
  CapacityBottleneckAlert,
  DetailedShipmentItem,
  RouteMatrixItem,
  AlternativeRouteData,
  LogisticsRiskRow,
  LogisticsOpportunityItem,
} from '@/types';

export const DEMO_SHIPMENTS: Shipment[] = [
  {
    id: 'SH-492',
    route: 'Bonke → Arba Minch',
    origin: 'Bonke Center',
    destination: 'Arba Minch Central',
    cargo: 'Maize (12t)',
    quantityTons: 12,
    status: 'On Time',
    estimatedArrival: '14:30 Today',
    carrier: 'Gamo Logistics',
  },
  {
    id: 'SH-504',
    route: 'Chencha → Hawassa',
    origin: 'Chencha Hub',
    destination: 'Hawassa Market',
    cargo: 'Bananas (8.5t)',
    quantityTons: 8.5,
    status: 'At Risk',
    estimatedArrival: '18:15 Today (+1.5h)',
    carrier: 'Rift Valley Trans',
  },
  {
    id: 'SH-511',
    route: 'Kamba → Addis Ababa',
    origin: 'Kamba Hub',
    destination: 'Addis Ababa Terminal',
    cargo: 'Vegetables (5t)',
    quantityTons: 5,
    status: 'Delayed',
    estimatedArrival: '20:45 Today',
    carrier: 'Highland Express',
  },
  {
    id: 'SH-488',
    route: 'Dita → Djibouti Port',
    origin: 'Dita Storage',
    destination: 'Djibouti Port',
    cargo: 'Coffee (24t)',
    quantityTons: 24,
    status: 'On Time',
    estimatedArrival: 'Tomorrow 08:00',
    carrier: 'Gamo Logistics',
  },
];

export const DEMO_ROUTE_PERFORMANCE: RoutePerformance[] = [
  {
    id: 'route-1',
    routeName: 'Northern Corridor',
    riskLevel: 'Low Risk',
    avgTransitHours: 4.2,
    reliabilityPercentage: 98,
    congestionPoints: [],
  },
  {
    id: 'route-2',
    routeName: 'Central Hub Link',
    riskLevel: 'Med Risk',
    avgTransitHours: 6.8,
    transitDelta: '+1.5',
    reliabilityPercentage: 82,
    congestionPoints: ['Chencha Escarpment Pass'],
  },
  {
    id: 'route-3',
    routeName: 'Southern Transit',
    riskLevel: 'High Risk',
    avgTransitHours: 8.5,
    reliabilityPercentage: 45,
    congestionPoints: ['South Market Junction Road Blockage'],
  },
];

export const DEMO_LOGISTICS_BOTTLENECK: LogisticsBottleneck[] = [
  {
    id: 'b-1',
    locationName: 'Chencha Escarpment Pass (Route A7)',
    type: 'Route Delay',
    delayMinutes: 45,
    impactText: 'Heavy rain causing mudslides & heavy truck slowdowns',
    coordinates: [6.24, 37.56],
    severity: 'Critical',
  },
  {
    id: 'b-2',
    locationName: 'Mirab Abaya Junction',
    type: 'Hub Slowdown',
    delayMinutes: 25,
    impactText: 'High vehicle queue at weighing station',
    coordinates: [6.22, 37.78],
    severity: 'Warning',
  },
];

export const DEMO_TRANSPORT_DEMAND: TransportDemandPoint[] = [
  { week: 'Wk 1', capacity: 412, demand: 360 },
  { week: 'Wk 2', capacity: 412, demand: 450 },
  { week: 'Wk 3', capacity: 412, demand: 486 },
  { week: 'Wk 4', capacity: 412, demand: 460, peak: 486 },
];

// Screen 1: Transport Demand & Capacity
export const DEMO_CAPACITY_DEMAND_AREAS: CapacityDemandAreaItem[] = [
  {
    id: 'area-1',
    origin: 'Chencha',
    commodity: 'Apples',
    expectedVolumeTons: 45,
    requiredCapacityTrucks: 5,
    capacityGapTrucks: -1,
    status: 'SHORTAGE',
  },
  {
    id: 'area-2',
    origin: 'Arba Minch',
    commodity: 'Bananas',
    expectedVolumeTons: 120,
    requiredCapacityTrucks: 12,
    capacityGapTrucks: 0,
    status: 'MATCHED',
  },
  {
    id: 'area-3',
    origin: 'Hawassa',
    commodity: 'Maize',
    expectedVolumeTons: 85,
    requiredCapacityTrucks: 9,
    capacityGapTrucks: 2,
    status: 'SURPLUS',
  },
  {
    id: 'area-4',
    origin: 'Sodo',
    commodity: 'Coffee',
    expectedVolumeTons: 30,
    requiredCapacityTrucks: 3,
    capacityGapTrucks: -2,
    status: 'CRITICAL',
  },
];

export const DEMO_CAPACITY_BOTTLENECK_ALERTS: CapacityBottleneckAlert[] = [
  {
    id: 'cba-1',
    severity: 'HIGH ALERT',
    outlookText: '48h Outlook',
    title: 'Northern Corridor',
    description:
      'High Demand Surge expected in 48 hours due to harvest peak in the Chencha region. Current capacity allocation is insufficient.',
    actionLabel: 'Gap: ~12 Trucks Reallocate Assets ->',
  },
  {
    id: 'cba-2',
    severity: 'MONITOR',
    outlookText: '72h Outlook',
    title: 'Eastern Routes',
    description:
      'Potential delay indicated due to infrastructure maintenance near Depot Alpha. Capacity utilization currently at 92%.',
    actionLabel: 'Monitor Status',
  },
];

export const DEMO_DEMAND_VS_CAPACITY_TIME_SERIES = [
  { weekLabel: 'Wk 32', availableCapacity: 1150, forecastDemand: 920 },
  { weekLabel: 'Wk 33', availableCapacity: 1150, forecastDemand: 1010 },
  { weekLabel: 'Wk 34', availableCapacity: 1150, forecastDemand: 1100 },
  { weekLabel: 'Current', availableCapacity: 1200, forecastDemand: 1200 },
  { weekLabel: 'Wk 36 (F)', availableCapacity: 1200, forecastDemand: 1380 },
  { weekLabel: 'Wk 37 (F)', availableCapacity: 1200, forecastDemand: 1420 },
];

// Screen 3: Shipment Intelligence Detailed List
export const DEMO_DETAILED_SHIPMENTS: DetailedShipmentItem[] = [
  {
    id: 'SH-492',
    commodity: 'Maize',
    route: 'Bonke → Arba Minch',
    volumeTons: 12,
    transporter: 'Gamo Logistics',
    perishabilityRiskPct: 35,
    status: 'In Transit',
    statusText: 'On Schedule',
  },
  {
    id: 'SH-504',
    commodity: 'Bananas',
    route: 'Chencha → Hawassa',
    volumeTons: 8.5,
    transporter: 'Rift Valley Trans',
    perishabilityRiskPct: 78,
    status: 'At Risk',
    statusText: 'Traffic Delay',
  },
  {
    id: 'SH-511',
    commodity: 'Vegetables',
    route: 'Kamba → Addis Ababa',
    volumeTons: 5,
    transporter: 'Highland Express',
    perishabilityRiskPct: 85,
    status: 'Delayed',
    statusText: 'Route Blockage',
  },
  {
    id: 'SH-488',
    commodity: 'Coffee',
    route: 'Dita → Djibouti Port',
    volumeTons: 24,
    transporter: 'Gamo Logistics',
    perishabilityRiskPct: 15,
    status: 'On Time',
    statusText: 'Normal Transit',
  },
];

// Screen 4: Route Intelligence Matrix
export const DEMO_ROUTE_MATRIX: RouteMatrixItem[] = [
  {
    id: 'rm-1',
    routeName: 'Arba Minch → Addis Ababa',
    avgTimeHours: 8.5,
    variability: 'Low',
    reliabilityPct: 94,
    estCostEtbPerTon: 12000,
    status: 'Active',
  },
  {
    id: 'rm-2',
    routeName: 'Sawla → Hawassa',
    avgTimeHours: 6.2,
    variability: 'Medium',
    reliabilityPct: 82,
    estCostEtbPerTon: 8500,
    status: 'Active',
  },
  {
    id: 'rm-3',
    routeName: 'Chencha → Arba Minch',
    avgTimeHours: 1.5,
    variability: 'High',
    reliabilityPct: 68,
    estCostEtbPerTon: 2100,
    status: 'Delayed',
  },
];

export const DEMO_ALTERNATIVE_ROUTE_DATA: AlternativeRouteData = {
  corridorName: 'Arba Minch → Addis Ababa',
  primaryRoute: {
    distanceKm: 450,
    estTravelTime: '8h 00m',
    riskProfile: 'Low Risk',
  },
  alternativeRoute: {
    distanceKm: 480,
    estTravelTime: '9h 30m',
    riskProfile: 'High Risk',
  },
};

// Screen 5: Logistics Risk & Opportunities
export const DEMO_LOGISTICS_RISKS: LogisticsRiskRow[] = [
  {
    id: 'risk-1',
    routeOriginDestination: 'Zone A → Central Hub',
    volumeTons: 142.5,
    statusText: 'Capacity Shortage',
    statusSeverity: 'Critical',
    riskScore: 92,
  },
  {
    id: 'risk-2',
    routeOriginDestination: 'Addis → Arba Minch',
    volumeTons: 85.0,
    statusText: 'Weather Delay',
    statusSeverity: 'High',
    riskScore: 76,
  },
  {
    id: 'risk-3',
    routeOriginDestination: 'Zone C → Processing Unit',
    volumeTons: 210.2,
    statusText: 'Nominal',
    statusSeverity: 'Low',
    riskScore: 12,
  },
  {
    id: 'risk-4',
    routeOriginDestination: 'Northern Hub → Port',
    volumeTons: 450.0,
    statusText: 'Nominal',
    statusSeverity: 'Low',
    riskScore: 8,
  },
];

export const DEMO_LOGISTICS_OPPORTUNITIES: LogisticsOpportunityItem[] = [
  {
    id: 'opp-1',
    title: 'Backhaul Opportunity',
    badgeText: '+18 Tons',
    description: 'Unused capacity detected on returning trucks from Addis to Arba Minch route.',
    suggestedAction: 'Suggested Action: Consolidate fertilizer delivery. ->',
  },
  {
    id: 'opp-2',
    title: 'Route Optimization',
    badgeText: '-12% Cost',
    description: 'Bypass secondary hub for Grain shipments directly to Port saves fuel and time.',
    suggestedAction: 'Suggested Action: Reroute Fleet Beta. ->',
  },
];
