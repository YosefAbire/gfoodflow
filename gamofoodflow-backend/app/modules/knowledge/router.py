from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.modules.knowledge.application.schemas import (
    DocumentIngestRequest,
    DocumentIngestResponse,
    KnowledgeSearchRequest,
    KnowledgeSearchResponse,
)
from app.modules.knowledge.application.services import KnowledgeService
from app.modules.knowledge.infrastructure.repositories import KnowledgeRepository

router = APIRouter()


def get_knowledge_service(db: AsyncSession = Depends(get_db)) -> KnowledgeService:
    repo = KnowledgeRepository(db)
    return KnowledgeService(repo)


@router.post("/ingest", response_model=DocumentIngestResponse, status_code=status.HTTP_201_CREATED, summary="Ingest and index document into vector RAG knowledge base")
async def ingest_document(
    request: DocumentIngestRequest,
    service: KnowledgeService = Depends(get_knowledge_service),
) -> DocumentIngestResponse:
    return await service.ingest_document(request)


@router.post("/search", response_model=KnowledgeSearchResponse, summary="Perform semantic vector RAG search across knowledge base")
async def semantic_search(
    request: KnowledgeSearchRequest,
    service: KnowledgeService = Depends(get_knowledge_service),
) -> KnowledgeSearchResponse:
    return await service.semantic_search(request)
