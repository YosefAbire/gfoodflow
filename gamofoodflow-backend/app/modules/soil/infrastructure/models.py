from geoalchemy2 import Geometry
from sqlalchemy import Float, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class SoilSampleModel(Base):
    """Soil chemical composition and moisture measurement model."""

    __tablename__ = "soil_samples"

    location_name: Mapped[str] = mapped_column(String(150), nullable=False, index=True)
    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)
    soil_type: Mapped[str] = mapped_column(String(50), nullable=False, default="Nitisol")
    ph_level: Mapped[float] = mapped_column(Float, nullable=False, default=6.5)
    organic_carbon_pct: Mapped[float] = mapped_column(Float, nullable=False, default=2.1)
    nitrogen_ppm: Mapped[float] = mapped_column(Float, nullable=False, default=45.0)
    phosphorus_ppm: Mapped[float] = mapped_column(Float, nullable=False, default=18.0)
    potassium_ppm: Mapped[float] = mapped_column(Float, nullable=False, default=180.0)
    moisture_pct: Mapped[float] = mapped_column(Float, nullable=False, default=28.0)
    degradation_risk: Mapped[str] = mapped_column(String(50), nullable=False, default="Low Risk")
    sample_date: Mapped[str] = mapped_column(String(50), nullable=False, index=True)

    geom = mapped_column(
        Geometry(geometry_type="POINT", srid=4326),
        nullable=True,
    )
