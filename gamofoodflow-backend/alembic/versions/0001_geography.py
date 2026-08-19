"""create_administrative_boundaries_table

Revision ID: 0001_geography
Revises: 
Create Date: 2026-08-17 06:40:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import geoalchemy2

revision: str = '0001_geography'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Ensure PostGIS extension is enabled
    op.execute("CREATE EXTENSION IF NOT EXISTS postgis;")

    op.create_table(
        'administrative_boundaries',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('name', sa.String(length=150), nullable=False),
        sa.Column('code', sa.String(length=50), nullable=False),
        sa.Column('admin_level', sa.String(length=30), nullable=False),
        sa.Column('parent_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('area_sq_km', sa.Float(), nullable=True),
        sa.Column('population', sa.BigInteger(), nullable=True),
        sa.Column('geom', geoalchemy2.types.Geometry(geometry_type='MULTIPOLYGON', srid=4326, spatial_index=False), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('is_deleted', sa.Boolean(), nullable=False),
        sa.ForeignKeyConstraint(['parent_id'], ['administrative_boundaries.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_administrative_boundaries_admin_level'), 'administrative_boundaries', ['admin_level'], unique=False)
    op.create_index(op.f('ix_administrative_boundaries_code'), 'administrative_boundaries', ['code'], unique=True)
    op.create_index(op.f('ix_administrative_boundaries_id'), 'administrative_boundaries', ['id'], unique=False)
    op.create_index(op.f('ix_administrative_boundaries_is_deleted'), 'administrative_boundaries', ['is_deleted'], unique=False)
    op.create_index(op.f('ix_administrative_boundaries_name'), 'administrative_boundaries', ['name'], unique=False)
    op.create_index(op.f('ix_administrative_boundaries_parent_id'), 'administrative_boundaries', ['parent_id'], unique=False)
    op.create_index('idx_admin_boundaries_geom', 'administrative_boundaries', ['geom'], postgresql_using='gist')


def downgrade() -> None:
    op.drop_index('idx_admin_boundaries_geom', table_name='administrative_boundaries', postgresql_using='gist')
    op.drop_index(op.f('ix_administrative_boundaries_parent_id'), table_name='administrative_boundaries')
    op.drop_index(op.f('ix_administrative_boundaries_name'), table_name='administrative_boundaries')
    op.drop_index(op.f('ix_administrative_boundaries_is_deleted'), table_name='administrative_boundaries')
    op.drop_index(op.f('ix_administrative_boundaries_id'), table_name='administrative_boundaries')
    op.drop_index(op.f('ix_administrative_boundaries_code'), table_name='administrative_boundaries')
    op.drop_index(op.f('ix_administrative_boundaries_admin_level'), table_name='administrative_boundaries')
    op.drop_table('administrative_boundaries')
