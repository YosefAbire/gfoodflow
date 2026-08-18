import uuid
from collections.abc import Sequence

from app.core.config import settings
from app.core.exceptions import DomainException, UnauthorizedException
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.modules.identity.application.schemas import (
    LoginRequest,
    OrganizationCreate,
    OrganizationResponse,
    TokenResponse,
    UserCreate,
    UserResponse,
)
from app.modules.identity.infrastructure.repositories import OrganizationRepository, UserRepository


class AuthService:
    def __init__(self, user_repo: UserRepository, org_repo: OrganizationRepository):
        self.user_repo = user_repo
        self.org_repo = org_repo

    async def authenticate_user(self, login_dto: LoginRequest) -> TokenResponse:
        user = await self.user_repo.get_by_email(login_dto.email)
        if not user or not verify_password(login_dto.password, user.hashed_password):
            raise UnauthorizedException("Invalid email or password.")
        if not user.is_active:
            raise UnauthorizedException("User account is inactive.")

        access_token = create_access_token(
            subject=str(user.id),
            extra_claims={"role": user.role, "email": user.email},
        )
        refresh_token = create_refresh_token(subject=str(user.id))

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )

    async def refresh_access_token(self, refresh_token_str: str) -> TokenResponse:
        try:
            payload = decode_token(refresh_token_str)
            if payload.get("type") != "refresh":
                raise UnauthorizedException("Invalid token type.")
            user_id = uuid.UUID(payload.get("sub"))
        except Exception:
            raise UnauthorizedException("Invalid or expired refresh token.") from None

        user = await self.user_repo.get_by_id(user_id)
        if not user or not user.is_active:
            raise UnauthorizedException("User account is inactive or not found.")

        access_token = create_access_token(
            subject=str(user.id),
            extra_claims={"role": user.role, "email": user.email},
        )
        new_refresh_token = create_refresh_token(subject=str(user.id))

        return TokenResponse(
            access_token=access_token,
            refresh_token=new_refresh_token,
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )

    async def register_user(self, user_dto: UserCreate) -> UserResponse:
        existing = await self.user_repo.get_by_email(user_dto.email)
        if existing:
            raise DomainException("Email is already registered.")

        hashed_pwd = hash_password(user_dto.password)
        user = await self.user_repo.create(
            email=user_dto.email,
            full_name=user_dto.full_name,
            hashed_password=hashed_pwd,
            role=user_dto.role,
            organization_id=user_dto.organization_id,
        )
        return UserResponse.model_validate(user)

    async def list_users(self, limit: int = 100, offset: int = 0) -> Sequence[UserResponse]:
        users = await self.user_repo.list_users(limit=limit, offset=offset)
        return [UserResponse.model_validate(u) for u in users]

    async def create_organization(self, org_dto: OrganizationCreate) -> OrganizationResponse:
        org = await self.org_repo.create(
            name=org_dto.name,
            code=org_dto.code,
            org_type=org_dto.org_type,
            contact_email=org_dto.contact_email,
            contact_phone=org_dto.contact_phone,
        )
        return OrganizationResponse.model_validate(org)

    async def list_organizations(self, limit: int = 100, offset: int = 0) -> Sequence[OrganizationResponse]:
        orgs = await self.org_repo.list_orgs(limit=limit, offset=offset)
        return [OrganizationResponse.model_validate(o) for o in orgs]
