import uuid
from dataclasses import dataclass
from datetime import datetime


@dataclass
class WeatherStationEntity:
    id: uuid.UUID
    name: str
    code: str
    latitude: float
    longitude: float
    elevation_meters: float | None
    is_active: bool
    created_at: datetime
    updated_at: datetime


@dataclass
class WeatherObservationEntity:
    id: uuid.UUID
    station_id: uuid.UUID
    timestamp: datetime
    rainfall_mm: float
    temp_celsius: float
    humidity_pct: float
    wind_speed_ms: float
    solar_radiation: float | None
