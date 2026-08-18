from unittest.mock import MagicMock

import pytest

from app.modules.remote_sensing.application.schemas import RasterZonalStatsRequest
from app.modules.remote_sensing.application.services import RemoteSensingService


@pytest.mark.asyncio
async def test_list_satellite_scenes():
    mock_repo = MagicMock()
    service = RemoteSensingService(mock_repo)
    scenes = await service.list_satellite_scenes()

    assert len(scenes) == 2
    assert "Sentinel-2A" in scenes[0].satelliteName or "Landsat-9" in scenes[0].satelliteName
    assert scenes[0].cloudCoverPct < 10.0


@pytest.mark.asyncio
async def test_compute_zonal_stats():
    mock_repo = MagicMock()
    service = RemoteSensingService(mock_repo)
    req = RasterZonalStatsRequest(boundary_id="bnd-1", date_from="2026-08-01", date_to="2026-08-15", index_type="NDVI")
    res = await service.compute_zonal_stats(req)

    assert res.meanValue == 0.68
    assert res.indexType == "NDVI"
    assert "0.6-0.8" in res.histogram
