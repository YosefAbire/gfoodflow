import uuid
from collections.abc import Sequence

from app.core.exceptions import EntityNotFoundException, SpatialProcessingException
from app.modules.geography.application.schemas import GeographyResponse
from app.modules.geography.domain.enums import GeographyType
from app.modules.geography.domain.interfaces import IGeographyRepository


class GeographyService:
    """Application Service layer for spatial administrative boundaries."""

    def __init__(self, repo: IGeographyRepository):
        self.repo = repo

    async def get_boundary_by_id(self, boundary_id: uuid.UUID) -> GeographyResponse:
        entity = await self.repo.get_by_id(boundary_id)
        if not entity:
            raise EntityNotFoundException("AdministrativeBoundary", boundary_id)
        return GeographyResponse.model_validate(entity)

    async def get_boundary_by_code(self, code: str) -> GeographyResponse:
        entity = await self.repo.get_by_code(code)
        if not entity:
            raise EntityNotFoundException("AdministrativeBoundary", code)
        return GeographyResponse.model_validate(entity)

    async def list_boundaries_by_level(
        self,
        level: GeographyType,
        parent_id: uuid.UUID | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> Sequence[GeographyResponse]:
        entities = await self.repo.list_by_level(level, parent_id=parent_id, limit=limit, offset=offset)
        return [GeographyResponse.model_validate(e) for e in entities]

    async def point_in_polygon_search(
        self, latitude: float, longitude: float
    ) -> GeographyResponse:
        entity = await self.repo.find_containing_point(latitude, longitude)
        if not entity:
            raise SpatialProcessingException(
                f"No administrative boundary contains coordinates ({latitude}, {longitude})."
            )
        return GeographyResponse.model_validate(entity)

    async def nearby_boundaries_search(
        self, latitude: float, longitude: float, radius_km: float = 10.0
    ) -> Sequence[GeographyResponse]:
        entities = await self.repo.find_nearby(latitude, longitude, radius_km=radius_km)
        return [GeographyResponse.model_validate(e) for e in entities]
