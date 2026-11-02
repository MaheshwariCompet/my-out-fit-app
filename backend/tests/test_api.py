import pytest
from httpx import AsyncClient, ASGITransport
from main import app

@pytest.mark.asyncio
async def test_health():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/health")
        assert response.status_code == 200
        assert response.json()["app"] == "MyOutFit API"

@pytest.mark.asyncio
async def test_list_closet_items():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/v1/closet")
        assert response.status_code == 200
        items = response.json()
        assert len(items) >= 6
        assert items[0]["title"] == "Tailored Camel Wool Coat"

@pytest.mark.asyncio
async def test_wishlist_cooldown_logic():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/v1/wishlist")
        assert response.status_code == 200
        items = response.json()
        assert len(items) >= 3
        # item 1 is cooling down
        assert items[0]["can_purchase"] is False
        # item 3 has completed cooldown
        assert items[2]["can_purchase"] is True

@pytest.mark.asyncio
async def test_subscription_status():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/v1/subscriptions/status")
        assert response.status_code == 200
        data = response.json()
        assert data["tier"] == "pro_annual"
        assert data["status"] == "trialing"
