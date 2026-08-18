import uuid

from pydantic import BaseModel, ConfigDict, Field


class AlertRuleCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=150)
    category: str = Field(..., min_length=2, max_length=50)
    conditionExpression: str = Field(..., alias="condition_expression")
    severity: str = Field("Warning", max_length=30)
    isEnabled: bool = Field(True, alias="is_enabled")


class AlertRuleResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    category: str
    conditionExpression: str = Field(..., alias="condition_expression")
    severity: str
    isEnabled: bool = Field(..., alias="is_enabled")


class NotificationResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    title: str
    message: str
    category: str
    severity: str
    isRead: bool = Field(..., alias="is_read")
    timestamp: str
