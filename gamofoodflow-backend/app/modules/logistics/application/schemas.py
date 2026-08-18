from pydantic import BaseModel, ConfigDict, Field


class ShipmentResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    route: str
    origin: str
    destination: str
    cargo: str
    quantityTons: float = Field(..., alias="quantity_tons")
    status: str
    estimatedArrival: str = Field(..., alias="estimated_arrival")
    carrier: str


class DetailedShipmentResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    commodity: str
    route: str
    volumeTons: float = Field(..., alias="volume_tons")
    transporter: str
    perishabilityRiskPct: float = Field(..., alias="perishability_risk_pct")
    status: str
    statusText: str = Field(..., alias="status_text")


class RoutePerformanceResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    routeName: str = Field(..., alias="route_name")
    riskLevel: str = Field(..., alias="risk_level")
    avgTransitHours: float = Field(..., alias="avg_transit_hours")
    transitDelta: str | None = Field(None, alias="transit_delta")
    reliabilityPercentage: float = Field(..., alias="reliability_percentage")
    congestionPoints: list[str] = Field(..., alias="congestion_points")


class BottleneckResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    locationName: str = Field(..., alias="location_name")
    type: str
    delayMinutes: int = Field(..., alias="delay_minutes")
    impactText: str = Field(..., alias="impact_text")
    coordinates: list[float]
    severity: str


class CapacityDemandAreaResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    origin: str
    commodity: str
    expectedVolumeTons: float = Field(..., alias="expected_volume_tons")
    requiredCapacityTrucks: int = Field(..., alias="required_capacity_trucks")
    capacityGapTrucks: int = Field(..., alias="capacity_gap_trucks")
    status: str


class RouteMatrixItemResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    routeName: str = Field(..., alias="route_name")
    avgTimeHours: float = Field(..., alias="avg_time_hours")
    variability: str
    reliabilityPct: float = Field(..., alias="reliability_pct")
    estCostEtbPerTon: float = Field(..., alias="est_cost_etb_per_ton")
    status: str


class LogisticsRiskResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    routeOriginDestination: str = Field(..., alias="route_origin_destination")
    volumeTons: float = Field(..., alias="volume_tons")
    statusText: str = Field(..., alias="status_text")
    statusSeverity: str = Field(..., alias="status_severity")
    riskScore: int = Field(..., alias="risk_score")
