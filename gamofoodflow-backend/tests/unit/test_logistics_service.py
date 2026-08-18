from unittest.mock import MagicMock

import pytest

from app.modules.logistics.application.services import LogisticsService


@pytest.mark.asyncio
async def test_get_shipments():
    mock_repo = MagicMock()
    service = LogisticsService(mock_repo)
    shipments = await service.get_shipments()

    assert len(shipments) == 4
    assert shipments[0].id == "SH-492"
    assert shipments[0].origin == "Bonke Center"
    assert shipments[0].carrier == "Gamo Logistics"


@pytest.mark.asyncio
async def test_get_bottlenecks():
    mock_repo = MagicMock()
    service = LogisticsService(mock_repo)
    bottlenecks = await service.get_bottlenecks()

    assert len(bottlenecks) == 2
    assert bottlenecks[0].id == "b-1"
    assert bottlenecks[0].severity == "Critical"
