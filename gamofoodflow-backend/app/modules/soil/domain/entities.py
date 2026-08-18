import uuid
from dataclasses import dataclass
from datetime import datetime


@dataclass
class SoilSampleEntity:
    id: uuid.UUID
    location_name: str
    latitude: float
    longitude: float
    soil_type: str  # Vertisol, Nitisol, Cambisol, Luvisol
    ph_level: float
    organic_carbon_pct: float
    nitrogen_ppm: float
    phosphorus_ppm: float
    potassium_ppm: float
    moisture_pct: float
    degradation_risk: str
    sample_date: datetime
