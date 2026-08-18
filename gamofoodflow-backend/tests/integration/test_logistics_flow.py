import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_shipments_integration(async_client: AsyncClient):
    response = await async_client.get("/api/v1/logistics/shipments")
    assert response.status_code == 200
    shipments = response.json()
    assert len(shipments) == 4
    assert shipments[0]["id"] == "SH-492"
    assert shipments[0]["origin"] == "Bonke Center"


@pytest.mark.asyncio
async def test_bottlenecks_integration(async_client: AsyncClient):
    response = await async_client.get("/api/v1/logistics/bottlenecks")
    assert response.status_code == 200
    bottlenecks = response.json()
    assert len(bottlenecks) == 2
    assert bottlenecks[0]["severity"] == "Critical"
    assert bottlenecks[0]["location_name"] == "Chencha Escarpment Pass (Route A7)"


@pytest.mark.asyncio
async def test_route_performance_integration(async_client: AsyncClient):
    response = await async_client.get("/api/v1/logistics/route-performance")
    assert response.status_code == 200
    routes = response.json()
    assert len(routes) == 3
    assert routes[0]["route_name"] == "Northern Corridor"
