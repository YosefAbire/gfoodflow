from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.logistics.infrastructure.models import LogisticsBottleneckModel, ShipmentModel


class LogisticsRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_shipments(self) -> Sequence[ShipmentModel]:
        query = select(ShipmentModel).where(ShipmentModel.is_deleted == False)
        result = await self.session.execute(query)
        return result.scalars().all()

    async def list_bottlenecks(self) -> Sequence[LogisticsBottleneckModel]:
        query = select(LogisticsBottleneckModel).where(LogisticsBottleneckModel.is_deleted == False)
        result = await self.session.execute(query)
        return result.scalars().all()
