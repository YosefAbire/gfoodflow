import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_alert_rules_integration(async_client: AsyncClient):
    response = await async_client.get("/api/v1/alerts/rules")
    assert response.status_code == 200
    rules = response.json()
    assert len(rules) == 3
    assert rules[0]["severity"] == "Critical"


@pytest.mark.asyncio
async def test_notifications_integration(async_client: AsyncClient):
    response = await async_client.get("/api/v1/alerts/notifications")
    assert response.status_code == 200
    notifs = response.json()
    assert len(notifs) == 3
    assert notifs[0]["id"] == "notif-1"


@pytest.mark.asyncio
async def test_rag_ingest_and_search_integration(async_client: AsyncClient):
    ingest_payload = {
        "title": "Gamo Food Security Policy Guidelines",
        "category": "Policy",
        "content": "Paragraph 1 detailing cereal reserves.\n\nParagraph 2 detailing road access subsidies.",
    }
    ingest_resp = await async_client.post("/api/v1/knowledge/ingest", json=ingest_payload)
    assert ingest_resp.status_code == 201
    ingest_data = ingest_resp.json()
    assert ingest_data["chunks_created"] == 2

    search_payload = {
        "query": "cereal reserves and subsidies",
        "top_k": 3,
    }
    search_resp = await async_client.post("/api/v1/knowledge/search", json=search_payload)
    assert search_resp.status_code == 200
    search_data = search_resp.json()
    assert len(search_data["results"]) >= 1
