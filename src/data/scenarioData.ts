import { ScenarioInput, ScenarioOutput } from '@/types';

export function runScenarioSimulation(input: ScenarioInput): ScenarioOutput {
  const baseDemand = 486;
  const baseCapacity = 412;

  const adjustedHarvest = baseDemand * (1 + input.harvestVolumeChangePct / 100);
  const adjustedCapacity = baseCapacity * (1 + input.transportCapacityChangePct / 100) * (input.routeDisruptionsActive ? 0.85 : 1.0);

  const transportShortageTons = Math.max(0, Math.round(adjustedHarvest - adjustedCapacity));
  const marketPricePressurePct = Math.round(
    ((input.harvestVolumeChangePct * -0.6) + (input.marketDemandChangePct * 1.1) + (input.fuelCostChangePct * 0.4)) * 10
  ) / 10;

  const foodLossRiskIndex = Math.min(100, Math.max(0, Math.round((transportShortageTons / 10) + (input.routeDisruptionsActive ? 25 : 0))));
  const estimatedCostUsd = Math.round(transportShortageTons * 180 + (input.fuelCostChangePct * 450));

  const interventions: string[] = [];

  if (transportShortageTons > 50) {
    interventions.push('Contract 15 additional 10-ton flatbed trucks from regional logistics pool');
  }
  if (input.routeDisruptionsActive) {
    interventions.push('Activate Southern Bypass route via Lake Chamo road to avoid Chencha Escarpment bottleneck');
  }
  if (input.harvestVolumeChangePct > 15) {
    interventions.push('Setup temporary mobile shade aggregation sites in Arba Minch Zuria');
  }
  if (input.fuelCostChangePct > 10) {
    interventions.push('Consolidate LTL (Less-than-truckload) shipments into joint cooperative routes');
  }
  if (interventions.length === 0) {
    interventions.push('Maintain standard operational schedule; no critical bottleneck detected.');
  }

  return {
    transportShortageTons,
    marketPricePressurePct,
    foodLossRiskIndex,
    estimatedCostUsd,
    recommendedInterventions: interventions,
  };
}
