from typing import Any

from pydantic import BaseModel, ConfigDict, Field

from app.shared.enums import CropType


class MarketOpportunityResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    crop: CropType
    targetNode: str = Field(..., alias="target_node")
    opportunityScore: int = Field(..., alias="opportunity_score")
    badgeLabel: str = Field(..., alias="badge_label")
    badgeSeverity: str = Field(..., alias="badge_severity")
    marginPotential: str = Field(..., alias="margin_potential")


class MarketNodeResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    nodeName: str = Field(..., alias="node_name")
    demandLevel: str = Field(..., alias="demand_level")
    avgPriceUsd: float = Field(..., alias="avg_price_usd")
    supplyGapTons: float = Field(..., alias="supply_gap_tons")
    trend: str
    primaryCrops: list[CropType] = Field(..., alias="primary_crops")


class PriceTrendPointResponse(BaseModel):
    week: str
    Maize: float
    Banana: float | None = None
    Mango: float | None = None
    Enset: float | None = None
    Teff: float | None = None
    Wheat: float | None = None


class MarketKPIsResponse(BaseModel):
    regionalAvgPriceEtb: float
    weeklyPriceChangePct: float
    activeHighDeficitMarkets: int
    estimatedSupplyDeficitTons: float


class PriceForecastPointResponse(BaseModel):
    month: str
    historicalEtb: float | None = None
    forecastEtb: float | None = None
    confidenceUpperEtb: float | None = None
    confidenceLowerEtb: float | None = None
    isToday: bool | None = False


class PriceSpreadItemResponse(BaseModel):
    marketName: str
    priceEtbPerKg: float
    transportCostEtbPerKg: float
    netMarginEtbPerKg: float


class MarketProfileResponse(BaseModel):
    id: str
    name: str
    avgPriceEtb: float
    avgPriceChangePct: float
    weeklyDemandMt: float
    weeklyDemandTrend: str
    supplyGapMt: float
    supplyGapStatus: str
    connectedSupplyAreas: list[dict[str, Any]]
    majorBuyers: list[dict[str, Any]]
    connectedRoutes: list[dict[str, Any]]
