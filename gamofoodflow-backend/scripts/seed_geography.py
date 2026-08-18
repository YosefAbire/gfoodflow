import asyncio

from sqlalchemy import text

from app.core.database import AsyncSessionFactory
from app.modules.geography.domain.enums import GeographyType
from app.modules.geography.infrastructure.repositories import PostGISGeographyRepository

# GeoJSON MultiPolygon for Gamo Zone (simplified bounding geometry around Arba Minch & surrounding Woredas)
GAMO_ZONE_GEOJSON = {
    "type": "MultiPolygon",
    "coordinates": [[
        [[37.20, 5.80], [37.80, 5.80], [37.80, 6.40], [37.20, 6.40], [37.20, 5.80]]
    ]]
}

ARBA_MINCH_ZURIA_GEOJSON = {
    "type": "MultiPolygon",
    "coordinates": [[
        [[37.45, 5.95], [37.65, 5.95], [37.65, 6.15], [37.45, 6.15], [37.45, 5.95]]
    ]]
}


async def seed_ethiopia_geography():
    """Seed sample Gamo Zone and Ethiopian administrative hierarchy for development."""
    async with AsyncSessionFactory() as session:
        # Check if already seeded
        result = await session.execute(text("SELECT count(*) FROM administrative_boundaries;"))
        count = result.scalar()
        if count and count > 0:
            print("Geography data already seeded.")
            return

        repo = PostGISGeographyRepository(session)

        # 1. Country: Ethiopia
        ethiopia = await repo.create(
            name="Ethiopia",
            code="ET",
            admin_level=GeographyType.COUNTRY,
            population=120000000,
        )

        # 2. Region: South Ethiopia Regional State
        south_ethiopia = await repo.create(
            name="South Ethiopia",
            code="ET-SO",
            admin_level=GeographyType.REGION,
            parent_id=ethiopia.id,
            population=15000000,
        )

        # 3. Zone: Gamo Zone
        gamo_zone = await repo.create(
            name="Gamo Zone",
            code="ET-SO-GAM",
            admin_level=GeographyType.ZONE,
            parent_id=south_ethiopia.id,
            population=1650000,
            geojson_geometry=GAMO_ZONE_GEOJSON,
        )

        # 4. Woredas in Gamo Zone
        arba_minch_zuria = await repo.create(
            name="Arba Minch Zuria",
            code="ET-SO-GAM-AMZ",
            admin_level=GeographyType.WOREDA,
            parent_id=gamo_zone.id,
            population=180000,
            geojson_geometry=ARBA_MINCH_ZURIA_GEOJSON,
        )

        await repo.create(
            name="Chencha Woreda",
            code="ET-SO-GAM-CHE",
            admin_level=GeographyType.WOREDA,
            parent_id=gamo_zone.id,
            population=140000,
        )

        await repo.create(
            name="Mirab Abaya",
            code="ET-SO-GAM-MAB",
            admin_level=GeographyType.WOREDA,
            parent_id=gamo_zone.id,
            population=125000,
        )

        # 5. Kebele: Chamo Kebele (Arba Minch Zuria)
        await repo.create(
            name="Chamo Kebele",
            code="ET-SO-GAM-AMZ-CHM",
            admin_level=GeographyType.KEBELE,
            parent_id=arba_minch_zuria.id,
            population=12000,
        )

        print("Successfully seeded Ethiopian & Gamo Zone spatial administrative boundaries!")


if __name__ == "__main__":
    asyncio.run(seed_ethiopia_geography())
