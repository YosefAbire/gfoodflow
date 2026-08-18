from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.remote_sensing.infrastructure.models import (
    NDVIObservationModel,
    SatelliteSceneModel,
)


class RemoteSensingRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_scenes(self) -> Sequence[SatelliteSceneModel]:
        query = select(SatelliteSceneModel).where(SatelliteSceneModel.is_deleted == False)
        result = await self.session.execute(query)
        return result.scalars().all()

    async def list_ndvi_observations(self) -> Sequence[NDVIObservationModel]:
        query = select(NDVIObservationModel).where(NDVIObservationModel.is_deleted == False)
        result = await self.session.execute(query)
        return result.scalars().all()
