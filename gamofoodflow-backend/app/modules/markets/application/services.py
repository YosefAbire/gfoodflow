from collections.abc import Sequence

from app.modules.markets.application.schemas import (
    MarketKPIsResponse,
    MarketNodeResponse,
    MarketOpportunityResponse,
    MarketProfileResponse,
    PriceForecastPointResponse,
    PriceSpreadItemResponse,
    PriceTrendPointResponse,
)
from app.modules.markets.infrastructure.repositories import MarketRepository
from app.shared.enums import CropType


class MarketService:
    def __init__(self, repo: MarketRepository):
        self.repo = repo

    async def get_market_opportunities(self) -> Sequence[MarketOpportunityResponse]:
        return [
            MarketOpportunityResponse(
                id="opp-1",
                crop=CropType.MAIZE,
                target_node="Arba Minch Central Node",
                opportunity_score=94,
                badge_label="HIGH DEFICIT",
                badge_severity="critical",
                margin_potential="+22.4%",
            ),
            MarketOpportunityResponse(
                id="opp-2",
                crop=CropType.BANANA,
                target_node="Mirab Abaya Wholesale Hub",
                opportunity_score=88,
                badge_label="PRICE SPIKING",
                badge_severity="warning",
                margin_potential="+18.1%",
            ),
            MarketOpportunityResponse(
                id="opp-3",
                crop=CropType.ENSET,
                target_node="Sawla Regional Market",
                opportunity_score=82,
                badge_label="STEADY DEMAND",
                badge_severity="positive",
                margin_potential="+14.5%",
            ),
            MarketOpportunityResponse(
                id="opp-4",
                crop=CropType.WHEAT,
                target_node="Chencha Highland Node",
                opportunity_score=76,
                badge_label="MODERATE DEFICIT",
                badge_severity="warning",
                margin_potential="+11.2%",
            ),
        ]

    async def get_market_nodes(self) -> Sequence[MarketNodeResponse]:
        return [
            MarketNodeResponse(
                id="node-1",
                node_name="Arba Minch Central Node",
                demand_level="Critical",
                avg_price_usd=342.50,
                supply_gap_tons=-12400,
                trend="up",
                primary_crops=[CropType.MAIZE, CropType.BANANA, CropType.MANGO],
            ),
            MarketNodeResponse(
                id="node-2",
                node_name="Mirab Abaya Market Node",
                demand_level="High",
                avg_price_usd=310.00,
                supply_gap_tons=-8200,
                trend="up",
                primary_crops=[CropType.BANANA, CropType.MAIZE],
            ),
            MarketNodeResponse(
                id="node-3",
                node_name="Chencha Highland Node",
                demand_level="Moderate",
                avg_price_usd=285.40,
                supply_gap_tons=-3400,
                trend="stable",
                primary_crops=[CropType.ENSET, CropType.WHEAT],
            ),
            MarketNodeResponse(
                id="node-4",
                node_name="Sawla Regional Node",
                demand_level="High",
                avg_price_usd=298.00,
                supply_gap_tons=-5600,
                trend="up",
                primary_crops=[CropType.MAIZE, CropType.COFFEE],
            ),
        ]

    async def get_price_trends(self) -> Sequence[PriceTrendPointResponse]:
        return [
            PriceTrendPointResponse(week="W1", Maize=280, Banana=150, Mango=210, Enset=130),
            PriceTrendPointResponse(week="W2", Maize=286, Banana=155, Mango=215, Enset=132),
            PriceTrendPointResponse(week="W3", Maize=292, Banana=160, Mango=220, Enset=135),
            PriceTrendPointResponse(week="W4", Maize=300, Banana=162, Mango=218, Enset=138),
            PriceTrendPointResponse(week="W5", Maize=312, Banana=170, Mango=225, Enset=140),
            PriceTrendPointResponse(week="W6", Maize=320, Banana=175, Mango=230, Enset=142),
            PriceTrendPointResponse(week="W7", Maize=332, Banana=182, Mango=235, Enset=145),
            PriceTrendPointResponse(week="W8", Maize=340, Banana=190, Mango=242, Enset=148),
            PriceTrendPointResponse(week="W9", Maize=348, Banana=198, Mango=248, Enset=152),
            PriceTrendPointResponse(week="W10", Maize=352, Banana=208, Mango=250, Enset=155),
            PriceTrendPointResponse(week="W11", Maize=350, Banana=215, Mango=252, Enset=158),
            PriceTrendPointResponse(week="W12", Maize=355, Banana=220, Mango=258, Enset=160),
        ]

    async def get_market_kpis(self) -> MarketKPIsResponse:
        return MarketKPIsResponse(
            regionalAvgPriceEtb=38.5,
            weeklyPriceChangePct=4.2,
            activeHighDeficitMarkets=3,
            estimatedSupplyDeficitTons=29600.0,
        )

    async def get_price_forecast_points(self) -> Sequence[PriceForecastPointResponse]:
        return [
            PriceForecastPointResponse(month="Jan", historicalEtb=32.0),
            PriceForecastPointResponse(month="Feb", historicalEtb=33.5),
            PriceForecastPointResponse(month="Mar", historicalEtb=35.0),
            PriceForecastPointResponse(month="Apr", historicalEtb=36.2),
            PriceForecastPointResponse(month="May", historicalEtb=38.5, forecastEtb=38.5, isToday=True),
            PriceForecastPointResponse(month="Jun (F)", forecastEtb=41.0, confidenceUpperEtb=43.5, confidenceLowerEtb=38.5),
            PriceForecastPointResponse(month="Jul (F)", forecastEtb=43.8, confidenceUpperEtb=47.0, confidenceLowerEtb=40.6),
            PriceForecastPointResponse(month="Aug (F)", forecastEtb=45.2, confidenceUpperEtb=49.1, confidenceLowerEtb=41.3),
        ]

    async def get_price_spread(self) -> Sequence[PriceSpreadItemResponse]:
        return [
            PriceSpreadItemResponse(marketName="Arba Minch Central", priceEtbPerKg=38.5, transportCostEtbPerKg=1.2, netMarginEtbPerKg=8.4),
            PriceSpreadItemResponse(marketName="Hawassa Market", priceEtbPerKg=44.0, transportCostEtbPerKg=4.5, netMarginEtbPerKg=10.2),
            PriceSpreadItemResponse(marketName="Addis Central", priceEtbPerKg=52.0, transportCostEtbPerKg=8.0, netMarginEtbPerKg=14.5),
            PriceSpreadItemResponse(marketName="Sawla Regional", priceEtbPerKg=36.0, transportCostEtbPerKg=2.5, netMarginEtbPerKg=6.8),
        ]

    async def get_addis_market_profile(self) -> MarketProfileResponse:
        return MarketProfileResponse(
            id="mkt-addis-01",
            name="Addis Ababa Central Wholesale Market",
            avgPriceEtb=52.0,
            avgPriceChangePct=6.8,
            weeklyDemandMt=4500,
            weeklyDemandTrend="Surging",
            supplyGapMt=1200,
            supplyGapStatus="Deficit widening",
            connectedSupplyAreas=[
                {"name": "Gamo Zone Cluster", "role": "Primary Banana/Maize Supplier", "volumeSharePct": 42, "volLevel": "High"},
                {"name": "Rift Valley Hub", "role": "Vegetable Supplier", "volumeSharePct": 28, "volLevel": "Medium"},
            ],
            majorBuyers=[
                {"entityName": "Ethiopian Grain Trade Enterprise", "type": "Government", "contractedVolMt": 1800},
                {"entityName": "Addis Agro Processors", "type": "Industrial", "contractedVolMt": 950},
            ],
            connectedRoutes=[
                {"id": "rt-1", "routeName": "Arba Minch → Addis Corridor", "pathDescription": "A7 Highway via Hawassa", "avgTransitHours": 8.5, "status": "Active", "statusColor": "green"},
            ],
        )
