import uuid
from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.weather.infrastructure.models import WeatherStationModel


class WeatherRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_stations(self, limit: int = 100, offset: int = 0) -> Sequence[WeatherStationModel]:
        query = select(WeatherStationModel).where(WeatherStationModel.is_deleted == False).limit(limit).offset(offset)
        result = await self.session.execute(query)
        return result.scalars().all()

    async def get_station_by_id(self, station_id: uuid.UUID) -> WeatherStationModel | None:
        query = select(WeatherStationModel).where(WeatherStationModel.id == station_id, WeatherStationModel.is_deleted == False)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def create_station(
        self,
        name: str,
        code: str,
        latitude: float,
        longitude: float,
        elevation_meters: float | None = None,
    ) -> WeatherStationModel:
        station = WeatherStationModel(
            name=name,
            code=code,
            latitude=latitude,
            longitude=longitude,
            elevation_meters=elevation_meters,
        )
        self.session.add(station)
        await self.session.commit()
        await self.session.refresh(station)
        return station
