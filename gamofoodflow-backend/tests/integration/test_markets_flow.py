import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_market_opportunities_integration(async_client: AsyncClient):
    response = await async_client.get("/api/v1/markets/opportunities")
    assert response.status_code == 200
    opps = response.json()
    assert len(opps) == 4
    assert opps[0]["target_node"] == "Arba Minch Central Node"


@pytest.mark.asyncio
async def test_market_nodes_integration(async_client: AsyncClient):
    response = await async_client.get("/api/v1/markets/nodes")
    assert response.status_code == 200
    nodes = response.json()
    assert len(nodes) == 4
    assert nodes[0]["node_name"] == "Arba Minch Central Node"


@pytest.mark.asyncio
async def test_market_kpis_integration(async_client: AsyncClient):
    response = await async_client.get("/api/v1/markets/kpis")
    assert response.status_code == 200
    kpis = response.json()
    assert kpis["regionalAvgPriceEtb"] == 38.5
    assert kpis["activeHighDeficitMarkets"] == 3


@pytest.mark.asyncio
async def test_price_trends_integration(async_client: AsyncClient):
    response = await async_client.get("/api/v1/markets/price-trends")
    assert response.status_code == 200
    trends = response.json()
    assert len(trends) == 12
    assert trends[0]["week"] == "W1"
