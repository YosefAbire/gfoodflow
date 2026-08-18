from collections.abc import Sequence

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.modules.agriculture.application.schemas import (
    CollectionCenterResponse,
    CropSupplySummary,
    FarmCreate,
    FarmResponse,
)
from app.modules.agriculture.application.services import AgricultureService
from app.modules.agriculture.infrastructure.repositories import AgricultureRepository

router = APIRouter()


def get_agriculture_service(db: AsyncSession = Depends(get_db)) -> AgricultureService:
    repo = AgricultureRepository(db)
    return AgricultureService(repo)


@router.get("/crop-supply", response_model=Sequence[CropSupplySummary], summary="Get crop supply summary by crop type")
async def get_crop_supply(
    service: AgricultureService = Depends(get_agriculture_service),
) -> Sequence[CropSupplySummary]:
    return await service.get_crop_supply_summary()


@router.get("/collection-centers", response_model=Sequence[CollectionCenterResponse], summary="List agricultural collection centers")
async def list_collection_centers(
    service: AgricultureService = Depends(get_agriculture_service),
) -> Sequence[CollectionCenterResponse]:
    return await service.get_collection_centers()


@router.get("/farms", response_model=Sequence[FarmResponse], summary="List registered farms")
async def list_farms(
    limit: int = 100,
    offset: int = 0,
    service: AgricultureService = Depends(get_agriculture_service),
) -> Sequence[FarmResponse]:
    return await service.list_farms(limit=limit, offset=offset)


@router.post("/farms", response_model=FarmResponse, status_code=status.HTTP_201_CREATED, summary="Create farm record")
async def create_farm(
    farm_dto: FarmCreate,
    service: AgricultureService = Depends(get_agriculture_service),
) -> FarmResponse:
    return await service.create_farm(farm_dto)
