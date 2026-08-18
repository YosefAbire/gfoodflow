import uuid
from dataclasses import dataclass
from datetime import datetime


@dataclass
class DocumentChunkEntity:
    id: uuid.UUID
    document_title: str
    category: str  # Agronomy, PostHarvest, Policy, MarketData
    chunk_index: int
    content: str
    vector_embedding: list[float]
    created_at: datetime
