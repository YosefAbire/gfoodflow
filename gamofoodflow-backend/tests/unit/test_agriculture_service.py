from unittest.mock import AsyncMock, MagicMock

import pytest

from app.modules.agriculture.application.services import AgricultureService
from app.shared.enums import CropType


@pytest.mark.asyncio
async def test_get_crop_supply_summary():
    mock_repo = MagicMock()
    service = AgricultureService(mock_repo)
    summary = await service.get_crop_supply_summary()

    assert len(summary) == 4
    assert summary[0].crop == CropType.MAIZE
    assert summary[0].volume_tons == 2840
    assert summary[1].crop == CropType.BANANA
    assert summary[1].volume_tons == 1420


@pytest.mark.asyncio
async def test_get_collection_centers_fallback():
    mock_repo = MagicMock()
    mock_repo.list_collection_centers = AsyncMock(return_value=[])
    service = AgricultureService(mock_repo)
    centers = await service.get_collection_centers()

    assert len(centers) == 3
    assert centers[0].name == "Arba Minch Center"
    assert centers[0].capacity_tons == 1200
    assert centers[0].status == "Critical"
