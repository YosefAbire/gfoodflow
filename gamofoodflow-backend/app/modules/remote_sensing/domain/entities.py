import uuid
from dataclasses import dataclass
from datetime import datetime


@dataclass
class SatelliteSceneEntity:
    id: uuid.UUID
    scene_id: str
    satellite_name: str  # Sentinel-2A, Sentinel-2B, Landsat-9
    acquisition_date: datetime
    cloud_cover_pct: float
    bbox: list[float]
    tile_url: str


@dataclass
class NDVIObservationEntity:
    id: uuid.UUID
    boundary_id: uuid.UUID
    observation_date: datetime
    mean_ndvi: float
    min_ndvi: float
    max_ndvi: float
    anomaly_pct: float
    vegetation_health_category: str
