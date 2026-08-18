import uuid

from geoalchemy2 import Geometry
from sqlalchemy import Boolean, Float, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class WeatherStationModel(Base):
    """Ground-based or satellite virtual weather station model."""

    __tablename__ = "weather_stations"

    name: Mapped[str] = mapped_column(String(150), nullable=False, index=True)
    code: Mapped[str] = mapped_column(String(50), nullable=False, unique=True, index=True)
    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)
    elevation_meters: Mapped[float | None] = mapped_column(Float, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    geom = mapped_column(
        Geometry(geometry_type="POINT", srid=4326),
        nullable=True,
    )

    observations = relationship("WeatherObservationModel", back_populates="station")


class WeatherObservationModel(Base):
    """Historical and real-time weather observations."""

    __tablename__ = "weather_observations"

    station_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("weather_stations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    timestamp: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    rainfall_mm: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    temp_celsius: Mapped[float] = mapped_column(Float, nullable=False)
    humidity_pct: Mapped[float] = mapped_column(Float, nullable=False, default=50.0)
    wind_speed_ms: Mapped[float] = mapped_column(Float, nullable=False, default=2.0)

    station = relationship("WeatherStationModel", back_populates="observations")
