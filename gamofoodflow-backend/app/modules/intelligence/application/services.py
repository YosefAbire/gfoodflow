import uuid
from collections.abc import Sequence
from datetime import UTC, datetime

from app.modules.intelligence.application.schemas import (
    AIInsightResponse,
    AnalystChatMessageRequest,
    AnalystChatMessageResponse,
    ScenarioInputRequest,
    ScenarioOutputResponse,
)


class IntelligenceService:

    async def get_ai_insights(self) -> Sequence[AIInsightResponse]:
        return [
            AIInsightResponse(
                id="insight-1",
                title="Imminent Transport Deficit in Bonke Woreda",
                category="Transport",
                confidence="HIGH CONFIDENCE",
                summary="Peak Maize harvest in Bonke (estimated +2,840 tons) exceeds local collection capacity by 34%. High risk of post-harvest loss within 14 days without logistics rerouting.",
                contributing_factors=[
                    "Heavy rain forecasts on Route A7 Escarpment",
                    "Fleet allocation gap: 12 trucks short",
                    "Perishability window for fresh produce",
                ],
                recommended_action="Reallocate 10 empty return trucks from Hawassa Corridor to Bonke Collection Center within 48 hours.",
                affected_zone_ids=["zone-bonke", "zone-arba-minch"],
                evidence_data={
                    "forecastGap": "+960 Tons Uncollected",
                    "financialImpact": "~$145,000 Potential Loss",
                    "timeframe": "Next 7 Days",
                },
            ),
            AIInsightResponse(
                id="insight-2",
                title="Banana Price Surge in Mirab Abaya Market",
                category="Market",
                confidence="HIGH CONFIDENCE",
                summary="Market wholesale prices for Cavendish bananas spiked +18.1% due to regional buyer demand from Addis Ababa and Hawassa.",
                contributing_factors=[
                    "High buyer concentration in Addis Central Wholesale",
                    "Fuel price increase (+15%) raising freight tariffs",
                ],
                recommended_action="Facilitate direct farm-gate contract agreements for smallholders to capture higher profit margins.",
                affected_zone_ids=["zone-mirab-abaya"],
                evidence_data={
                    "forecastGap": "+18.1% Price Delta",
                    "financialImpact": "+$82,000 Producer Revenue",
                    "timeframe": "Active Now",
                },
            ),
        ]

    async def run_scenario_simulation(
        self, input_dto: ScenarioInputRequest
    ) -> ScenarioOutputResponse:
        """Dynamic Scenario Simulation Engine.
        Calculates transport shortages, price pressures, food loss index, and cost estimates.
        """
        base_shortage_tons = 420.0
        harvest_effect = (input_dto.harvestVolumeChangePct / 100.0) * 800.0
        capacity_effect = (input_dto.transportCapacityChangePct / 100.0) * 600.0
        disruption_penalty = 350.0 if input_dto.routeDisruptionsActive else 0.0

        calculated_shortage = max(0.0, base_shortage_tons + harvest_effect - capacity_effect + disruption_penalty)

        base_price_pressure = 4.5
        demand_effect = (input_dto.marketDemandChangePct / 100.0) * 8.0
        fuel_effect = (input_dto.fuelCostChangePct / 100.0) * 5.0
        calculated_price_pressure = max(0.0, base_price_pressure + demand_effect + fuel_effect)

        food_loss_index = min(100.0, max(0.0, (calculated_shortage / 1200.0) * 100.0))

        estimated_cost = (calculated_shortage * 180.0) + (fuel_effect * 1200.0)

        interventions = []
        if calculated_shortage > 300:
            interventions.append("Deploy 15 emergency transport vehicles to high-yield clusters.")
        if input_dto.fuelCostChangePct > 10:
            interventions.append("Subsidize corridor freight rates for key food security commodities.")
        if input_dto.routeDisruptionsActive:
            interventions.append("Activate alternative bypass corridor via Sawla-Hawassa Link.")
        if not interventions:
            interventions.append("Logistics baseline is stable; continue standard monitoring.")

        return ScenarioOutputResponse(
            transport_shortage_tons=round(calculated_shortage, 1),
            market_price_pressure_pct=round(calculated_price_pressure, 1),
            food_loss_risk_index=round(food_loss_index, 1),
            estimated_cost_usd=round(estimated_cost, 2),
            recommended_interventions=interventions,
        )

    async def chat_with_analyst(
        self, request: AnalystChatMessageRequest
    ) -> AnalystChatMessageResponse:
        text_response = (
            f"Based on real-time spatial and market telemetry in Gamo Zone, "
            f"I analyzed your query: '{request.message}'. "
            f"Current regional supply reserves stand at 4,980 Tons, with Maize representing 57% of total volume. "
            f"Logistics bottleneck alert is ACTIVE on the Chencha Escarpment Pass."
        )

        cards = [
            {
                "type": "forecast",
                "title": "Maize Harvest Forecast",
                "stat": "+2,840 Tons",
                "detail": "Peak harvest window expected in October",
            },
            {
                "type": "capacity",
                "title": "Arba Minch Center Utilization",
                "stat": "92% Critical",
                "detail": "1,104 Tons stored out of 1,200 Tons capacity",
            },
        ]

        return AnalystChatMessageResponse(
            id=str(uuid.uuid4()),
            sender="analyst",
            timestamp=datetime.now(UTC).strftime("%H:%M"),
            text=text_response,
            evidence_cards=cards,
        )
