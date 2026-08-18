import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_auth_login_and_token_flow(async_client: AsyncClient):
    """Test login endpoint returning valid access and refresh JWT tokens via form data."""
    login_form = {
        "username": "admin@gfoodflow.org",
        "password": "AdminPassword123!",
    }
    response = await async_client.post("/api/v1/auth/login", data=login_form)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


@pytest.mark.asyncio
async def test_auth_refresh_token_flow(async_client: AsyncClient):
    """Test refreshing JWT access token via refresh token."""
    login_form = {
        "username": "admin@gfoodflow.org",
        "password": "AdminPassword123!",
    }
    login_resp = await async_client.post("/api/v1/auth/login", data=login_form)
    refresh_token = login_resp.json()["refresh_token"]

    refresh_resp = await async_client.post(
        "/api/v1/auth/refresh",
        json={"refresh_token": refresh_token},
    )
    assert refresh_resp.status_code == 200
    refreshed_data = refresh_resp.json()
    assert "access_token" in refreshed_data


@pytest.mark.asyncio
async def test_list_users_integration(async_client: AsyncClient):
    """Test listing registered platform users."""
    response = await async_client.get("/api/v1/users")
    assert response.status_code == 200
    users = response.json()
    assert isinstance(users, list)
