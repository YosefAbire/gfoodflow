"""create_markets_and_logistics_tables

Revision ID: 0004_markets_logistics
Revises: 0003_agriculture
Create Date: 2026-08-18 07:42:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import geoalchemy2

revision: str = '0005_markets_logistics'
down_revision: Union[str, None] = '0004_weather'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Market Nodes
    op.create_table(
        'market_nodes',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('node_name', sa.String(length=150), nullable=False),
        sa.Column('demand_level', sa.String(length=50), nullable=False),
        sa.Column('avg_price_usd', sa.Float(), nullable=False),
        sa.Column('supply_gap_tons', sa.Float(), nullable=False),
        sa.Column('trend', sa.String(length=20), nullable=False),
        sa.Column('primary_crops_json', sa.Text(), nullable=False),
        sa.Column('latitude', sa.Float(), nullable=False),
        sa.Column('longitude', sa.Float(), nullable=False),
        sa.Column('geom', geoalchemy2.types.Geometry(geometry_type='POINT', srid=4326, spatial_index=False), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('is_deleted', sa.Boolean(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_market_nodes_node_name'), 'market_nodes', ['node_name'], unique=True)

    # Commodity Prices
    op.create_table(
        'commodity_prices',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('market_node_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('crop_type', sa.String(length=50), nullable=False),
        sa.Column('price_etb_per_kg', sa.Float(), nullable=False),
        sa.Column('price_usd_per_ton', sa.Float(), nullable=False),
        sa.Column('observation_date', sa.String(length=50), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('is_deleted', sa.Boolean(), nullable=False),
        sa.ForeignKeyConstraint(['market_node_id'], ['market_nodes.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )

    # Shipments
    op.create_table(
        'shipments',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('tracking_code', sa.String(length=50), nullable=False),
        sa.Column('route_name', sa.String(length=150), nullable=False),
        sa.Column('origin', sa.String(length=100), nullable=False),
        sa.Column('destination', sa.String(length=100), nullable=False),
        sa.Column('cargo_description', sa.String(length=150), nullable=False),
        sa.Column('quantity_tons', sa.Float(), nullable=False),
        sa.Column('perishability_risk_pct', sa.Float(), nullable=False),
        sa.Column('status', sa.String(length=50), nullable=False),
        sa.Column('estimated_arrival', sa.String(length=100), nullable=False),
        sa.Column('carrier', sa.String(length=100), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('is_deleted', sa.Boolean(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_shipments_tracking_code'), 'shipments', ['tracking_code'], unique=True)

    # Logistics Bottlenecks
    op.create_table(
        'logistics_bottlenecks',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('location_name', sa.String(length=150), nullable=False),
        sa.Column('bottleneck_type', sa.String(length=50), nullable=False),
        sa.Column('delay_minutes', sa.Integer(), nullable=False),
        sa.Column('impact_text', sa.Text(), nullable=False),
        sa.Column('severity', sa.String(length=30), nullable=False),
        sa.Column('latitude', sa.Float(), nullable=False),
        sa.Column('longitude', sa.Float(), nullable=False),
        sa.Column('geom', geoalchemy2.types.Geometry(geometry_type='POINT', srid=4326, spatial_index=False), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('is_deleted', sa.Boolean(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    op.drop_table('logistics_bottlenecks')
    op.drop_table('shipments')
    op.drop_table('commodity_prices')
    op.drop_table('market_nodes')
