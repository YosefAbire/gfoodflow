from typing import Any

import redis.asyncio as redis
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.dependencies import get_db, get_redis_client

router = APIRouter()


@router.get("", summary="General Health Status")
async def health_check() -> dict[str, Any]:
    """Basic service health status."""
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "environment": settings.APP_ENV,
    }


@router.get("/live", summary="Liveness Probe")
async def liveness_check() -> dict[str, str]:
    """Kubernetes / Docker liveness probe."""
    return {"status": "alive"}


@router.get("/readiness", summary="Readiness Probe")
async def readiness_check(
    db: AsyncSession = Depends(get_db),
    redis_c: redis.Redis = Depends(get_redis_client),
) -> JSONResponse:
    """Check readiness of Database and Redis connections."""
    db_status = "ok"
    redis_status = "ok"
    is_ready = True

    # Test DB
    try:
        await db.execute(text("SELECT 1"))
    except Exception as e:
        db_status = f"unhealthy: {e!s}"
        is_ready = False

    # Test Redis
    try:
        if redis_c:
            await redis_c.ping()
        else:
            redis_status = "unavailable"
    except Exception as e:
        redis_status = f"unhealthy: {e!s}"

    content = {
        "status": "ready" if is_ready else "not_ready",
        "components": {
            "database": db_status,
            "redis": redis_status,
        },
    }

    status_code = status.HTTP_200_OK if is_ready else status.HTTP_53TC_SERVICE_UNAVAILABLE if False else status.HTTP_503_SERVICE_UNAVAILABLE
    return JSONResponse(status_code=status_code, content=content)
