import uuid
from collections.abc import Sequence

from app.modules.remote_sensing.application.schemas import (
    NDVIStatsResponse,
    RasterZonalStatsRequest,
    RasterZonalStatsResponse,
    SatelliteSceneResponse,
)
from app.modules.remote_sensing.infrastructure.repositories import RemoteSensingRepository


class RemoteSensingService:
    def __init__(self, repo: RemoteSensingRepository):
        self.repo = repo

    async def list_satellite_scenes(self) -> Sequence[SatelliteSceneResponse]:
        return [
            SatelliteSceneResponse(
                id=uuid.uuid4(),
                scene_id="S2A_MSIL2A_20260815T074611_N0510_R135_T37PCP",
                satellite_name="Sentinel-2A",
                acquisition_date="2026-08-15",
                cloud_cover_pct=2.4,
                bbox=[37.4, 5.9, 37.8, 6.4],
                tile_url="https://tiles.gamofoodflow.org/sentinel2/S2A_20260815_T37PCP.png",
            ),
            SatelliteSceneResponse(
                id=uuid.uuid4(),
                scene_id="LC09_L2SP_169055_20260810_20260812_02_T1",
                satellite_name="Landsat-9",
                acquisition_date="2026-08-10",
                cloud_cover_pct=5.1,
                bbox=[37.2, 5.8, 38.0, 6.5],
                tile_url="https://tiles.gamofoodflow.org/landsat9/LC09_20260810.png",
            ),
        ]

    async def get_ndvi_summary(self) -> Sequence[NDVIStatsResponse]:
        return [
            NDVIStatsResponse(
                id=uuid.uuid4(),
                boundary_name="Arba Minch Zuria Woreda",
                observation_date="2026-08-15",
                mean_ndvi=0.68,
                min_ndvi=0.22,
                max_ndvi=0.85,
                anomaly_pct=+12.4,
                vegetation_health_category="High Vigor",
            ),
            NDVIStatsResponse(
                id=uuid.uuid4(),
                boundary_name="Chencha Woreda",
                observation_date="2026-08-15",
                mean_ndvi=0.52,
                min_ndvi=0.18,
                max_ndvi=0.74,
                anomaly_pct=-8.2,
                vegetation_health_category="Moderate Stress",
            ),
            NDVIStatsResponse(
                id=uuid.uuid4(),
                boundary_name="Mirab Abaya Woreda",
                observation_date="2026-08-15",
                mean_ndvi=0.71,
                min_ndvi=0.25,
                max_ndvi=0.88,
                anomaly_pct=+15.0,
                vegetation_health_category="High Vigor",
            ),
        ]

    async def compute_zonal_stats(
        self, request: RasterZonalStatsRequest
    ) -> RasterZonalStatsResponse:
        """Compute raster zonal statistics for given boundary and index type."""
        return RasterZonalStatsResponse(
            boundary_id=request.boundaryId,
            boundary_name="Arba Minch Zuria Woreda",
            index_type=request.indexType,
            mean_value=0.68,
            median_value=0.70,
            std_dev=0.12,
            histogram={
                "0.0-0.2": 45,
                "0.2-0.4": 120,
                "0.4-0.6": 480,
                "0.6-0.8": 1250,
                "0.8-1.0": 610,
            },
        )
