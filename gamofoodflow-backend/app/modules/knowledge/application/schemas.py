from pydantic import BaseModel, ConfigDict, Field


class DocumentIngestRequest(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    category: str = Field(..., max_length=50)  # Agronomy, PostHarvest, Policy, MarketData
    content: str = Field(..., min_length=20)
    tags: list[str] = Field(default_factory=list)


class DocumentIngestResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    documentId: str = Field(..., alias="document_id")
    title: str
    chunksCreated: int = Field(..., alias="chunks_created")
    status: str


class KnowledgeSearchRequest(BaseModel):
    query: str = Field(..., min_length=2)
    topK: int = Field(5, alias="top_k", ge=1, le=20)
    minSimilarity: float = Field(0.60, alias="min_similarity")


class KnowledgeSearchResultItem(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    chunkId: str = Field(..., alias="chunk_id")
    documentTitle: str = Field(..., alias="document_title")
    category: str
    snippet: str
    similarityScore: float = Field(..., alias="similarity_score")


class KnowledgeSearchResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    query: str
    totalMatches: int = Field(..., alias="total_matches")
    results: list[KnowledgeSearchResultItem]
