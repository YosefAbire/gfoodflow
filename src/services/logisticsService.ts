import {
  DEMO_SHIPMENTS,
  DEMO_ROUTE_PERFORMANCE,
  DEMO_LOGISTICS_BOTTLENECK,
  DEMO_TRANSPORT_DEMAND,
  DEMO_CAPACITY_DEMAND_AREAS,
  DEMO_CAPACITY_BOTTLENECK_ALERTS,
  DEMO_DEMAND_VS_CAPACITY_TIME_SERIES,
  DEMO_DETAILED_SHIPMENTS,
  DEMO_ROUTE_MATRIX,
  DEMO_ALTERNATIVE_ROUTE_DATA,
  DEMO_LOGISTICS_RISKS,
  DEMO_LOGISTICS_OPPORTUNITIES,
} from '@/data/logisticsData';

export const logisticsService = {
  getShipments: async () => DEMO_SHIPMENTS,
  getRoutePerformance: async () => DEMO_ROUTE_PERFORMANCE,
  getBottlenecks: async () => DEMO_LOGISTICS_BOTTLENECK,
  getTransportDemand: async () => DEMO_TRANSPORT_DEMAND,
  getCapacityDemandAreas: async () => DEMO_CAPACITY_DEMAND_AREAS,
  getCapacityBottleneckAlerts: async () => DEMO_CAPACITY_BOTTLENECK_ALERTS,
  getDemandVsCapacityTimeSeries: async () => DEMO_DEMAND_VS_CAPACITY_TIME_SERIES,
  getDetailedShipments: async () => DEMO_DETAILED_SHIPMENTS,
  getRouteMatrix: async () => DEMO_ROUTE_MATRIX,
  getAlternativeRouteData: async () => DEMO_ALTERNATIVE_ROUTE_DATA,
  getLogisticsRisks: async () => DEMO_LOGISTICS_RISKS,
  getLogisticsOpportunities: async () => DEMO_LOGISTICS_OPPORTUNITIES,
};
