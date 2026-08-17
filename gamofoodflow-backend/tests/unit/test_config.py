import pytest

from app.core.config import Settings
from app.shared.pagination import PageParams, PaginatedResponse
from app.shared.validators import validate_ethiopia_bounds, validate_lat_lon


def test_settings_defaults():
    settings = Settings()
    assert settings.APP_NAME == "GamoFoodFlow"
    assert settings.API_V1_STR == "/api/v1"
    assert "postgresql+asyncpg" in settings.async_database_url


def test_lat_lon_validator():
    lat, lon = validate_lat_lon(6.05, 37.55)  # Arba Minch, Gamo Zone
    assert lat == 6.05
    assert lon == 37.55

    with pytest.raises(ValueError):
        validate_lat_lon(95.0, 37.55)


def test_ethiopia_bounds_validator():
    # Arba Minch / Gamo Zone coordinates
    assert validate_ethiopia_bounds(6.03, 37.55) is True
    # Outside Ethiopia (e.g. London)
    assert validate_ethiopia_bounds(51.5, -0.12) is False


def test_pagination_response_creation():
    items = ["item1", "item2", "item3"]
    params = PageParams(page=1, page_size=2)
    response = PaginatedResponse.create(items=items, total_items=10, page_params=params)

    assert response.meta.page == 1
    assert response.meta.page_size == 2
    assert response.meta.total_items == 10
    assert response.meta.total_pages == 5
    assert response.meta.has_next is True
    assert response.meta.has_previous is False
