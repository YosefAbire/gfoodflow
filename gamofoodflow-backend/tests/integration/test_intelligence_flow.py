import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_ai_insights_integration(async_client: AsyncClient):
    response = await async_client.get("/api/v1/intelligence/insights")
    assert response.status_code == 200
    insights = response.json()
    assert len(insights) >= 2
    assert insights[0]["category"] == "Transport"
    assert insights[0]["confidence"] == "HIGH CONFIDENCE"


@pytest.mark.asyncio
async def test_scenario_simulate_integration(async_client: AsyncClient):
    payload = {
        "harvestVolumeChangePct": 25.0,
        "transportCapacityChangePct": -10.0,
        "marketDemandChangePct": 15.0,
        "fuelCostChangePct": 20.0,
        "routeDisruptionsActive": True,
    }
    response = await async_client.post("/api/v1/intelligence/scenario/simulate", json=payload)
    assert response.status_code == 200
    sim = response.json()
    assert sim["transport_shortage_tons"] > 0
    assert sim["food_loss_risk_index"] > 0
    assert len(sim["recommended_interventions"]) >= 1


@pytest.mark.asyncio
async def test_analyst_chat_integration(async_client: AsyncClient):
    payload = {
        "message": "Give me a summary of Maize harvest gap in Bonke",
    }
    response = await async_client.post("/api/v1/intelligence/analyst/chat", json=payload)
    assert response.status_code == 200
    chat = response.json()
    assert chat["sender"] == "analyst"
    assert len(chat["evidence_cards"]) >= 1
