import uuid
from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.agriculture.infrastructure.models import (
    CollectionCenterModel,
    FarmModel,
    YieldRecordModel,
)


class AgricultureRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_collection_centers(self) -> Sequence[CollectionCenterModel]:
        query = select(CollectionCenterModel).where(CollectionCenterModel.is_deleted == False)
        result = await self.session.execute(query)
        return result.scalars().all()

    async def get_collection_center_by_id(self, center_id: uuid.UUID) -> CollectionCenterModel | None:
        query = select(CollectionCenterModel).where(
            CollectionCenterModel.id == center_id,
            CollectionCenterModel.is_deleted == False,
        )
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def list_farms(self, limit: int = 100, offset: int = 0) -> Sequence[FarmModel]:
        query = select(FarmModel).where(FarmModel.is_deleted == False).limit(limit).offset(offset)
        result = await self.session.execute(query)
        return result.scalars().all()

    async def create_farm(
        self,
        farmer_id: uuid.UUID,
        name: str,
        size_hectares: float,
        latitude: float,
        longitude: float,
    ) -> FarmModel:
        farm = FarmModel(
            farmer_id=farmer_id,
            name=name,
            size_hectares=size_hectares,
            center_latitude=latitude,
            center_longitude=longitude,
        )
        self.session.add(farm)
        await self.session.commit()
        await self.session.refresh(farm)
        return farm

    async def list_yield_records(self, limit: int = 100, offset: int = 0) -> Sequence[YieldRecordModel]:
        query = select(YieldRecordModel).where(YieldRecordModel.is_deleted == False).limit(limit).offset(offset)
        result = await self.session.execute(query)
        return result.scalars().all()
