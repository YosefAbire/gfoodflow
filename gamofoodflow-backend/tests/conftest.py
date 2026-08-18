from collections.abc import AsyncGenerator
from unittest.mock import AsyncMock, MagicMock

import pytest
from httpx import ASGITransport, AsyncClient

from app.core.dependencies import get_db, get_redis_client
from app.main import app


@pytest.fixture
def anyio_backend():
    return "asyncio"


@pytest.fixture
async def async_client() -> AsyncGenerator[AsyncClient, None]:
    """Test client instance for API testing with dependency overrides."""
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = []
    mock_result.first.return_value = None
    mock_result.scalar_one_or_none.return_value = None

    mock_db = MagicMock()
    mock_db.execute = AsyncMock(return_value=mock_result)

    mock_redis = MagicMock()
    mock_redis.ping = AsyncMock(return_value=True)

    async def override_get_db():
        yield mock_db

    async def override_get_redis():
        return mock_redis

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_redis_client] = override_get_redis

    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as client:
        yield client

    app.dependency_overrides.clear()
