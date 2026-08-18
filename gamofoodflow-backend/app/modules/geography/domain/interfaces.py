"""Geography domain interfaces."""
import uuid
from abc import ABC, abstractmethod
from collections.abc import Sequence

from app.modules.geography.domain.entities import AdministrativeBoundary
from app.modules.geography.domain.enums import GeographyType


class IGeographyRepository(ABC):

    @abstractmethod
    async def get_by_id(self, boundary_id: uuid.UUID) -> AdministrativeBoundary | None:
        pass

    @abstractmethod
    async def get_by_code(self, code: str) -> AdministrativeBoundary | None:
        pass

    @abstractmethod
    async def list_by_level(
        self,
        level: GeographyType,
        parent_id: uuid.UUID | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> Sequence[AdministrativeBoundary]:
        pass

    @abstractmethod
    async def find_containing_point(
        self, latitude: float, longitude: float
    ) -> AdministrativeBoundary | None:
        pass

    @abstractmethod
    async def find_nearby(
        self, latitude: float, longitude: float, radius_km: float = 10.0
    ) -> Sequence[AdministrativeBoundary]:
        pass
