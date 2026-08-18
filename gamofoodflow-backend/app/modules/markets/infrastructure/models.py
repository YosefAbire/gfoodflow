import uuid

from geoalchemy2 import Geometry
from sqlalchemy import Float, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.shared.enums import CropType


class MarketNodeModel(Base):
    """Market wholesale and retail trade node in Gamo Zone & regional hubs."""

    __tablename__ = "market_nodes"

    node_name: Mapped[str] = mapped_column(String(150), nullable=False, unique=True, index=True)
    demand_level: Mapped[str] = mapped_column(String(50), nullable=False, default="High")
    avg_price_usd: Mapped[float] = mapped_column(Float, nullable=False)
    supply_gap_tons: Mapped[float] = mapped_column(Float, nullable=False)
    trend: Mapped[str] = mapped_column(String(20), nullable=False, default="up")
    primary_crops_json: Mapped[str] = mapped_column(Text, nullable=False, default="[]")

    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)

    geom = mapped_column(
        Geometry(geometry_type="POINT", srid=4326),
        nullable=True,
    )


class CommodityPriceModel(Base):
    """Commodity price observation."""

    __tablename__ = "commodity_prices"

    market_node_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("market_nodes.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    crop_type: Mapped[CropType] = mapped_column(String(50), nullable=False, index=True)
    price_etb_per_kg: Mapped[float] = mapped_column(Float, nullable=False)
    price_usd_per_ton: Mapped[float] = mapped_column(Float, nullable=False)
    observation_date: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
