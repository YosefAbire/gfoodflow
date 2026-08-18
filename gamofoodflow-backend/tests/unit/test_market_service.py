from unittest.mock import MagicMock

import pytest

from app.modules.markets.application.services import MarketService


@pytest.mark.asyncio
async def test_get_market_opportunities():
    mock_repo = MagicMock()
    service = MarketService(mock_repo)
    opps = await service.get_market_opportunities()

    assert len(opps) == 4
    assert opps[0].targetNode == "Arba Minch Central Node"
    assert opps[0].opportunityScore == 94
    assert opps[0].marginPotential == "+22.4%"


@pytest.mark.asyncio
async def test_get_market_kpis():
    mock_repo = MagicMock()
    service = MarketService(mock_repo)
    kpis = await service.get_market_kpis()

    assert kpis.regionalAvgPriceEtb == 38.5
    assert kpis.activeHighDeficitMarkets == 3
