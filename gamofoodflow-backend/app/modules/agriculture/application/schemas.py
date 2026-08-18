import uuid

from pydantic import BaseModel, ConfigDict, Field

from app.shared.enums import CropType


class CropSupplySummary(BaseModel):
    id: str
    crop: CropType
    volume_tons: float
    share_percentage: float
    harvest_peak_month: str
    color: str
    secondary_color: str


class CollectionCenterResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    region: str = Field(..., alias="region_name")
    capacity_tons: float
    current_utilization_tons: float
    utilization_percentage: float
    status: str  # Critical, High, Optimal
    coordinates: list[float]  # [lat, lng]


class FarmCreate(BaseModel):
    farmer_id: uuid.UUID
    name: str = Field(..., min_length=2, max_length=150)
    size_hectares: float = Field(..., ge=0.1)
    center_latitude: float = Field(..., ge=-90.0, le=90.0)
    center_longitude: float = Field(..., ge=-180.0, le=180.0)


class FarmResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    farmer_id: uuid.UUID
    name: str
    size_hectares: float
    center_latitude: float
    center_longitude: float


class YieldRecordCreate(BaseModel):
    field_id: uuid.UUID
    crop_type: CropType
    harvest_date: str
    yield_tons: float = Field(..., ge=0.0)
    quality_grade: str | None = None


class YieldRecordResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    field_id: uuid.UUID
    crop_type: CropType
    harvest_date: str
    yield_tons: float
    quality_grade: str | None = None
