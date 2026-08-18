from typing import Any

from pydantic import BaseModel, ConfigDict, Field

from app.shared.enums import FoodSecurityLevel


class FoodSecurityAssessmentResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    regionName: str = Field(..., alias="region_name")
    woredaName: str = Field(..., alias="woreda_name")
    foodSecurityScore: float = Field(..., alias="food_security_score")
    category: FoodSecurityLevel
    confidence: float
    inputIndicators: dict[str, Any] = Field(..., alias="input_indicators")
    methodologyVersion: str = Field("v1.2-IPC-Aligned", alias="methodology_version")
    generatedAt: str = Field(..., alias="generated_at")


class AgriculturalRiskResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    woredaName: str = Field(..., alias="woreda_name")
    droughtRiskScore: float = Field(..., alias="drought_risk_score")
    yieldLossRiskPct: float = Field(..., alias="yield_loss_risk_pct")
    pestOutbreakRisk: str = Field(..., alias="pest_outbreak_risk")
    overallRiskCategory: str = Field(..., alias="overall_risk_category")
