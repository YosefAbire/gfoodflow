from dataclasses import dataclass

from app.shared.enums import CropType


@dataclass
class MarketOpportunityEntity:
    id: str
    crop: CropType
    target_node: str
    opportunity_score: int
    badge_label: str
    badge_severity: str
    margin_potential: str


@dataclass
class MarketNodeEntity:
    id: str
    node_name: str
    demand_level: str
    avg_price_usd: float
    supply_gap_tons: float
    trend: str
    primary_crops: list[CropType]


@dataclass
class CommodityPricePointEntity:
    week: str
    maize: float
    banana: float | None = None
    mango: float | None = None
    enset: float | None = None
    teff: float | None = None
    wheat: float | None = None
