from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class AIInsightResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    title: str
    category: str
    confidence: str
    summary: str
    contributingFactors: list[str] = Field(..., alias="contributing_factors")
    recommendedAction: str = Field(..., alias="recommended_action")
    affectedZoneIds: list[str] = Field(..., alias="affected_zone_ids")
    evidenceData: dict[str, str] = Field(..., alias="evidence_data")


class ScenarioInputRequest(BaseModel):
    harvestVolumeChangePct: float = Field(0.0, description="Harvest volume change percentage")
    transportCapacityChangePct: float = Field(0.0, description="Transport capacity change percentage")
    marketDemandChangePct: float = Field(0.0, description="Market demand change percentage")
    fuelCostChangePct: float = Field(0.0, description="Fuel cost change percentage")
    routeDisruptionsActive: bool = Field(False, description="Whether active route disruptions exist")


class ScenarioOutputResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    transportShortageTons: float = Field(..., alias="transport_shortage_tons")
    marketPricePressurePct: float = Field(..., alias="market_price_pressure_pct")
    foodLossRiskIndex: float = Field(..., alias="food_loss_risk_index")
    estimatedCostUsd: float = Field(..., alias="estimated_cost_usd")
    recommendedInterventions: list[str] = Field(..., alias="recommended_interventions")


class AnalystChatMessageRequest(BaseModel):
    message: str = Field(..., min_length=1)
    context_zone_id: str | None = None


class AnalystChatMessageResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    sender: str
    timestamp: str
    text: str
    evidenceCards: list[dict[str, Any]] | None = Field(None, alias="evidence_cards")
