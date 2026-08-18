import uuid
from dataclasses import dataclass
from datetime import datetime

from app.shared.enums import UserRole


@dataclass
class Permission:
    id: uuid.UUID
    name: str
    code: str
    description: str | None


@dataclass
class Role:
    id: uuid.UUID
    name: UserRole
    description: str | None
    permissions: list[Permission]


@dataclass
class Organization:
    id: uuid.UUID
    name: str
    code: str
    org_type: str
    contact_email: str | None
    contact_phone: str | None
    is_active: bool
    created_at: datetime
    updated_at: datetime


@dataclass
class User:
    id: uuid.UUID
    email: str
    full_name: str
    hashed_password: str
    role: UserRole
    organization_id: uuid.UUID | None
    is_active: bool
    is_superuser: bool
    created_at: datetime
    updated_at: datetime
