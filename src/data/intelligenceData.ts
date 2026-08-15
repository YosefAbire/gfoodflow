import { AIInsight, FoodFlowAnalystMessage } from '@/types';

export const DEMO_AI_INSIGHTS: AIInsight[] = [
  {
    id: 'insight-1',
    title: 'TRANSPORT CAPACITY DEFICIT IN ARBA MINCH',
    category: 'Transport',
    confidence: 'HIGH CONFIDENCE',
    summary: 'Expected agricultural supply of Maize and Banana in Arba Minch Zuria is projected to exceed available transport capacity by 74 tons during Wk 43-44 harvest peak.',
    contributingFactors: [
      'Maize harvest volume ramping up +35% week-on-week in Arba Minch Zuria',
      'Available commercial truck fleet currently capped at 412 tons total capacity',
      'Route slowdowns on Central Pass adding +1.2 hours transit delay',
    ],
    recommendedAction: 'Re-route 30 tons of truck capacity from Chencha Highlands (Zone C) or activate spot market transport cooperatives before Wk 43.',
    affectedZoneIds: ['zone-a'],
    evidenceData: {
      forecastGap: '-74 Tons Shortage',
      financialImpact: 'Est. $14,200 potential post-harvest loss',
      timeframe: 'Next 14 Days',
    },
  },
  {
    id: 'insight-2',
    title: 'MARKET PREMIUM OPPORTUNITY IN MIRAB ABAYA',
    category: 'Market',
    confidence: 'HIGH CONFIDENCE',
    summary: 'Wholesale Banana prices in Mirab Abaya Node have risen 18.1% due to supply gap in regional markets.',
    contributingFactors: [
      'Regional supply gap of 8,200 MT across central markets',
      'High buyer demand from external distribution networks',
    ],
    recommendedAction: 'Prioritize dispatching high-grade Banana shipments from Arba Minch Center to Mirab Abaya Wholesale Node to capture high market premium.',
    affectedZoneIds: ['zone-b'],
    evidenceData: {
      forecastGap: '+18.1% Price Spike',
      financialImpact: '22% margin expansion potential',
      timeframe: 'Current 7-Day Window',
    },
  },
  {
    id: 'insight-3',
    title: 'CHENCHA HUB STORAGE BOTTLENECK PRE-ALERT',
    category: 'Supply',
    confidence: 'MEDIUM CONFIDENCE',
    summary: 'Arba Minch Collection Center has reached 92% capacity utilization. Inflow rates could overflow storage within 72 hours.',
    contributingFactors: [
      'Concentrated harvest delivery from 3,840 smallholder farmers',
      'Slower outbound logistics dispatch rate',
    ],
    recommendedAction: 'Initiate emergency transfer of 150 tons to Mirab Abaya Center (currently at 78% capacity).',
    affectedZoneIds: ['zone-a', 'zone-b'],
    evidenceData: {
      forecastGap: '92% Utilization',
      financialImpact: 'Spoilage risk on 180t perishable crop',
      timeframe: 'Immediate (72 hours)',
    },
  },
];

export const INITIAL_ANALYST_MESSAGES: FoodFlowAnalystMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    timestamp: '09:14 AM',
    text: 'Why is Zone A (Arba Minch Zuria) highlighted at High Risk for the upcoming harvest?',
  },
  {
    id: 'msg-2',
    sender: 'analyst',
    timestamp: '09:14 AM',
    text: 'Zone A (Arba Minch Zuria) is showing elevated risk because forecasted harvest volume is increasing by +35% while available transport capacity remains capped below expected peak demand. Additionally, Arba Minch Collection Center is currently operating at 92% capacity.',
    evidenceCards: [
      {
        type: 'forecast',
        title: 'Maize & Banana Forecast',
        stat: '1,420 Tons Expected',
        detail: '+35% surge during Wk 43-44 peak harvest window',
      },
      {
        type: 'capacity',
        title: 'Transport Capacity Deficit',
        stat: '-74 Tons Shortage',
        detail: 'Required 486t vs Available 412t commercial fleet',
      },
      {
        type: 'risk',
        title: 'Center Utilization',
        stat: '92% Critical',
        detail: '1,104t stored in 1,200t facility capacity',
      },
    ],
  },
];
