import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_crop_supply_summary_integration(async_client: AsyncClient):
    """Test Crop Supply Summary API matching DEMO_CROP_SUPPLY."""
    response = await async_client.get("/api/v1/agriculture/crop-supply")
    assert response.status_code == 200
    crops = response.json()
    assert len(crops) == 4
    crops_dict = {c["crop"]: c["volume_tons"] for c in crops}
    assert crops_dict["Maize"] == 2840
    assert crops_dict["Banana"] == 1420


@pytest.mark.asyncio
async def test_collection_centers_integration(async_client: AsyncClient):
    """Test Collection Centers API endpoint."""
    response = await async_client.get("/api/v1/agriculture/collection-centers")
    assert response.status_code == 200
    centers = response.json()
    assert len(centers) >= 3
    assert centers[0]["name"] == "Arba Minch Center"
    assert centers[0]["status"] == "Critical"
