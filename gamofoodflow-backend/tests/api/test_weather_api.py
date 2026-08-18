import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_list_weather_stations_endpoint(async_client: AsyncClient):
    response = await async_client.get("/api/v1/weather/stations")
    assert response.status_code == 200
    res = response.json()
    assert "data" in res
    assert "meta" in res
    assert res["meta"]["page"] == 1



@pytest.mark.asyncio
async def test_weather_summary_endpoint(async_client: AsyncClient):
    response = await async_client.get("/api/v1/weather/summary?latitude=6.0333&longitude=37.5500&days=30")
    assert response.status_code == 200
    data = response.json()
    assert data["latitude"] == 6.0333
    assert data["longitude"] == 37.5500
    assert "total_rainfall_mm" in data
    assert "avg_temperature_c" in data


@pytest.mark.asyncio
async def test_drought_risk_endpoint(async_client: AsyncClient):
    response = await async_client.get("/api/v1/weather/drought-risk?latitude=6.0333&longitude=37.5500&days=90")
    assert response.status_code == 200
    data = response.json()
    assert data["latitude"] == 6.0333
    assert "spi_index" in data
    assert "severity" in data
    assert "risk_description" in data
