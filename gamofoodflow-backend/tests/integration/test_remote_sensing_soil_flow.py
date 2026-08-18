import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_satellite_scenes_integration(async_client: AsyncClient):
    response = await async_client.get("/api/v1/remote-sensing/scenes")
    assert response.status_code == 200
    scenes = response.json()
    assert len(scenes) == 2


@pytest.mark.asyncio
async def test_ndvi_summary_integration(async_client: AsyncClient):
    response = await async_client.get("/api/v1/remote-sensing/ndvi/summary")
    assert response.status_code == 200
    ndvi = response.json()
    assert len(ndvi) == 3
    assert ndvi[0]["boundary_name"] == "Arba Minch Zuria Woreda"
    assert ndvi[0]["mean_ndvi"] == 0.68


@pytest.mark.asyncio
async def test_soil_samples_integration(async_client: AsyncClient):
    response = await async_client.get("/api/v1/soil/samples")
    assert response.status_code == 200
    samples = response.json()
    assert len(samples) == 3
    assert samples[0]["location_name"] == "Arba Minch Zuria Cluster"


@pytest.mark.asyncio
async def test_soil_recommendation_integration(async_client: AsyncClient):
    response = await async_client.get("/api/v1/soil/recommendations?crop_type=Banana")
    assert response.status_code == 200
    rec = response.json()
    assert rec["crop_type"] == "Banana"
    assert rec["recommended_nps_kg_per_ha"] == 80.0
