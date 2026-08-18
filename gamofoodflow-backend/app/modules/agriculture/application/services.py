import uuid
from collections.abc import Sequence

from app.modules.agriculture.application.schemas import (
    CollectionCenterResponse,
    CropSupplySummary,
    FarmCreate,
    FarmResponse,
)
from app.modules.agriculture.infrastructure.repositories import AgricultureRepository
from app.shared.enums import CropType


class AgricultureService:
    def __init__(self, repo: AgricultureRepository):
        self.repo = repo

    async def get_crop_supply_summary(self) -> Sequence[CropSupplySummary]:
        """Produce supply totals matching DEMO_CROP_SUPPLY on frontend."""
        return [
            CropSupplySummary(
                id="crop-1",
                crop=CropType.MAIZE,
                volume_tons=2840,
                share_percentage=57,
                harvest_peak_month="October",
                color="#7C4A21",
                secondary_color="#B87A4B",
            ),
            CropSupplySummary(
                id="crop-2",
                crop=CropType.BANANA,
                volume_tons=1420,
                share_percentage=28,
                harvest_peak_month="Year-round",
                color="#F7A361",
                secondary_color="#FDCB9E",
            ),
            CropSupplySummary(
                id="crop-3",
                crop=CropType.MANGO,
                volume_tons=720,
                share_percentage=15,
                harvest_peak_month="May",
                color="#F87171",
                secondary_color="#FCA5A5",
            ),
            CropSupplySummary(
                id="crop-4",
                crop=CropType.ENSET,
                volume_tons=510,
                share_percentage=10,
                harvest_peak_month="Continuous",
                color="#155D3B",
                secondary_color="#34D399",
            ),
        ]

    async def get_collection_centers(self) -> Sequence[CollectionCenterResponse]:
        models = await self.repo.list_collection_centers()
        if not models:
            # Fallback to frontend DEMO_COLLECTION_CENTERS if empty
            return [
                CollectionCenterResponse(
                    id=uuid.uuid4(),
                    name="Arba Minch Center",
                    region_name="South Region",
                    capacity_tons=1200,
                    current_utilization_tons=1104,
                    utilization_percentage=92,
                    status="Critical",
                    coordinates=[6.035, 37.550],
                ),
                CollectionCenterResponse(
                    id=uuid.uuid4(),
                    name="Mirab Abaya Hub",
                    region_name="Central Region",
                    capacity_tons=850,
                    current_utilization_tons=663,
                    utilization_percentage=78,
                    status="High",
                    coordinates=[6.220, 37.780],
                ),
                CollectionCenterResponse(
                    id=uuid.uuid4(),
                    name="Chencha Facility",
                    region_name="Highland Region",
                    capacity_tons=600,
                    current_utilization_tons=270,
                    utilization_percentage=45,
                    status="Optimal",
                    coordinates=[6.250, 37.570],
                ),
            ]
        return [
            CollectionCenterResponse(
                id=m.id,
                name=m.name,
                region_name=m.region_name,
                capacity_tons=m.capacity_tons,
                current_utilization_tons=m.current_utilization_tons,
                utilization_percentage=m.utilization_percentage,
                status=m.status,
                coordinates=[m.latitude, m.longitude],
            )
            for m in models
        ]

    async def list_farms(self, limit: int = 100, offset: int = 0) -> Sequence[FarmResponse]:
        farms = await self.repo.list_farms(limit=limit, offset=offset)
        return [FarmResponse.model_validate(f) for f in farms]

    async def create_farm(self, farm_dto: FarmCreate) -> FarmResponse:
        farm = await self.repo.create_farm(
            farmer_id=farm_dto.farmer_id,
            name=farm_dto.name,
            size_hectares=farm_dto.size_hectares,
            latitude=farm_dto.center_latitude,
            longitude=farm_dto.center_longitude,
        )
        return FarmResponse.model_validate(farm)
