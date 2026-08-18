import uuid
from collections.abc import Sequence

from app.modules.soil.application.schemas import (
    FertilizerRecommendationResponse,
    SoilHealthSummaryResponse,
    SoilSampleResponse,
)
from app.modules.soil.infrastructure.repositories import SoilRepository


class SoilService:
    def __init__(self, repo: SoilRepository):
        self.repo = repo

    async def list_soil_samples(self) -> Sequence[SoilSampleResponse]:
        return [
            SoilSampleResponse(
                id=uuid.uuid4(),
                location_name="Arba Minch Zuria Cluster",
                latitude=6.0333,
                longitude=37.5500,
                soil_type="Nitisol",
                ph_level=6.8,
                organic_carbon_pct=2.4,
                nitrogen_ppm=52.0,
                phosphorus_ppm=22.0,
                potassium_ppm=195.0,
                moisture_pct=31.5,
                degradation_risk="Low Risk",
                sample_date="2026-08-01",
            ),
            SoilSampleResponse(
                id=uuid.uuid4(),
                location_name="Chencha Highland Escarpment",
                latitude=6.2500,
                longitude=37.5700,
                soil_type="Cambisol",
                ph_level=5.6,
                organic_carbon_pct=3.1,
                nitrogen_ppm=38.0,
                phosphorus_ppm=12.0,
                potassium_ppm=140.0,
                moisture_pct=24.0,
                degradation_risk="Moderate Risk (Erosion)",
                sample_date="2026-08-05",
            ),
            SoilSampleResponse(
                id=uuid.uuid4(),
                location_name="Mirab Abaya Lowland Hub",
                latitude=6.2200,
                longitude=37.7800,
                soil_type="Vertisol",
                ph_level=7.2,
                organic_carbon_pct=1.8,
                nitrogen_ppm=41.0,
                phosphorus_ppm=16.0,
                potassium_ppm=210.0,
                moisture_pct=29.0,
                degradation_risk="Low Risk",
                sample_date="2026-08-08",
            ),
        ]

    async def get_soil_summary(self) -> SoilHealthSummaryResponse:
        return SoilHealthSummaryResponse(
            region_name="Gamo Zone",
            total_samples=148,
            avg_ph_level=6.53,
            avg_organic_carbon_pct=2.43,
            moisture_status="Optimal for Season",
            overall_fertility_index=78.2,
        )

    async def get_fertilizer_recommendation(
        self, crop_type: str
    ) -> FertilizerRecommendationResponse:
        crop_upper = crop_type.strip().upper()
        if "MAIZE" in crop_upper:
            return FertilizerRecommendationResponse(
                crop_type="Maize",
                recommended_nps_kg_per_ha=100.0,
                recommended_urea_kg_per_ha=150.0,
                compost_recommendation_tons_per_ha=5.0,
                notes="Apply NPS at planting; split-apply Urea at 35 days post-emergence.",
            )
        elif "BANANA" in crop_upper:
            return FertilizerRecommendationResponse(
                crop_type="Banana",
                recommended_nps_kg_per_ha=80.0,
                recommended_urea_kg_per_ha=200.0,
                compost_recommendation_tons_per_ha=10.0,
                notes="High potassium and nitrogen requirement; integrate organic mulch.",
            )
        else:
            return FertilizerRecommendationResponse(
                crop_type=crop_type,
                recommended_nps_kg_per_ha=75.0,
                recommended_urea_kg_per_ha=100.0,
                compost_recommendation_tons_per_ha=4.0,
                notes="Standard regional balanced application rate based on SoilSat telemetry.",
            )
