from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.modules.weather.application.schemas import (
    DroughtRiskResponse,
    WeatherStationCreate,
    WeatherStationResponse,
    WeatherSummaryResponse,
)
from app.modules.weather.application.services import WeatherService
from app.modules.weather.infrastructure.repositories import WeatherRepository
from app.shared.pagination import PageParams, PaginatedResponse

router = APIRouter()


def get_weather_service(db: AsyncSession = Depends(get_db)) -> WeatherService:
    repo = WeatherRepository(db)
    return WeatherService(repo)


@router.get("/stations", response_model=PaginatedResponse[WeatherStationResponse], summary="List weather stations")
async def list_weather_stations(
    page_params: PageParams = Depends(),
    service: WeatherService = Depends(get_weather_service),
) -> PaginatedResponse[WeatherStationResponse]:
    stations = await service.list_stations(limit=page_params.page_size, offset=page_params.offset)
    return PaginatedResponse.create(items=list(stations), total_items=len(stations), page_params=page_params)


@router.post("/stations", response_model=WeatherStationResponse, status_code=status.HTTP_201_CREATED, summary="Create weather station")
async def create_weather_station(
    dto: WeatherStationCreate,
    service: WeatherService = Depends(get_weather_service),
) -> WeatherStationResponse:
    return await service.create_station(dto)


@router.get("/summary", response_model=WeatherSummaryResponse, summary="Get weather summary for spatial location")
async def get_weather_summary(
    latitude: float = Query(..., ge=-90.0, le=90.0),
    longitude: float = Query(..., ge=-180.0, le=180.0),
    days: int = Query(30, ge=1, le=365),
    service: WeatherService = Depends(get_weather_service),
) -> WeatherSummaryResponse:
    return await service.get_weather_summary(latitude, longitude, days=days)


@router.get("/drought-risk", response_model=DroughtRiskResponse, summary="Get SPI drought risk calculation for spatial location")
async def get_drought_risk(
    latitude: float = Query(..., ge=-90.0, le=90.0),
    longitude: float = Query(..., ge=-180.0, le=180.0),
    days: int = Query(90, ge=1, le=365),
    service: WeatherService = Depends(get_weather_service),
) -> DroughtRiskResponse:
    return await service.calculate_drought_risk(latitude, longitude, days=days)
