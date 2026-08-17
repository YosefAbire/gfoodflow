from pydantic import BaseModel, Field


class PageParams(BaseModel):
    page: int = Field(default=1, ge=1, description="Page number starting from 1")
    page_size: int = Field(default=50, ge=1, le=500, description="Items per page")

    @property
    def offset(self) -> int:
        return (self.page - 1) * self.page_size


class PageMeta(BaseModel):
    page: int
    page_size: int
    total_items: int
    total_pages: int
    has_next: bool
    has_previous: bool


class PaginatedResponse[T](BaseModel):
    data: list[T]
    meta: PageMeta

    @classmethod
    def create(
        cls,
        items: list[T],
        total_items: int,
        page_params: PageParams,
    ) -> "PaginatedResponse[T]":
        total_pages = (total_items + page_params.page_size - 1) // page_params.page_size if total_items > 0 else 0
        return cls(
            data=items,
            meta=PageMeta(
                page=page_params.page,
                page_size=page_params.page_size,
                total_items=total_items,
                total_pages=total_pages,
                has_next=page_params.page < total_pages,
                has_previous=page_params.page > 1,
            ),
        )
