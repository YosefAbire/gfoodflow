import functools
import json
from collections.abc import Callable
from typing import Any

from app.core.redis import redis_client


def cache_response(expire_seconds: int = 300, key_prefix: str = "cache"):
    """Redis async response caching decorator for high-frequency FastAPI read endpoints."""

    def decorator(func: Callable[..., Any]) -> Callable[..., Any]:
        @functools.wraps(func)
        async def wrapper(*args: Any, **kwargs: Any) -> Any:
            cache_key = f"{key_prefix}:{func.__name__}:{hash(str(args) + str(kwargs))}"
            if redis_client:
                try:
                    cached_data = await redis_client.get(cache_key)
                    if cached_data:
                        return json.loads(cached_data)
                except Exception:
                    pass

            result = await func(*args, **kwargs)

            if redis_client:
                try:
                    serialized = json.dumps(result, default=str)
                    await redis_client.set(cache_key, serialized, ex=expire_seconds)
                except Exception:
                    pass

            return result

        return wrapper

    return decorator
