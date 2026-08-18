from sqlalchemy import Boolean, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class AlertRuleModel(Base):
    """Automated monitoring alert threshold rule."""

    __tablename__ = "alert_rules"

    name: Mapped[str] = mapped_column(String(150), nullable=False, index=True)
    category: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    condition_expression: Mapped[str] = mapped_column(Text, nullable=False)
    severity: Mapped[str] = mapped_column(String(30), nullable=False, default="Warning")
    is_enabled: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)


class NotificationModel(Base):
    """System notification feed message."""

    __tablename__ = "notifications"

    title: Mapped[str] = mapped_column(String(150), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    severity: Mapped[str] = mapped_column(String(30), nullable=False, default="Info")
    is_read: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    timestamp: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
