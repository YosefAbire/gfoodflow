import uuid
from collections.abc import Sequence
from typing import Any

from fastapi import APIRouter, Depends, Query
from fastapi.responses import Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.modules.geography.application.schemas import GeographyResponse
from app.modules.geography.application.services import GeographyService
from app.modules.geography.domain.enums import GeographyType
from app.modules.geography.infrastructure.repositories import PostGISGeographyRepository

router = APIRouter()


def get_geography_service(db: AsyncSession = Depends(get_db)) -> GeographyService:
    repo = PostGISGeographyRepository(db)
    return GeographyService(repo)


@router.get("/boundaries", response_model=Sequence[GeographyResponse], summary="List administrative boundaries by level")
async def list_boundaries(
    level: GeographyType = Query(..., description="Administrative level (COUNTRY, REGION, ZONE, WOREDA, KEBELE)"),
    parent_id: uuid.UUID | None = Query(None, description="Optional parent boundary ID filter"),
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
    service: GeographyService = Depends(get_geography_service),
) -> Sequence[GeographyResponse]:
    return await service.list_boundaries_by_level(level, parent_id=parent_id, limit=limit, offset=offset)


@router.get("/boundaries/code/{code}", response_model=GeographyResponse, summary="Get boundary by code")
async def get_boundary_by_code(
    code: str,
    service: GeographyService = Depends(get_geography_service),
) -> GeographyResponse:
    return await service.get_boundary_by_code(code)


@router.get("/boundaries/{boundary_id}", response_model=GeographyResponse, summary="Get boundary by ID")
async def get_boundary(
    boundary_id: uuid.UUID,
    service: GeographyService = Depends(get_geography_service),
) -> GeographyResponse:
    return await service.get_boundary_by_id(boundary_id)


@router.get("/lookup/point", response_model=GeographyResponse, summary="Point-in-polygon spatial boundary lookup")
async def point_lookup(
    latitude: float = Query(..., ge=-90.0, le=90.0),
    longitude: float = Query(..., ge=-180.0, le=180.0),
    service: GeographyService = Depends(get_geography_service),
) -> GeographyResponse:
    return await service.point_in_polygon_search(latitude, longitude)


@router.get("/lookup/nearby", response_model=Sequence[GeographyResponse], summary="Nearby administrative boundary spatial query")
async def nearby_lookup(
    latitude: float = Query(..., ge=-90.0, le=90.0),
    longitude: float = Query(..., ge=-180.0, le=180.0),
    radius_km: float = Query(10.0, ge=0.1, le=500.0),
    service: GeographyService = Depends(get_geography_service),
) -> Sequence[GeographyResponse]:
    return await service.nearby_boundaries_search(latitude, longitude, radius_km)


@router.get("/geojson/boundaries", response_model=dict[str, Any], summary="Get administrative boundaries as GeoJSON FeatureCollection")
async def get_geojson_boundaries(
    service: GeographyService = Depends(get_geography_service),
) -> dict[str, Any]:
    return await service.get_geojson_feature_collection()


@router.get("/tiles/{z}/{x}/{y}.pbf", summary="Get Mapbox Vector Tile (.pbf) for spatial layer")
async def get_mvt_tile(
    z: int,
    x: int,
    y: int,
):
    # Return empty PBF vector tile payload for GIS map engines
    return Response(content=b"", media_type="application/x-protobuf")
