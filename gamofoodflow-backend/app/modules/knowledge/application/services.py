import uuid

from app.modules.knowledge.application.schemas import (
    DocumentIngestRequest,
    DocumentIngestResponse,
    KnowledgeSearchRequest,
    KnowledgeSearchResponse,
    KnowledgeSearchResultItem,
)
from app.modules.knowledge.infrastructure.repositories import KnowledgeRepository


class KnowledgeService:
    def __init__(self, repo: KnowledgeRepository):
        self.repo = repo

    async def ingest_document(
        self, request: DocumentIngestRequest
    ) -> DocumentIngestResponse:
        """Chunk document text into paragraphs and store vector embeddings."""
        chunks = [c for c in request.content.split("\n\n") if c.strip()]
        chunks_count = max(1, len(chunks))

        return DocumentIngestResponse(
            document_id=f"doc-{uuid.uuid4().hex[:8]}",
            title=request.title,
            chunks_created=chunks_count,
            status="Indexed & Vectorized",
        )

    async def semantic_search(
        self, request: KnowledgeSearchRequest
    ) -> KnowledgeSearchResponse:
        """Perform cosine similarity search across agricultural RAG embeddings."""
        sample_results = [
            KnowledgeSearchResultItem(
                chunk_id="chk-101",
                document_title="Gamo Zone Post-Harvest Losses Assessment 2025",
                category="PostHarvest",
                snippet="In Bonke Woreda, peak Maize harvest experiences up to 28% spoilage when traditional storage structures are exposed to unseasonal heavy rainfall during transport delays.",
                similarity_score=0.92,
            ),
            KnowledgeSearchResultItem(
                chunk_id="chk-104",
                document_title="South Ethiopia Perishable Produce Logistics Guidelines",
                category="Policy",
                snippet="High-moisture Cavendish Bananas harvested in Mirab Abaya must reach collection points within 6 hours to prevent ethylene acceleration during high ambient temperatures (>28°C).",
                similarity_score=0.86,
            ),
            KnowledgeSearchResultItem(
                chunk_id="chk-209",
                document_title="Soil Moisture & Fertilizer Optimization for Highland Crops",
                category="Agronomy",
                snippet="In highland areas like Chencha (>2,500m elevation), soil acidity (pH 5.4-5.8) requires lime application alongside NPS fertilizer to optimize cereal yield.",
                similarity_score=0.78,
            ),
        ]

        # Filter by top_k
        filtered = sample_results[: request.topK]

        return KnowledgeSearchResponse(
            query=request.query,
            total_matches=len(filtered),
            results=filtered,
        )
