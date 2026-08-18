from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.markets.infrastructure.models import CommodityPriceModel, MarketNodeModel


class MarketRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def list_market_nodes(self) -> Sequence[MarketNodeModel]:
        query = select(MarketNodeModel).where(MarketNodeModel.is_deleted == False)
        result = await self.session.execute(query)
        return result.scalars().all()

    async def list_price_history(self) -> Sequence[CommodityPriceModel]:
        query = select(CommodityPriceModel).where(CommodityPriceModel.is_deleted == False)
        result = await self.session.execute(query)
        return result.scalars().all()
