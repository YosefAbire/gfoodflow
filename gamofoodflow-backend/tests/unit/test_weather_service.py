import uuid
from datetime import UTC, datetime
from unittest.mock import AsyncMock, MagicMock

import pytest

from app.modules.weather.application.schemas import WeatherStationCreate
from app.modules.weather.application.services import WeatherService


@pytest.mark.asyncio
async def test_register_station():
    mock_repo = MagicMock()

    mock_station = MagicMock()
    mock_station.id = uuid.uuid4()
    mock_station.code = "WS-AM-01"
    mock_station.name = "Arba Minch Station"
    mock_station.latitude = 6.0333
    mock_station.longitude = 37.5500
    mock_station.elevation_meters = 1285.0
    mock_station.is_active = True
    mock_station.created_at = datetime.now(UTC)

    mock_repo.create_station = AsyncMock(return_value=mock_station)

    service = WeatherService(mock_repo)
    dto = WeatherStationCreate(
        code="WS-AM-01",
        name="Arba Minch Station",
        latitude=6.0333,
        longitude=37.5500,
        elevation_meters=1285.0,
    )
    result = await service.create_station(dto)

    assert result.code == "WS-AM-01"
    assert result.latitude == 6.0333
    assert result.is_active is True


@pytest.mark.asyncio
async def test_get_weather_summary_fallback():
    mock_repo = MagicMock()

    service = WeatherService(mock_repo)
    summary = await service.get_weather_summary(latitude=6.0333, longitude=37.5500, days=30)

    assert summary.latitude == 6.0333
    assert summary.longitude == 37.5500
    assert summary.total_rainfall_mm > 0
    assert summary.avg_temperature_c > 0


@pytest.mark.asyncio
async def test_calculate_drought_risk():
    mock_repo = MagicMock()

    service = WeatherService(mock_repo)
    risk = await service.calculate_drought_risk(latitude=6.0333, longitude=37.5500, days=90)

    assert risk.latitude == 6.0333
    assert risk.severity != ""
    assert risk.risk_description != ""
