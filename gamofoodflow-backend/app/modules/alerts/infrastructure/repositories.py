from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.alerts.infrastructure.models import AlertRuleModel, NotificationModel


class AlertRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_rules(self) -> Sequence[AlertRuleModel]:
        query = select(AlertRuleModel).where(AlertRuleModel.is_deleted == False)
        result = await self.session.execute(query)
        return result.scalars().all()

    async def list_notifications(self) -> Sequence[NotificationModel]:
        query = select(NotificationModel).where(NotificationModel.is_deleted == False)
        result = await self.session.execute(query)
        return result.scalars().all()
