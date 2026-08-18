from collections.abc import Sequence

from fastapi import APIRouter, Depends

from app.modules.food_security.application.schemas import (
    AgriculturalRiskResponse,
    FoodSecurityAssessmentResponse,
)
from app.modules.food_security.application.services import FoodSecurityService

router = APIRouter()


def get_food_security_service() -> FoodSecurityService:
    return FoodSecurityService()


@router.get("/assessments", response_model=Sequence[FoodSecurityAssessmentResponse], summary="List IPC-aligned regional food security assessments")
async def get_assessments(
    service: FoodSecurityService = Depends(get_food_security_service),
) -> Sequence[FoodSecurityAssessmentResponse]:
    return await service.get_assessments()


@router.get("/risks", response_model=Sequence[AgriculturalRiskResponse], summary="List agricultural and drought risks by woreda")
async def get_risks(
    service: FoodSecurityService = Depends(get_food_security_service),
) -> Sequence[AgriculturalRiskResponse]:
    return await service.get_agricultural_risks()
