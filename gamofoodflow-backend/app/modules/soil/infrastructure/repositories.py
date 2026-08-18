from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.soil.infrastructure.models import SoilSampleModel


class SoilRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_samples(self) -> Sequence[SoilSampleModel]:
        query = select(SoilSampleModel).where(SoilSampleModel.is_deleted == False)
        result = await self.session.execute(query)
        return result.scalars().all()
