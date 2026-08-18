from collections.abc import Sequence

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.modules.remote_sensing.application.schemas import (
    NDVIStatsResponse,
    RasterZonalStatsRequest,
    RasterZonalStatsResponse,
    SatelliteSceneResponse,
)
from app.modules.remote_sensing.application.services import RemoteSensingService
from app.modules.remote_sensing.infrastructure.repositories import RemoteSensingRepository

router = APIRouter()


def get_remote_sensing_service(db: AsyncSession = Depends(get_db)) -> RemoteSensingService:
    repo = RemoteSensingRepository(db)
    return RemoteSensingService(repo)


@router.get("/scenes", response_model=Sequence[SatelliteSceneResponse], summary="List cataloged satellite scenes over Gamo Zone")
async def list_satellite_scenes(
    service: RemoteSensingService = Depends(get_remote_sensing_service),
) -> Sequence[SatelliteSceneResponse]:
    return await service.list_satellite_scenes()


@router.get("/ndvi/summary", response_model=Sequence[NDVIStatsResponse], summary="Get aggregated NDVI vegetation index statistics")
async def get_ndvi_summary(
    service: RemoteSensingService = Depends(get_remote_sensing_service),
) -> Sequence[NDVIStatsResponse]:
    return await service.get_ndvi_summary()


@router.post("/zonal-stats", response_model=RasterZonalStatsResponse, summary="Compute zonal statistics for spatial boundary")
async def compute_zonal_stats(
    request: RasterZonalStatsRequest,
    service: RemoteSensingService = Depends(get_remote_sensing_service),
) -> RasterZonalStatsResponse:
    return await service.compute_zonal_stats(request)
