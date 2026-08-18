from collections.abc import Sequence

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.modules.logistics.application.schemas import (
    BottleneckResponse,
    CapacityDemandAreaResponse,
    DetailedShipmentResponse,
    LogisticsRiskResponse,
    RouteMatrixItemResponse,
    RoutePerformanceResponse,
    ShipmentResponse,
)
from app.modules.logistics.application.services import LogisticsService
from app.modules.logistics.infrastructure.repositories import LogisticsRepository

router = APIRouter()


def get_logistics_service(db: AsyncSession = Depends(get_db)) -> LogisticsService:
    repo = LogisticsRepository(db)
    return LogisticsService(repo)


@router.get("/shipments", response_model=Sequence[ShipmentResponse], summary="List active shipments")
async def get_shipments(
    service: LogisticsService = Depends(get_logistics_service),
) -> Sequence[ShipmentResponse]:
    return await service.get_shipments()


@router.get("/detailed-shipments", response_model=Sequence[DetailedShipmentResponse], summary="Get detailed shipment intelligence items")
async def get_detailed_shipments(
    service: LogisticsService = Depends(get_logistics_service),
) -> Sequence[DetailedShipmentResponse]:
    return await service.get_detailed_shipments()


@router.get("/route-performance", response_model=Sequence[RoutePerformanceResponse], summary="Get transport corridor performance metrics")
async def get_route_performance(
    service: LogisticsService = Depends(get_logistics_service),
) -> Sequence[RoutePerformanceResponse]:
    return await service.get_route_performance()


@router.get("/bottlenecks", response_model=Sequence[BottleneckResponse], summary="Get logistics bottlenecks and congestion points")
async def get_bottlenecks(
    service: LogisticsService = Depends(get_logistics_service),
) -> Sequence[BottleneckResponse]:
    return await service.get_bottlenecks()


@router.get("/capacity-demand-areas", response_model=Sequence[CapacityDemandAreaResponse], summary="Get capacity vs demand area breakdown")
async def get_capacity_demand_areas(
    service: LogisticsService = Depends(get_logistics_service),
) -> Sequence[CapacityDemandAreaResponse]:
    return await service.get_capacity_demand_areas()


@router.get("/route-matrix", response_model=Sequence[RouteMatrixItemResponse], summary="Get route intelligence matrix")
async def get_route_matrix(
    service: LogisticsService = Depends(get_logistics_service),
) -> Sequence[RouteMatrixItemResponse]:
    return await service.get_route_matrix()


@router.get("/risks", response_model=Sequence[LogisticsRiskResponse], summary="Get logistics risk assessments")
async def get_logistics_risks(
    service: LogisticsService = Depends(get_logistics_service),
) -> Sequence[LogisticsRiskResponse]:
    return await service.get_logistics_risks()
