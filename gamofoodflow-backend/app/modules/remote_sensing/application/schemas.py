import uuid

from pydantic import BaseModel, ConfigDict, Field


class SatelliteSceneResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    sceneId: str = Field(..., alias="scene_id")
    satelliteName: str = Field(..., alias="satellite_name")
    acquisitionDate: str = Field(..., alias="acquisition_date")
    cloudCoverPct: float = Field(..., alias="cloud_cover_pct")
    bbox: list[float]
    tileUrl: str = Field(..., alias="tile_url")


class NDVIStatsResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    boundaryName: str = Field(..., alias="boundary_name")
    observationDate: str = Field(..., alias="observation_date")
    meanNdvi: float = Field(..., alias="mean_ndvi")
    minNdvi: float = Field(..., alias="min_ndvi")
    maxNdvi: float = Field(..., alias="max_ndvi")
    anomalyPct: float = Field(..., alias="anomaly_pct")
    vegetationHealthCategory: str = Field(..., alias="vegetation_health_category")


class RasterZonalStatsRequest(BaseModel):
    boundaryId: str = Field(..., alias="boundary_id")
    dateFrom: str = Field(..., alias="date_from")
    dateTo: str = Field(..., alias="date_to")
    indexType: str = Field("NDVI", alias="index_type")  # NDVI, EVI, NDWI


class RasterZonalStatsResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    boundaryId: str = Field(..., alias="boundary_id")
    boundaryName: str = Field(..., alias="boundary_name")
    indexType: str = Field(..., alias="index_type")
    meanValue: float = Field(..., alias="mean_value")
    medianValue: float = Field(..., alias="median_value")
    stdDev: float = Field(..., alias="std_dev")
    histogram: dict[str, int]
