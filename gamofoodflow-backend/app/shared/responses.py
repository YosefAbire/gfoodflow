from typing import Any

from pydantic import BaseModel


class APIResponse[T](BaseModel):
    data: T
    meta: dict[str, Any] | None = None


class ErrorDetail(BaseModel):
    code: str
    message: str
    details: dict[str, Any] | None = None


class APIErrorResponse(BaseModel):
    error: ErrorDetail
