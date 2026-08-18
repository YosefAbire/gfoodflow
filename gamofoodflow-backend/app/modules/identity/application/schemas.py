import uuid

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.shared.enums import UserRole


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=150)
    password: str = Field(..., min_length=6)
    role: UserRole = UserRole.VIEWER
    organization_id: uuid.UUID | None = None


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    email: EmailStr
    full_name: str
    role: UserRole
    organization_id: uuid.UUID | None = None
    is_active: bool
    is_superuser: bool


class OrganizationCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    code: str = Field(..., min_length=2, max_length=50)
    org_type: str = "AGENCY"
    contact_email: EmailStr | None = None
    contact_phone: str | None = None


class OrganizationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    code: str
    org_type: str
    contact_email: str | None = None
    contact_phone: str | None = None
    is_active: bool
