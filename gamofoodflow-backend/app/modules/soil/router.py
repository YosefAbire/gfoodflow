from collections.abc import Sequence

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.modules.soil.application.schemas import (
    FertilizerRecommendationResponse,
    SoilHealthSummaryResponse,
    SoilSampleResponse,
)
from app.modules.soil.application.services import SoilService
from app.modules.soil.infrastructure.repositories import SoilRepository

router = APIRouter()


def get_soil_service(db: AsyncSession = Depends(get_db)) -> SoilService:
    repo = SoilRepository(db)
    return SoilService(repo)


@router.get("/samples", response_model=Sequence[SoilSampleResponse], summary="List spatial soil sample observations")
async def list_soil_samples(
    service: SoilService = Depends(get_soil_service),
) -> Sequence[SoilSampleResponse]:
    return await service.list_soil_samples()


@router.get("/summary", response_model=SoilHealthSummaryResponse, summary="Get regional soil health summary")
async def get_soil_summary(
    service: SoilService = Depends(get_soil_service),
) -> SoilHealthSummaryResponse:
    return await service.get_soil_summary()


@router.get("/recommendations", response_model=FertilizerRecommendationResponse, summary="Get crop-specific soil & fertilizer recommendation")
async def get_recommendations(
    crop_type: str = Query("Maize", description="Target crop type"),
    service: SoilService = Depends(get_soil_service),
) -> FertilizerRecommendationResponse:
    return await service.get_fertilizer_recommendation(crop_type)
