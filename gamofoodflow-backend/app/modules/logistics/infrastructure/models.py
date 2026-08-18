from geoalchemy2 import Geometry
from sqlalchemy import Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class ShipmentModel(Base):
    """Cargo shipment entity along Gamo Zone & regional transport corridors."""

    __tablename__ = "shipments"

    tracking_code: Mapped[str] = mapped_column(String(50), nullable=False, unique=True, index=True)
    route_name: Mapped[str] = mapped_column(String(150), nullable=False)
    origin: Mapped[str] = mapped_column(String(100), nullable=False)
    destination: Mapped[str] = mapped_column(String(100), nullable=False)
    cargo_description: Mapped[str] = mapped_column(String(150), nullable=False)
    quantity_tons: Mapped[float] = mapped_column(Float, nullable=False)
    perishability_risk_pct: Mapped[float] = mapped_column(Float, nullable=False, default=20.0)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="In Transit", index=True)
    estimated_arrival: Mapped[str] = mapped_column(String(100), nullable=False)
    carrier: Mapped[str] = mapped_column(String(100), nullable=False)


class LogisticsBottleneckModel(Base):
    """Transport bottleneck / congestion alert location."""

    __tablename__ = "logistics_bottlenecks"

    location_name: Mapped[str] = mapped_column(String(150), nullable=False)
    bottleneck_type: Mapped[str] = mapped_column(String(50), nullable=False)  # Route Delay, Hub Slowdown
    delay_minutes: Mapped[int] = mapped_column(Integer, nullable=False, default=30)
    impact_text: Mapped[str] = mapped_column(Text, nullable=False)
    severity: Mapped[str] = mapped_column(String(30), nullable=False, default="Warning")

    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)

    geom = mapped_column(
        Geometry(geometry_type="POINT", srid=4326),
        nullable=True,
    )
