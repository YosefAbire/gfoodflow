import uuid

from pydantic import BaseModel, ConfigDict, Field


class WeatherStationCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    code: str = Field(..., min_length=2, max_length=50)
    latitude: float = Field(..., ge=-90.0, le=90.0)
    longitude: float = Field(..., ge=-180.0, le=180.0)
    elevation_meters: float | None = None


class WeatherStationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    code: str
    latitude: float
    longitude: float
    elevation_meters: float | None = None
    is_active: bool


class WeatherObservationCreate(BaseModel):
    station_id: uuid.UUID
    timestamp: str
    rainfall_mm: float = Field(..., ge=0.0)
    temp_celsius: float
    humidity_pct: float = Field(..., ge=0.0, le=100.0)
    wind_speed_ms: float = Field(..., ge=0.0)


class WeatherObservationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    station_id: uuid.UUID
    timestamp: str
    rainfall_mm: float
    temp_celsius: float
    humidity_pct: float
    wind_speed_ms: float


class WeatherSummaryResponse(BaseModel):
    latitude: float
    longitude: float
    days_analyzed: int
    total_rainfall_mm: float
    avg_temperature_c: float
    avg_humidity_pct: float
    max_temperature_c: float
    min_temperature_c: float


class DroughtRiskResponse(BaseModel):
    latitude: float
    longitude: float
    spi_index: float  # Standardized Precipitation Index (-3.0 to +3.0)
    severity: str  # Extreme Drought, Severe Drought, Moderate, Normal, Wet
    risk_description: str
