import { fetchWithFallback } from '@/lib/apiClient';
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
  getShipments: async () => 
    fetchWithFallback('/logistics/shipments', DEMO_SHIPMENTS),

  getRoutePerformance: async () => 
    fetchWithFallback('/logistics/route-performance', DEMO_ROUTE_PERFORMANCE),

  getBottlenecks: async () => 
    fetchWithFallback('/logistics/bottlenecks', DEMO_LOGISTICS_BOTTLENECK),

  getTransportDemand: async () => 
    fetchWithFallback('/logistics/transport-demand', DEMO_TRANSPORT_DEMAND),

  getCapacityDemandAreas: async () => 
    fetchWithFallback('/logistics/capacity-demand-areas', DEMO_CAPACITY_DEMAND_AREAS),

  getCapacityBottleneckAlerts: async () => 
    fetchWithFallback('/logistics/bottleneck-alerts', DEMO_CAPACITY_BOTTLENECK_ALERTS),

  getDemandVsCapacityTimeSeries: async () => 
    fetchWithFallback('/logistics/demand-vs-capacity', DEMO_DEMAND_VS_CAPACITY_TIME_SERIES),

  getDetailedShipments: async () => 
    fetchWithFallback('/logistics/detailed-shipments', DEMO_DETAILED_SHIPMENTS),

  getRouteMatrix: async () => 
    fetchWithFallback('/logistics/route-matrix', DEMO_ROUTE_MATRIX),

  getAlternativeRouteData: async () => 
    fetchWithFallback('/logistics/alternative-routes', DEMO_ALTERNATIVE_ROUTE_DATA),

  getLogisticsRisks: async () => 
    fetchWithFallback('/logistics/risks', DEMO_LOGISTICS_RISKS),

  getLogisticsOpportunities: async () => 
    fetchWithFallback('/logistics/opportunities', DEMO_LOGISTICS_OPPORTUNITIES),
};
