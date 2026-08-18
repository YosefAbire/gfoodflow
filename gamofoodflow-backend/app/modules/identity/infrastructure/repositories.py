import uuid
from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.identity.infrastructure.models import OrganizationModel, UserModel
from app.shared.enums import UserRole


class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, user_id: uuid.UUID) -> UserModel | None:
        query = select(UserModel).where(UserModel.id == user_id, UserModel.is_deleted == False)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> UserModel | None:
        query = select(UserModel).where(UserModel.email == email, UserModel.is_deleted == False)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def list_users(self, limit: int = 100, offset: int = 0) -> Sequence[UserModel]:
        query = select(UserModel).where(UserModel.is_deleted == False).limit(limit).offset(offset)
        result = await self.session.execute(query)
        return result.scalars().all()

    async def create(
        self,
        email: str,
        full_name: str,
        hashed_password: str,
        role: UserRole = UserRole.VIEWER,
        organization_id: uuid.UUID | None = None,
        is_superuser: bool = False,
    ) -> UserModel:
        user = UserModel(
            email=email,
            full_name=full_name,
            hashed_password=hashed_password,
            role=role,
            organization_id=organization_id,
            is_superuser=is_superuser,
        )
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)
        return user


class OrganizationRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, org_id: uuid.UUID) -> OrganizationModel | None:
        query = select(OrganizationModel).where(OrganizationModel.id == org_id, OrganizationModel.is_deleted == False)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def list_orgs(self, limit: int = 100, offset: int = 0) -> Sequence[OrganizationModel]:
        query = select(OrganizationModel).where(OrganizationModel.is_deleted == False).limit(limit).offset(offset)
        result = await self.session.execute(query)
        return result.scalars().all()

    async def create(
        self,
        name: str,
        code: str,
        org_type: str = "AGENCY",
        contact_email: str | None = None,
        contact_phone: str | None = None,
    ) -> OrganizationModel:
        org = OrganizationModel(
            name=name,
            code=code,
            org_type=org_type,
            contact_email=contact_email,
            contact_phone=contact_phone,
        )
        self.session.add(org)
        await self.session.commit()
        await self.session.refresh(org)
        return org
