from collections.abc import Sequence

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.modules.alerts.application.schemas import AlertRuleResponse, NotificationResponse
from app.modules.alerts.application.services import AlertService
from app.modules.alerts.infrastructure.repositories import AlertRepository

router = APIRouter()


def get_alert_service(db: AsyncSession = Depends(get_db)) -> AlertService:
    repo = AlertRepository(db)
    return AlertService(repo)


@router.get("/rules", response_model=Sequence[AlertRuleResponse], summary="List automated monitoring alert rules")
async def list_rules(
    service: AlertService = Depends(get_alert_service),
) -> Sequence[AlertRuleResponse]:
    return await service.list_alert_rules()


@router.get("/notifications", response_model=Sequence[NotificationResponse], summary="Get system alert notifications feed")
async def list_notifications(
    service: AlertService = Depends(get_alert_service),
) -> Sequence[NotificationResponse]:
    return await service.list_notifications()
