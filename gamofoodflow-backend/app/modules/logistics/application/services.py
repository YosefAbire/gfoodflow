from collections.abc import Sequence

from app.modules.logistics.application.schemas import (
    BottleneckResponse,
    CapacityDemandAreaResponse,
    DetailedShipmentResponse,
    LogisticsRiskResponse,
    RouteMatrixItemResponse,
    RoutePerformanceResponse,
    ShipmentResponse,
)
from app.modules.logistics.infrastructure.repositories import LogisticsRepository


class LogisticsService:
    def __init__(self, repo: LogisticsRepository):
        self.repo = repo

    async def get_shipments(self) -> Sequence[ShipmentResponse]:
        return [
            ShipmentResponse(
                id="SH-492",
                route="Bonke → Arba Minch",
                origin="Bonke Center",
                destination="Arba Minch Central",
                cargo="Maize (12t)",
                quantity_tons=12.0,
                status="On Time",
                estimated_arrival="14:30 Today",
                carrier="Gamo Logistics",
            ),
            ShipmentResponse(
                id="SH-504",
                route="Chencha → Hawassa",
                origin="Chencha Hub",
                destination="Hawassa Market",
                cargo="Bananas (8.5t)",
                quantity_tons=8.5,
                status="At Risk",
                estimated_arrival="18:15 Today (+1.5h)",
                carrier="Rift Valley Trans",
            ),
            ShipmentResponse(
                id="SH-511",
                route="Kamba → Addis Ababa",
                origin="Kamba Hub",
                destination="Addis Ababa Terminal",
                cargo="Vegetables (5t)",
                quantity_tons=5.0,
                status="Delayed",
                estimated_arrival="20:45 Today",
                carrier="Highland Express",
            ),
            ShipmentResponse(
                id="SH-488",
                route="Dita → Djibouti Port",
                origin="Dita Storage",
                destination="Djibouti Port",
                cargo="Coffee (24t)",
                quantity_tons=24.0,
                status="On Time",
                estimated_arrival="Tomorrow 08:00",
                carrier="Gamo Logistics",
            ),
        ]

    async def get_detailed_shipments(self) -> Sequence[DetailedShipmentResponse]:
        return [
            DetailedShipmentResponse(
                id="SH-492",
                commodity="Maize",
                route="Bonke → Arba Minch",
                volume_tons=12.0,
                transporter="Gamo Logistics",
                perishability_risk_pct=35.0,
                status="In Transit",
                status_text="On Schedule",
            ),
            DetailedShipmentResponse(
                id="SH-504",
                commodity="Bananas",
                route="Chencha → Hawassa",
                volume_tons=8.5,
                transporter="Rift Valley Trans",
                perishability_risk_pct=78.0,
                status="At Risk",
                status_text="Traffic Delay",
            ),
            DetailedShipmentResponse(
                id="SH-511",
                commodity="Vegetables",
                route="Kamba → Addis Ababa",
                volume_tons=5.0,
                transporter="Highland Express",
                perishability_risk_pct=85.0,
                status="Delayed",
                status_text="Route Blockage",
            ),
            DetailedShipmentResponse(
                id="SH-488",
                commodity="Coffee",
                route="Dita → Djibouti Port",
                volume_tons=24.0,
                transporter="Gamo Logistics",
                perishability_risk_pct=15.0,
                status="On Time",
                status_text="Normal Transit",
            ),
        ]

    async def get_route_performance(self) -> Sequence[RoutePerformanceResponse]:
        return [
            RoutePerformanceResponse(
                id="route-1",
                route_name="Northern Corridor",
                risk_level="Low Risk",
                avg_transit_hours=4.2,
                reliability_percentage=98.0,
                congestion_points=[],
            ),
            RoutePerformanceResponse(
                id="route-2",
                route_name="Central Hub Link",
                risk_level="Med Risk",
                avg_transit_hours=6.8,
                transit_delta="+1.5",
                reliability_percentage=82.0,
                congestion_points=["Chencha Escarpment Pass"],
            ),
            RoutePerformanceResponse(
                id="route-3",
                route_name="Southern Transit",
                risk_level="High Risk",
                avg_transit_hours=8.5,
                reliability_percentage=45.0,
                congestion_points=["South Market Junction Road Blockage"],
            ),
        ]

    async def get_bottlenecks(self) -> Sequence[BottleneckResponse]:
        return [
            BottleneckResponse(
                id="b-1",
                location_name="Chencha Escarpment Pass (Route A7)",
                type="Route Delay",
                delay_minutes=45,
                impact_text="Heavy rain causing mudslides & heavy truck slowdowns",
                coordinates=[6.24, 37.56],
                severity="Critical",
            ),
            BottleneckResponse(
                id="b-2",
                location_name="Mirab Abaya Junction",
                type="Hub Slowdown",
                delay_minutes=25,
                impact_text="High vehicle queue at weighing station",
                coordinates=[6.22, 37.78],
                severity="Warning",
            ),
        ]

    async def get_capacity_demand_areas(self) -> Sequence[CapacityDemandAreaResponse]:
        return [
            CapacityDemandAreaResponse(
                id="area-1",
                origin="Chencha",
                commodity="Apples",
                expected_volume_tons=45.0,
                required_capacity_trucks=5,
                capacity_gap_trucks=-1,
                status="SHORTAGE",
            ),
            CapacityDemandAreaResponse(
                id="area-2",
                origin="Arba Minch",
                commodity="Bananas",
                expected_volume_tons=120.0,
                required_capacity_trucks=12,
                capacity_gap_trucks=0,
                status="MATCHED",
            ),
            CapacityDemandAreaResponse(
                id="area-3",
                origin="Hawassa",
                commodity="Maize",
                expected_volume_tons=85.0,
                required_capacity_trucks=9,
                capacity_gap_trucks=2,
                status="SURPLUS",
            ),
            CapacityDemandAreaResponse(
                id="area-4",
                origin="Sodo",
                commodity="Coffee",
                expected_volume_tons=30.0,
                required_capacity_trucks=3,
                capacity_gap_trucks=-2,
                status="CRITICAL",
            ),
        ]

    async def get_route_matrix(self) -> Sequence[RouteMatrixItemResponse]:
        return [
            RouteMatrixItemResponse(
                id="rm-1",
                route_name="Arba Minch → Addis Ababa",
                avg_time_hours=8.5,
                variability="Low",
                reliability_pct=94.0,
                est_cost_etb_per_ton=12000.0,
                status="Active",
            ),
            RouteMatrixItemResponse(
                id="rm-2",
                route_name="Sawla → Hawassa",
                avg_time_hours=6.2,
                variability="Medium",
                reliability_pct=82.0,
                est_cost_etb_per_ton=8500.0,
                status="Active",
            ),
            RouteMatrixItemResponse(
                id="rm-3",
                route_name="Chencha → Arba Minch",
                avg_time_hours=1.5,
                variability="High",
                reliability_pct=68.0,
                est_cost_etb_per_ton=2100.0,
                status="Delayed",
            ),
        ]

    async def get_logistics_risks(self) -> Sequence[LogisticsRiskResponse]:
        return [
            LogisticsRiskResponse(
                id="risk-1",
                route_origin_destination="Zone A → Central Hub",
                volume_tons=142.5,
                status_text="Capacity Shortage",
                status_severity="Critical",
                risk_score=92,
            ),
            LogisticsRiskResponse(
                id="risk-2",
                route_origin_destination="Addis → Arba Minch",
                volume_tons=85.0,
                status_text="Weather Delay",
                status_severity="High",
                risk_score=76,
            ),
            LogisticsRiskResponse(
                id="risk-3",
                route_origin_destination="Zone C → Processing Unit",
                volume_tons=210.2,
                status_text="Nominal",
                status_severity="Low",
                risk_score=12,
            ),
        ]
