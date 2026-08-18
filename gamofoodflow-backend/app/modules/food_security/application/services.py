from collections.abc import Sequence
from datetime import UTC, datetime

from app.modules.food_security.application.schemas import (
    AgriculturalRiskResponse,
    FoodSecurityAssessmentResponse,
)
from app.shared.enums import FoodSecurityLevel


class FoodSecurityService:

    async def get_assessments(self) -> Sequence[FoodSecurityAssessmentResponse]:
        return [
            FoodSecurityAssessmentResponse(
                id="fs-1",
                region_name="South Ethiopia",
                woreda_name="Arba Minch Zuria",
                food_security_score=78.5,
                category=FoodSecurityLevel.MINIMAL_IPC_1,
                confidence=0.92,
                input_indicators={
                    "rainfall_anomaly_mm": +12.4,
                    "ndvi_index": 0.68,
                    "market_price_volatility": "Low",
                    "cereal_reserve_tons": 2840,
                },
                methodology_version="v1.2-IPC-Aligned",
                generated_at=datetime.now(UTC).isoformat(),
            ),
            FoodSecurityAssessmentResponse(
                id="fs-2",
                region_name="South Ethiopia",
                woreda_name="Chencha Woreda",
                food_security_score=64.2,
                category=FoodSecurityLevel.STRESSED_IPC_2,
                confidence=0.88,
                input_indicators={
                    "rainfall_anomaly_mm": -24.8,
                    "ndvi_index": 0.52,
                    "market_price_volatility": "Moderate",
                    "cereal_reserve_tons": 980,
                },
                methodology_version="v1.2-IPC-Aligned",
                generated_at=datetime.now(UTC).isoformat(),
            ),
            FoodSecurityAssessmentResponse(
                id="fs-3",
                region_name="South Ethiopia",
                woreda_name="Bonke Woreda",
                food_security_score=52.0,
                category=FoodSecurityLevel.CRISIS_IPC_3,
                confidence=0.85,
                input_indicators={
                    "rainfall_anomaly_mm": -45.1,
                    "ndvi_index": 0.41,
                    "market_price_volatility": "High",
                    "cereal_reserve_tons": 510,
                },
                methodology_version="v1.2-IPC-Aligned",
                generated_at=datetime.now(UTC).isoformat(),
            ),
        ]

    async def get_agricultural_risks(self) -> Sequence[AgriculturalRiskResponse]:
        return [
            AgriculturalRiskResponse(
                id="risk-1",
                woreda_name="Bonke Woreda",
                drought_risk_score=74.2,
                yield_loss_risk_pct=28.5,
                pest_outbreak_risk="Medium",
                overall_risk_category="High Risk",
            ),
            AgriculturalRiskResponse(
                id="risk-2",
                woreda_name="Chencha Woreda",
                drought_risk_score=58.0,
                yield_loss_risk_pct=14.2,
                pest_outbreak_risk="Low",
                overall_risk_category="Moderate Risk",
            ),
        ]
