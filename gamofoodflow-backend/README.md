# GamoFoodFlow Backend

Production-grade Backend Engine for the **GamoFoodFlow** Agricultural and Food-Security Intelligence Platform.

Designed initially for Gamo Zone / South Ethiopia and scalable to regional and national Ethiopian food intelligence contexts.

## Architecture

- **Clean Architecture & Modular Monolith**: Strictly decoupled domain modules (`identity`, `geography`, `agriculture`, `weather`, `remote_sensing`, `food_security`, `food_prices`, `supply_chain`, `forecasting`, `alerts`, `ai`).
- **PostGIS Spatial Engine**: Native PostGIS 3.4 integration for Ethiopian administrative boundaries (Region, Zone, Woreda, Kebele) and geospatial field boundaries.
- **AI & RAG Gateway**: LangChain & LangGraph agents backed by configurable LLMs (Google Gemini, OpenAI) and pgvector document search.
- **Asynchronous Execution**: Python 3.12+ FastAPI, SQLAlchemy 2.0 Async ORM, Celery 5 background tasks, and Redis 7.

## Quick Start (Docker)

```bash
docker compose up -d
```

Access OpenAPI Documentation at `http://localhost:8000/docs`.

## Local Development

```bash
# Install dependencies
pip install -e ".[dev]"

# Run database migrations
alembic upgrade head

# Run tests
pytest

# Start FastAPI dev server
uvicorn app.main:app --reload
```
