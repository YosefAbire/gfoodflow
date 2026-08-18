import json
import uuid
from collections.abc import Sequence

from geoalchemy2.functions import (
    ST_AsGeoJSON,
    ST_Contains,
    ST_DWithin,
    ST_GeomFromGeoJSON,
    ST_MakePoint,
    ST_SetSRID,
    ST_Transform,
)
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.geography.domain.entities import AdministrativeBoundary
from app.modules.geography.domain.enums import GeographyType
from app.modules.geography.domain.interfaces import IGeographyRepository
from app.modules.geography.infrastructure.models import AdministrativeBoundaryModel


class PostGISGeographyRepository(IGeographyRepository):

    def __init__(self, session: AsyncSession):
        self.session = session

    def _to_entity(self, model: AdministrativeBoundaryModel, geojson: dict | None = None) -> AdministrativeBoundary:
        return AdministrativeBoundary(
            id=model.id,
            name=model.name,
            code=model.code,
            admin_level=model.admin_level,
            parent_id=model.parent_id,
            geojson_geometry=geojson,
            area_sq_km=model.area_sq_km,
            population=model.population,
            created_at=model.created_at,
            updated_at=model.updated_at,
        )

    async def get_by_id(self, boundary_id: uuid.UUID) -> AdministrativeBoundary | None:
        query = select(
            AdministrativeBoundaryModel,
            ST_AsGeoJSON(AdministrativeBoundaryModel.geom).label("geojson"),
        ).where(
            AdministrativeBoundaryModel.id == boundary_id,
            AdministrativeBoundaryModel.is_deleted == False,
        )
        result = await self.session.execute(query)
        row = result.first()
        if not row:
            return None
        model, geojson_str = row
        geojson_dict = json.loads(geojson_str) if geojson_str else None
        return self._to_entity(model, geojson_dict)

    async def get_by_code(self, code: str) -> AdministrativeBoundary | None:
        query = select(
            AdministrativeBoundaryModel,
            ST_AsGeoJSON(AdministrativeBoundaryModel.geom).label("geojson"),
        ).where(
            AdministrativeBoundaryModel.code == code,
            AdministrativeBoundaryModel.is_deleted == False,
        )
        result = await self.session.execute(query)
        row = result.first()
        if not row:
            return None
        model, geojson_str = row
        geojson_dict = json.loads(geojson_str) if geojson_str else None
        return self._to_entity(model, geojson_dict)

    async def list_by_level(
        self,
        level: GeographyType,
        parent_id: uuid.UUID | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> Sequence[AdministrativeBoundary]:
        query = select(
            AdministrativeBoundaryModel,
            ST_AsGeoJSON(AdministrativeBoundaryModel.geom).label("geojson"),
        ).where(
            AdministrativeBoundaryModel.admin_level == level,
            AdministrativeBoundaryModel.is_deleted == False,
        )
        if parent_id:
            query = query.where(AdministrativeBoundaryModel.parent_id == parent_id)

        query = query.limit(limit).offset(offset)
        result = await self.session.execute(query)
        
        entities = []
        for row in result.all():
            model, geojson_str = row
            geojson_dict = json.loads(geojson_str) if geojson_str else None
            entities.append(self._to_entity(model, geojson_dict))
        return entities

    async def find_containing_point(
        self, latitude: float, longitude: float
    ) -> AdministrativeBoundary | None:
        point = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
        query = select(
            AdministrativeBoundaryModel,
            ST_AsGeoJSON(AdministrativeBoundaryModel.geom).label("geojson"),
        ).where(
            ST_Contains(AdministrativeBoundaryModel.geom, point),
            AdministrativeBoundaryModel.is_deleted == False,
        ).order_by(AdministrativeBoundaryModel.admin_level.desc())  # Find most specific level first

        result = await self.session.execute(query)
        row = result.first()
        if not row:
            return None
        model, geojson_str = row
        geojson_dict = json.loads(geojson_str) if geojson_str else None
        return self._to_entity(model, geojson_dict)

    async def find_nearby(
        self, latitude: float, longitude: float, radius_km: float = 10.0
    ) -> Sequence[AdministrativeBoundary]:
        # Transform EPSG:4326 to EPSG:3857 (meter-based spatial projection) for accurate radius
        point_4326 = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
        radius_meters = radius_km * 1000.0

        query = select(
            AdministrativeBoundaryModel,
            ST_AsGeoJSON(AdministrativeBoundaryModel.geom).label("geojson"),
        ).where(
            ST_DWithin(
                ST_Transform(AdministrativeBoundaryModel.geom, 3857),
                ST_Transform(point_4326, 3857),
                radius_meters,
            ),
            AdministrativeBoundaryModel.is_deleted == False,
        )

        result = await self.session.execute(query)
        entities = []
        for row in result.all():
            model, geojson_str = row
            geojson_dict = json.loads(geojson_str) if geojson_str else None
            entities.append(self._to_entity(model, geojson_dict))
        return entities

    async def create(
        self,
        name: str,
        code: str,
        admin_level: GeographyType,
        parent_id: uuid.UUID | None = None,
        population: int | None = None,
        geojson_geometry: dict | None = None,
    ) -> AdministrativeBoundary:
        geom_clause = None
        if geojson_geometry:
            geom_clause = ST_SetSRID(ST_GeomFromGeoJSON(json.dumps(geojson_geometry)), 4326)

        model = AdministrativeBoundaryModel(
            name=name,
            code=code,
            admin_level=admin_level,
            parent_id=parent_id,
            population=population,
            geom=geom_clause,
        )
        self.session.add(model)
        await self.session.commit()
        await self.session.refresh(model)
        return await self.get_by_id(model.id)  # type: ignore
