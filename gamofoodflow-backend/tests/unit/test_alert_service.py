from unittest.mock import MagicMock

import pytest

from app.modules.alerts.application.services import AlertService


@pytest.mark.asyncio
async def test_list_alert_rules():
    mock_repo = MagicMock()
    service = AlertService(mock_repo)
    rules = await service.list_alert_rules()

    assert len(rules) == 3
    assert rules[0].category == "Supply"
    assert rules[0].severity == "Critical"
    assert rules[0].isEnabled is True


@pytest.mark.asyncio
async def test_list_notifications():
    mock_repo = MagicMock()
    service = AlertService(mock_repo)
    notifs = await service.list_notifications()

    assert len(notifs) == 3
    assert notifs[0].id == "notif-1"
    assert notifs[0].isRead is False
