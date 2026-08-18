"""Geography domain entities and value objects."""
import uuid
from dataclasses import dataclass
from datetime import datetime

from app.modules.geography.domain.enums import GeographyType


@dataclass
class LocationPoint:
    latitude: float
    longitude: float
    elevation_meters: float | None = None


@dataclass
class AdministrativeBoundary:
    id: uuid.UUID
    name: str
    code: str
    admin_level: GeographyType
    parent_id: uuid.UUID | None
    geojson_geometry: dict | None
    area_sq_km: float | None
    population: int | None
    created_at: datetime
    updated_at: datetime
