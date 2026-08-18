import uuid

from pydantic import BaseModel, ConfigDict, Field


class SoilSampleResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    locationName: str = Field(..., alias="location_name")
    latitude: float
    longitude: float
    soilType: str = Field(..., alias="soil_type")
    phLevel: float = Field(..., alias="ph_level")
    organicCarbonPct: float = Field(..., alias="organic_carbon_pct")
    nitrogenPpm: float = Field(..., alias="nitrogen_ppm")
    phosphorusPpm: float = Field(..., alias="phosphorus_ppm")
    potassiumPpm: float = Field(..., alias="potassium_ppm")
    moisturePct: float = Field(..., alias="moisture_pct")
    degradationRisk: str = Field(..., alias="degradation_risk")
    sampleDate: str = Field(..., alias="sample_date")


class SoilHealthSummaryResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    regionName: str = Field(..., alias="region_name")
    totalSamples: int = Field(..., alias="total_samples")
    avgPhLevel: float = Field(..., alias="avg_ph_level")
    avgOrganicCarbonPct: float = Field(..., alias="avg_organic_carbon_pct")
    moistureStatus: str = Field(..., alias="moisture_status")
    overallFertilityIndex: float = Field(..., alias="overall_fertility_index")  # 0-100


class FertilizerRecommendationResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    cropType: str = Field(..., alias="crop_type")
    recommendedNpsKgPerHa: float = Field(..., alias="recommended_nps_kg_per_ha")
    recommendedUreaKgPerHa: float = Field(..., alias="recommended_urea_kg_per_ha")
    compostRecommendationTonsPerHa: float = Field(..., alias="compost_recommendation_tons_per_ha")
    notes: str
