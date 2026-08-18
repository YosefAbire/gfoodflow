import uuid
from collections.abc import Sequence

from app.modules.alerts.application.schemas import (
    AlertRuleResponse,
    NotificationResponse,
)
from app.modules.alerts.infrastructure.repositories import AlertRepository


class AlertService:
    def __init__(self, repo: AlertRepository):
        self.repo = repo

    async def list_alert_rules(self) -> Sequence[AlertRuleResponse]:
        return [
            AlertRuleResponse(
                id=uuid.uuid4(),
                name="Collection Center Capacity Critical (>90%)",
                category="Supply",
                condition_expression="center.current_utilization_tons / center.capacity_tons > 0.90",
                severity="Critical",
                is_enabled=True,
            ),
            AlertRuleResponse(
                id=uuid.uuid4(),
                name="Transport Corridor Transit Delay (>45 mins)",
                category="Logistics",
                condition_expression="bottleneck.delay_minutes > 45",
                severity="High",
                is_enabled=True,
            ),
            AlertRuleResponse(
                id=uuid.uuid4(),
                name="Market Wholesale Price Spike (>15%)",
                category="Market",
                condition_expression="price_change_pct > 15.0",
                severity="Warning",
                is_enabled=True,
            ),
        ]

    async def list_notifications(self) -> Sequence[NotificationResponse]:
        return [
            NotificationResponse(
                id="notif-1",
                title="Bonke Maize Harvest Surge Alert",
                message="Maize volume in Bonke is projected +2,840 tons above baseline. Transport deficit detected.",
                category="Supply",
                severity="Critical",
                is_read=False,
                timestamp="10 mins ago",
            ),
            NotificationResponse(
                id="notif-2",
                title="Chencha Escarpment Road Delay",
                message="Heavy rainfall has slowed freight truck speeds on Route A7 near Chencha.",
                category="Logistics",
                severity="Warning",
                is_read=False,
                timestamp="1 hour ago",
            ),
            NotificationResponse(
                id="notif-3",
                title="Arba Minch Banana Price Spike",
                message="Wholesale prices increased +18.1% due to surging buyers from Hawassa & Addis.",
                category="Market",
                severity="Info",
                is_read=True,
                timestamp="3 hours ago",
            ),
        ]
