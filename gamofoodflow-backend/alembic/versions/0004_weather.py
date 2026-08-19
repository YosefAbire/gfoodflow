"""create_weather_tables

Revision ID: 0004_weather
Revises: 0003_agriculture
Create Date: 2026-08-18 07:40:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import geoalchemy2

revision: str = '0004_weather'
down_revision: Union[str, None] = '0003_agriculture'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Weather Stations
    op.create_table(
        'weather_stations',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('station_code', sa.String(length=50), nullable=False),
        sa.Column('name', sa.String(length=150), nullable=False),
        sa.Column('latitude', sa.Float(), nullable=False),
        sa.Column('longitude', sa.Float(), nullable=False),
        sa.Column('elevation_m', sa.Float(), nullable=True),
        sa.Column('status', sa.String(length=50), nullable=False),
        sa.Column('kebele_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('geom', geoalchemy2.types.Geometry(geometry_type='POINT', srid=4326, spatial_index=False), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('is_deleted', sa.Boolean(), nullable=False),
        sa.ForeignKeyConstraint(['kebele_id'], ['administrative_boundaries.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('station_code')
    )
    op.create_index('idx_weather_stations_geom', 'weather_stations', ['geom'], postgresql_using='gist')
    op.create_index('idx_weather_stations_code', 'weather_stations', ['station_code'])

    # Weather Observations
    op.create_table(
        'weather_observations',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('station_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('timestamp', sa.DateTime(timezone=True), nullable=False),
        sa.Column('temperature_c', sa.Float(), nullable=False),
        sa.Column('max_temperature_c', sa.Float(), nullable=True),
        sa.Column('min_temperature_c', sa.Float(), nullable=True),
        sa.Column('rainfall_mm', sa.Float(), nullable=False),
        sa.Column('humidity_pct', sa.Float(), nullable=True),
        sa.Column('wind_speed_ms', sa.Float(), nullable=True),
        sa.Column('solar_radiation_mj', sa.Float(), nullable=True),
        sa.Column('soil_moisture_pct', sa.Float(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('is_deleted', sa.Boolean(), nullable=False),
        sa.ForeignKeyConstraint(['station_id'], ['weather_stations.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('idx_weather_obs_station_time', 'weather_observations', ['station_id', 'timestamp'])


def downgrade() -> None:
    op.drop_index('idx_weather_obs_station_time', table_name='weather_observations')
    op.drop_table('weather_observations')
    op.drop_index('idx_weather_stations_code', table_name='weather_stations')
    op.drop_index('idx_weather_stations_geom', table_name='weather_stations', postgresql_using='gist')
    op.drop_table('weather_stations')
