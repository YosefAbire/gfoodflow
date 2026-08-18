import pytest

from app.modules.intelligence.application.schemas import (
    AnalystChatMessageRequest,
    ScenarioInputRequest,
)
from app.modules.intelligence.application.services import IntelligenceService


@pytest.mark.asyncio
async def test_scenario_simulation_calculation():
    service = IntelligenceService()
    input_dto = ScenarioInputRequest(
        harvestVolumeChangePct=20.0,
        transportCapacityChangePct=0.0,
        marketDemandChangePct=10.0,
        fuelCostChangePct=15.0,
        routeDisruptionsActive=True,
    )
    output = await service.run_scenario_simulation(input_dto)

    assert output.transportShortageTons > 0
    assert output.foodLossRiskIndex > 0
    assert len(output.recommendedInterventions) >= 1


@pytest.mark.asyncio
async def test_analyst_chat_service():
    service = IntelligenceService()
    req = AnalystChatMessageRequest(message="What is the transport situation in Bonke?")
    resp = await service.chat_with_analyst(req)

    assert resp.sender == "analyst"
    assert "Bonke" in resp.text or "Gamo Zone" in resp.text
    assert len(resp.evidenceCards) >= 1
