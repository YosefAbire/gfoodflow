import { MarketOpportunity, MarketNodeComparison, CommodityPricePoint } from '@/types';

export const DEMO_MARKET_OPPORTUNITIES: MarketOpportunity[] = [
  {
    id: 'opp-1',
    crop: 'Maize',
    targetNode: 'Arba Minch Central Node',
    opportunityScore: 94,
    badgeLabel: 'HIGH DEFICIT',
    badgeSeverity: 'critical',
    marginPotential: '+22.4%',
  },
  {
    id: 'opp-2',
    crop: 'Banana',
    targetNode: 'Mirab Abaya Wholesale Hub',
    opportunityScore: 88,
    badgeLabel: 'PRICE SPIKING',
    badgeSeverity: 'warning',
    marginPotential: '+18.1%',
  },
  {
    id: 'opp-3',
    crop: 'Enset',
    targetNode: 'Sawla Regional Market',
    opportunityScore: 82,
    badgeLabel: 'STEADY DEMAND',
    badgeSeverity: 'positive',
    marginPotential: '+14.5%',
  },
  {
    id: 'opp-4',
    crop: 'Wheat',
    targetNode: 'Chencha Highland Node',
    opportunityScore: 76,
    badgeLabel: 'MODERATE DEFICIT',
    badgeSeverity: 'warning',
    marginPotential: '+11.2%',
  },
];

export const DEMO_MARKET_NODES: MarketNodeComparison[] = [
  {
    id: 'node-1',
    nodeName: 'Arba Minch Central Node',
    demandLevel: 'Critical',
    avgPriceUsd: 342.50,
    supplyGapTons: -12400,
    trend: 'up',
    primaryCrops: ['Maize', 'Banana', 'Mango'],
  },
  {
    id: 'node-2',
    nodeName: 'Mirab Abaya Market Node',
    demandLevel: 'High',
    avgPriceUsd: 310.00,
    supplyGapTons: -8200,
    trend: 'up',
    primaryCrops: ['Banana', 'Maize'],
  },
  {
    id: 'node-3',
    nodeName: 'Chencha Highland Node',
    demandLevel: 'Moderate',
    avgPriceUsd: 285.40,
    supplyGapTons: -3400,
    trend: 'stable',
    primaryCrops: ['Enset', 'Wheat'],
  },
  {
    id: 'node-4',
    nodeName: 'Sawla Regional Node',
    demandLevel: 'High',
    avgPriceUsd: 298.00,
    supplyGapTons: -5600,
    trend: 'up',
    primaryCrops: ['Maize', 'Coffee'],
  },
];

export const DEMO_PRICE_TRENDS: CommodityPricePoint[] = [
  { week: 'W1', Maize: 280, Banana: 150, Mango: 210, Enset: 130 },
  { week: 'W2', Maize: 286, Banana: 155, Mango: 215, Enset: 132 },
  { week: 'W3', Maize: 292, Banana: 160, Mango: 220, Enset: 135 },
  { week: 'W4', Maize: 300, Banana: 162, Mango: 218, Enset: 138 },
  { week: 'W5', Maize: 312, Banana: 170, Mango: 225, Enset: 140 },
  { week: 'W6', Maize: 320, Banana: 175, Mango: 230, Enset: 142 },
  { week: 'W7', Maize: 332, Banana: 182, Mango: 235, Enset: 145 },
  { week: 'W8', Maize: 340, Banana: 190, Mango: 242, Enset: 148 },
  { week: 'W9', Maize: 348, Banana: 198, Mango: 248, Enset: 152 },
  { week: 'W10', Maize: 352, Banana: 208, Mango: 250, Enset: 155 },
  { week: 'W11', Maize: 350, Banana: 215, Mango: 252, Enset: 158 },
  { week: 'W12', Maize: 355, Banana: 220, Mango: 258, Enset: 160 },
];
