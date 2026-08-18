import pytest

from app.core.cache import cache_response


@pytest.mark.asyncio
async def test_cache_decorator():
    @cache_response(expire_seconds=60, key_prefix="test")
    async def sample_endpoint(val: int):
        return {"result": val * 2}

    res1 = await sample_endpoint(5)
    res2 = await sample_endpoint(5)

    assert res1["result"] == 10
    assert res2["result"] == 10
