from dataclasses import dataclass


@dataclass
class ShipmentEntity:
    id: str
    route: str
    origin: str
    destination: str
    cargo: str
    quantity_tons: float
    status: str
    estimated_arrival: str
    carrier: str


@dataclass
class RoutePerformanceEntity:
    id: str
    route_name: str
    risk_level: str
    avg_transit_hours: float
    reliability_percentage: float
    congestion_points: list[str]


@dataclass
class LogisticsBottleneckEntity:
    id: str
    location_name: str
    type_: str
    delay_minutes: int
    impact_text: str
    latitude: float
    longitude: float
    severity: str
