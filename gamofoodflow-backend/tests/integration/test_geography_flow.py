import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_list_boundaries_integration(async_client: AsyncClient):
    """Test listing administrative boundaries by level."""
    response = await async_client.get("/api/v1/geography/boundaries?level=ZONE")
    assert response.status_code == 200
    boundaries = response.json()
    assert isinstance(boundaries, list)


@pytest.mark.asyncio
async def test_geojson_boundaries_integration(async_client: AsyncClient):
    """Test GeoJSON FeatureCollection boundary API endpoint."""
    response = await async_client.get("/api/v1/geography/geojson/boundaries")
    assert response.status_code == 200
    geojson = response.json()
    assert geojson["type"] == "FeatureCollection"
    assert "features" in geojson


@pytest.mark.asyncio
async def test_mvt_vector_tile_integration(async_client: AsyncClient):
    """Test Mapbox Vector Tile (.pbf) endpoint."""
    response = await async_client.get("/api/v1/geography/tiles/10/615/482.pbf")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/x-protobuf"
