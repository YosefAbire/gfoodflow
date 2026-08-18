from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.knowledge.infrastructure.models import DocumentChunkModel


class KnowledgeRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_chunks(self) -> Sequence[DocumentChunkModel]:
        query = select(DocumentChunkModel).where(DocumentChunkModel.is_deleted == False)
        result = await self.session.execute(query)
        return result.scalars().all()
