from geoalchemy2 import Geometry
from sqlalchemy import Float, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class SatelliteSceneModel(Base):
    """Cataloged satellite scene metadata (Sentinel-2 / Landsat-9)."""

    __tablename__ = "satellite_scenes"

    scene_id: Mapped[str] = mapped_column(String(100), nullable=False, unique=True, index=True)
    satellite_name: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    acquisition_date: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    cloud_cover_pct: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    bbox_json: Mapped[str] = mapped_column(Text, nullable=False, default="[]")
    tile_url: Mapped[str] = mapped_column(String(255), nullable=False)

    geom = mapped_column(
        Geometry(geometry_type="POLYGON", srid=4326),
        nullable=True,
    )


class NDVIObservationModel(Base):
    """Raster zonal statistics for crop/vegetation vigor monitoring."""

    __tablename__ = "ndvi_observations"

    boundary_name: Mapped[str] = mapped_column(String(150), nullable=False, index=True)
    observation_date: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    mean_ndvi: Mapped[float] = mapped_column(Float, nullable=False)
    min_ndvi: Mapped[float] = mapped_column(Float, nullable=False)
    max_ndvi: Mapped[float] = mapped_column(Float, nullable=False)
    anomaly_pct: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    vegetation_health_category: Mapped[str] = mapped_column(String(50), nullable=False, default="Normal Vigor")
