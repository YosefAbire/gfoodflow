import uuid

from geoalchemy2 import Geometry
from sqlalchemy import Float, ForeignKey, Index, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.shared.enums import CropType


class FarmerModel(Base):
    __tablename__ = "farmers"

    full_name: Mapped[str] = mapped_column(String(150), nullable=False, index=True)
    phone_number: Mapped[str | None] = mapped_column(String(50), nullable=True)
    kebele_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("administrative_boundaries.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    farms = relationship("FarmModel", back_populates="farmer")


class FarmModel(Base):
    __tablename__ = "farms"

    farmer_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("farmers.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    size_hectares: Mapped[float] = mapped_column(Float, nullable=False, default=1.0)
    
    center_latitude: Mapped[float] = mapped_column(Float, nullable=False)
    center_longitude: Mapped[float] = mapped_column(Float, nullable=False)

    farmer = relationship("FarmerModel", back_populates="farms")
    fields = relationship("FieldModel", back_populates="farm")


class FieldModel(Base):
    __tablename__ = "fields"

    farm_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("farms.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    crop_type: Mapped[CropType] = mapped_column(String(50), nullable=False, index=True)
    area_hectares: Mapped[float] = mapped_column(Float, nullable=False, default=1.0)

    # PostGIS Polygon spatial boundary for field (SRID 4326)
    geom = mapped_column(
        Geometry(geometry_type="POLYGON", srid=4326),
        nullable=True,
    )

    farm = relationship("FarmModel", back_populates="fields")
    yield_records = relationship("YieldRecordModel", back_populates="field")

    __table_args__ = (
        Index("idx_fields_geom", "geom", postgresql_using="gist"),
    )


class YieldRecordModel(Base):
    __tablename__ = "yield_records"

    field_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("fields.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    crop_type: Mapped[CropType] = mapped_column(String(50), nullable=False, index=True)
    harvest_date: Mapped[str] = mapped_column(String(50), nullable=False)
    yield_tons: Mapped[float] = mapped_column(Float, nullable=False)
    quality_grade: Mapped[str | None] = mapped_column(String(20), nullable=True)

    field = relationship("FieldModel", back_populates="yield_records")


class CollectionCenterModel(Base):
    """Collection center model strictly matching frontend CollectionCenter interface."""

    __tablename__ = "collection_centers"

    name: Mapped[str] = mapped_column(String(150), nullable=False, index=True)
    region_name: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    capacity_tons: Mapped[float] = mapped_column(Float, nullable=False)
    current_utilization_tons: Mapped[float] = mapped_column(Float, nullable=False)
    utilization_percentage: Mapped[float] = mapped_column(Float, nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="Optimal", index=True)
    
    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)

    geom = mapped_column(
        Geometry(geometry_type="POINT", srid=4326),
        nullable=True,
    )
