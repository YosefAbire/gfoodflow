from collections.abc import Sequence

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.modules.markets.application.schemas import (
    MarketKPIsResponse,
    MarketNodeResponse,
    MarketOpportunityResponse,
    MarketProfileResponse,
    PriceForecastPointResponse,
    PriceSpreadItemResponse,
    PriceTrendPointResponse,
)
from app.modules.markets.application.services import MarketService
from app.modules.markets.infrastructure.repositories import MarketRepository

router = APIRouter()


def get_market_service(db: AsyncSession = Depends(get_db)) -> MarketService:
    repo = MarketRepository(db)
    return MarketService(repo)


@router.get("/opportunities", response_model=Sequence[MarketOpportunityResponse], summary="List market opportunities")
async def get_opportunities(
    service: MarketService = Depends(get_market_service),
) -> Sequence[MarketOpportunityResponse]:
    return await service.get_market_opportunities()


@router.get("/nodes", response_model=Sequence[MarketNodeResponse], summary="List regional market trade nodes")
async def get_nodes(
    service: MarketService = Depends(get_market_service),
) -> Sequence[MarketNodeResponse]:
    return await service.get_market_nodes()


@router.get("/price-trends", response_model=Sequence[PriceTrendPointResponse], summary="Get commodity price trends")
async def get_price_trends(
    service: MarketService = Depends(get_market_service),
) -> Sequence[PriceTrendPointResponse]:
    return await service.get_price_trends()


@router.get("/kpis", response_model=MarketKPIsResponse, summary="Get market intelligence KPIs")
async def get_market_kpis(
    service: MarketService = Depends(get_market_service),
) -> MarketKPIsResponse:
    return await service.get_market_kpis()


@router.get("/price-forecast", response_model=Sequence[PriceForecastPointResponse], summary="Get commodity price forecast points")
async def get_price_forecast(
    service: MarketService = Depends(get_market_service),
) -> Sequence[PriceForecastPointResponse]:
    return await service.get_price_forecast_points()


@router.get("/price-spread", response_model=Sequence[PriceSpreadItemResponse], summary="Get regional price spread comparison")
async def get_price_spread(
    service: MarketService = Depends(get_market_service),
) -> Sequence[PriceSpreadItemResponse]:
    return await service.get_price_spread()


@router.get("/profile/addis", response_model=MarketProfileResponse, summary="Get Addis Ababa Central Wholesale Market profile")
async def get_addis_profile(
    service: MarketService = Depends(get_market_service),
) -> MarketProfileResponse:
    return await service.get_addis_market_profile()
