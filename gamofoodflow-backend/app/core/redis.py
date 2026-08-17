
import redis.asyncio as redis

from app.core.config import settings
from app.core.logging import logger

redis_client: redis.Redis | None = None


async def init_redis() -> redis.Redis | None:
    """Initialize Redis client connection pool."""
    global redis_client
    try:
        redis_client = redis.from_url(
            settings.resolved_redis_url,
            encoding="utf-8",
            decode_responses=True,
        )
        await redis_client.ping()
        logger.info("Connected to Redis successfully.")
        return redis_client
    except Exception as e:
        logger.warning(f"Could not connect to Redis at {settings.resolved_redis_url}: {e}")
        redis_client = None
        return None


async def close_redis() -> None:
    """Close Redis client connection."""
    global redis_client
    if redis_client:
        await redis_client.close()
        logger.info("Closed Redis connection.")


async def get_redis() -> redis.Redis | None:
    """Dependency getter for Redis client."""
    return redis_client
