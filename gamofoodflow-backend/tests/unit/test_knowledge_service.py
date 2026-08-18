from unittest.mock import MagicMock

import pytest

from app.modules.knowledge.application.schemas import DocumentIngestRequest, KnowledgeSearchRequest
from app.modules.knowledge.application.services import KnowledgeService


@pytest.mark.asyncio
async def test_ingest_document():
    mock_repo = MagicMock()
    service = KnowledgeService(mock_repo)
    req = DocumentIngestRequest(
        title="Gamo Zone Agriculture Policy",
        category="Policy",
        content="Paragraph 1 about maize crops.\n\nParagraph 2 about transport subsidies.",
    )
    res = await service.ingest_document(req)

    assert res.title == "Gamo Zone Agriculture Policy"
    assert res.chunksCreated == 2
    assert res.status == "Indexed & Vectorized"


@pytest.mark.asyncio
async def test_semantic_search():
    mock_repo = MagicMock()
    service = KnowledgeService(mock_repo)
    req = KnowledgeSearchRequest(query="Maize harvest loss in Bonke", top_k=2)
    res = await service.semantic_search(req)

    assert res.query == "Maize harvest loss in Bonke"
    assert len(res.results) == 2
    assert res.results[0].similarityScore >= 0.80
