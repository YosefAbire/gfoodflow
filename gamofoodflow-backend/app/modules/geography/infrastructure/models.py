import uuid

from geoalchemy2 import Geometry
from sqlalchemy import BigInteger, Float, ForeignKey, Index, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.modules.geography.domain.enums import GeographyType


class AdministrativeBoundaryModel(Base):
    """PostGIS table for Ethiopian & regional administrative spatial boundaries (Region, Zone, Woreda, Kebele)."""

    __tablename__ = "administrative_boundaries"

    name: Mapped[str] = mapped_column(String(150), nullable=False, index=True)
    code: Mapped[str] = mapped_column(String(50), nullable=False, unique=True, index=True)
    admin_level: Mapped[GeographyType] = mapped_column(String(30), nullable=False, index=True)
    
    parent_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("administrative_boundaries.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    
    area_sq_km: Mapped[float | None] = mapped_column(Float, nullable=True)
    population: Mapped[int | None] = mapped_column(BigInteger, nullable=True)
    
    # PostGIS MultiPolygon spatial geometry (SRID 4326)
    geom = mapped_column(
        Geometry(geometry_type="MULTIPOLYGON", srid=4326),
        nullable=True,
    )

    # Self-referential relationship
    parent = relationship("AdministrativeBoundaryModel", remote_side="AdministrativeBoundaryModel.id", backref="children")

    __table_args__ = (
        Index("idx_admin_boundaries_geom", "geom", postgresql_using="gist"),
    )
