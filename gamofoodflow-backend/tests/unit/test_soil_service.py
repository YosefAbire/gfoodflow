from unittest.mock import MagicMock

import pytest

from app.modules.soil.application.services import SoilService


@pytest.mark.asyncio
async def test_list_soil_samples():
    mock_repo = MagicMock()
    service = SoilService(mock_repo)
    samples = await service.list_soil_samples()

    assert len(samples) == 3
    assert samples[0].locationName == "Arba Minch Zuria Cluster"
    assert samples[0].phLevel == 6.8


@pytest.mark.asyncio
async def test_get_fertilizer_recommendation():
    mock_repo = MagicMock()
    service = SoilService(mock_repo)
    rec = await service.get_fertilizer_recommendation("Maize")

    assert rec.cropType == "Maize"
    assert rec.recommendedNpsKgPerHa == 100.0
    assert rec.recommendedUreaKgPerHa == 150.0
