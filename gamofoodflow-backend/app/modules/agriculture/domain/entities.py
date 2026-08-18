import uuid
from dataclasses import dataclass
from datetime import datetime

from app.shared.enums import CropType


@dataclass
class Farmer:
    id: uuid.UUID
    full_name: str
    phone_number: str | None
    kebele_id: uuid.UUID | None
    created_at: datetime
    updated_at: datetime


@dataclass
class Farm:
    id: uuid.UUID
    farmer_id: uuid.UUID
    name: str
    size_hectares: float
    center_latitude: float
    center_longitude: float
    created_at: datetime
    updated_at: datetime


@dataclass
class Field:
    id: uuid.UUID
    farm_id: uuid.UUID
    name: str
    crop_type: CropType
    area_hectares: float
    geojson_geometry: dict | None
    created_at: datetime
    updated_at: datetime


@dataclass
class YieldRecord:
    id: uuid.UUID
    field_id: uuid.UUID
    crop_type: CropType
    harvest_date: datetime
    yield_tons: float
    quality_grade: str | None
    created_at: datetime


@dataclass
class CollectionCenterEntity:
    id: uuid.UUID
    name: str
    region_name: str
    capacity_tons: float
    current_utilization_tons: float
    utilization_percentage: float
    status: str  # Critical, High, Optimal
    latitude: float
    longitude: float
    created_at: datetime
    updated_at: datetime
