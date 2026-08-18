import uuid
from dataclasses import dataclass
from datetime import datetime


@dataclass
class AlertRuleEntity:
    id: uuid.UUID
    name: str
    category: str  # Supply, Logistics, Market, Weather
    condition_expression: str
    severity: str  # Low, Medium, High, Critical
    is_enabled: bool
    created_at: datetime


@dataclass
class NotificationEntity:
    id: uuid.UUID
    title: str
    message: str
    category: str
    severity: str
    is_read: bool
    created_at: datetime
