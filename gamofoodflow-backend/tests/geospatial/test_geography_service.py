import uuid
from unittest.mock import AsyncMock, MagicMock

import pytest

from app.modules.geography.application.services import GeographyService
from app.modules.geography.domain.entities import AdministrativeBoundary
from app.modules.geography.domain.enums import GeographyType
from app.shared.utils import utc_now


@pytest.mark.asyncio
async def test_geography_service_get_by_id():
    mock_repo = MagicMock()
    boundary_id = uuid.uuid4()
    mock_entity = AdministrativeBoundary(
        id=boundary_id,
        name="Gamo Zone",
        code="ET-SO-GAM",
        admin_level=GeographyType.ZONE,
        parent_id=None,
        geojson_geometry=None,
        area_sq_km=6000.0,
        population=1650000,
        created_at=utc_now(),
        updated_at=utc_now(),
    )
    mock_repo.get_by_id = AsyncMock(return_value=mock_entity)

    service = GeographyService(mock_repo)
    result = await service.get_boundary_by_id(boundary_id)

    assert result.name == "Gamo Zone"
    assert result.code == "ET-SO-GAM"
    assert result.admin_level == GeographyType.ZONE
    mock_repo.get_by_id.assert_called_once_with(boundary_id)


@pytest.mark.asyncio
async def test_geography_service_point_lookup():
    mock_repo = MagicMock()
    mock_entity = AdministrativeBoundary(
        id=uuid.uuid4(),
        name="Arba Minch Zuria",
        code="ET-SO-GAM-AMZ",
        admin_level=GeographyType.WOREDA,
        parent_id=None,
        geojson_geometry={"type": "Point", "coordinates": [37.55, 6.03]},
        area_sq_km=1200.0,
        population=180000,
        created_at=utc_now(),
        updated_at=utc_now(),
    )
    mock_repo.find_containing_point = AsyncMock(return_value=mock_entity)

    service = GeographyService(mock_repo)
    result = await service.point_in_polygon_search(6.03, 37.55)

    assert result.name == "Arba Minch Zuria"
    assert result.admin_level == GeographyType.WOREDA
    mock_repo.find_containing_point.assert_called_once_with(6.03, 37.55)
