import { DEMO_MARKET_OPPORTUNITIES, DEMO_MARKET_NODES, DEMO_PRICE_TRENDS } from '@/data/marketData';
import {
  MARKET_KPIS,
  SUPPLY_DEMAND_TRENDS,
  MARKET_ALERTS,
  DEMAND_GROWTH_ITEMS,
  OPPORTUNITY_EXPLORER_ITEMS,
  PRICE_FORECAST_POINTS,
  PRICE_SPREAD,
  PRICE_INTELLIGENCE_TABLE,
  GLOBAL_SEVERITY_DISTRIBUTION,
  EMERGING_RISKS,
  ADDIS_CENTRAL_MARKET_PROFILE,
} from '@/data/marketIntelligenceData';

export const marketService = {
  getMarketOpportunities: async () => DEMO_MARKET_OPPORTUNITIES,
  getMarketNodes: async () => DEMO_MARKET_NODES,
  getPriceTrends: async () => DEMO_PRICE_TRENDS,
  getMarketKPIs: async () => MARKET_KPIS,
  getSupplyDemandTrends: async () => SUPPLY_DEMAND_TRENDS,
  getMarketAlerts: async () => MARKET_ALERTS,
  getDemandGrowthItems: async () => DEMAND_GROWTH_ITEMS,
  getOpportunityExplorerItems: async () => OPPORTUNITY_EXPLORER_ITEMS,
  getPriceForecastPoints: async () => PRICE_FORECAST_POINTS,
  getPriceSpread: async () => PRICE_SPREAD,
  getPriceIntelligenceRows: async () => PRICE_INTELLIGENCE_TABLE,
  getGlobalSeverityDistribution: async () => GLOBAL_SEVERITY_DISTRIBUTION,
  getEmergingRisks: async () => EMERGING_RISKS,
  getAddisCentralMarketProfile: async () => ADDIS_CENTRAL_MARKET_PROFILE,
};
