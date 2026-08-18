import uuid
from typing import Any

from pydantic import BaseModel, ConfigDict, Field

from app.modules.geography.domain.enums import GeographyType


class LocationQuery(BaseModel):
    latitude: float = Field(..., ge=-90.0, le=90.0, description="Latitude degree")
    longitude: float = Field(..., ge=-180.0, le=180.0, description="Longitude degree")


class SpatialRadiusQuery(LocationQuery):
    radius_km: float = Field(default=10.0, ge=0.1, le=500.0, description="Search radius in kilometers")


class GeographyCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    code: str = Field(..., min_length=2, max_length=50)
    admin_level: GeographyType
    parent_id: uuid.UUID | None = None
    population: int | None = Field(default=None, ge=0)
    geojson_geometry: dict[str, Any] | None = None


class GeographyResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    code: str
    admin_level: GeographyType
    parent_id: uuid.UUID | None = None
    area_sq_km: float | None = None
    population: int | None = None
    geojson_geometry: dict[str, Any] | None = None


class GeographyDetailResponse(GeographyResponse):
    parent_name: str | None = None
    children_count: int = 0


class GeoJSONFeature(BaseModel):
    type: str = "Feature"
    geometry: dict[str, Any]
    properties: dict[str, Any]


class GeoJSONFeatureCollection(BaseModel):
    type: str = "FeatureCollection"
    features: list[GeoJSONFeature]

