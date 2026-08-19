import { fetchWithFallback } from '@/lib/apiClient';
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
  getMarketOpportunities: async () => 
    fetchWithFallback('/markets/opportunities', DEMO_MARKET_OPPORTUNITIES),

  getMarketNodes: async () => 
    fetchWithFallback('/markets/nodes', DEMO_MARKET_NODES),

  getPriceTrends: async () => 
    fetchWithFallback('/markets/price-trends', DEMO_PRICE_TRENDS),

  getMarketKPIs: async () => 
    fetchWithFallback('/markets/kpis', MARKET_KPIS),

  getSupplyDemandTrends: async () => 
    fetchWithFallback('/markets/supply-demand-trends', SUPPLY_DEMAND_TRENDS),

  getMarketAlerts: async () => 
    fetchWithFallback('/markets/alerts', MARKET_ALERTS),

  getDemandGrowthItems: async () => 
    fetchWithFallback('/markets/demand-growth', DEMAND_GROWTH_ITEMS),

  getOpportunityExplorerItems: async () => 
    fetchWithFallback('/markets/opportunity-explorer', OPPORTUNITY_EXPLORER_ITEMS),

  getPriceForecastPoints: async () => 
    fetchWithFallback('/markets/price-forecast', PRICE_FORECAST_POINTS),

  getPriceSpread: async () => 
    fetchWithFallback('/markets/price-spread', PRICE_SPREAD),

  getPriceIntelligenceRows: async () => 
    fetchWithFallback('/markets/price-intelligence', PRICE_INTELLIGENCE_TABLE),

  getGlobalSeverityDistribution: async () => 
    fetchWithFallback('/markets/severity-distribution', GLOBAL_SEVERITY_DISTRIBUTION),

  getEmergingRisks: async () => 
    fetchWithFallback('/markets/emerging-risks', EMERGING_RISKS),

  getAddisCentralMarketProfile: async () => 
    fetchWithFallback('/markets/addis-profile', ADDIS_CENTRAL_MARKET_PROFILE),
};
