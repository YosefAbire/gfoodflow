from fastapi import APIRouter

from app.api.v1 import health
from app.modules.agriculture.router import router as agriculture_router
from app.modules.alerts.router import router as alerts_router
from app.modules.food_security.router import router as food_security_router
from app.modules.geography.router import router as geography_router
from app.modules.identity.router import router as identity_router
from app.modules.intelligence.router import router as intelligence_router
from app.modules.knowledge.router import router as knowledge_router
from app.modules.logistics.router import router as logistics_router
from app.modules.markets.router import router as markets_router
from app.modules.remote_sensing.router import router as remote_sensing_router
from app.modules.soil.router import router as soil_router
from app.modules.weather.router import router as weather_router

api_router = APIRouter()

# Include health router
api_router.include_router(health.router, prefix="/health", tags=["Health & Observability"])

# Include geography router
api_router.include_router(geography_router, prefix="/geography", tags=["Geography & Spatial Boundaries"])

# Include identity & auth router
api_router.include_router(identity_router, tags=["Identity, Authentication & Organizations"])

# Include agriculture router
api_router.include_router(agriculture_router, prefix="/agriculture", tags=["Agriculture & Collection Centers"])

# Include markets router
api_router.include_router(markets_router, prefix="/markets", tags=["Food Prices & Market Intelligence"])

# Include logistics router
api_router.include_router(logistics_router, prefix="/logistics", tags=["Logistics & Supply Chain"])

# Include intelligence & AI router
api_router.include_router(intelligence_router, prefix="/intelligence", tags=["AI Insights & Scenario Simulation"])

# Include food security engine router
api_router.include_router(food_security_router, prefix="/food-security", tags=["Food Security Engine"])

# Include weather router
api_router.include_router(weather_router, prefix="/weather", tags=["Weather & Climate Intelligence"])

# Include remote sensing router
api_router.include_router(remote_sensing_router, prefix="/remote-sensing", tags=["Remote Sensing & Satellite Pipeline"])

# Include soil router
api_router.include_router(soil_router, prefix="/soil", tags=["Soil Intelligence"])

# Include alerts router
api_router.include_router(alerts_router, prefix="/alerts", tags=["Rule-Based Alerts & Escalation"])

# Include RAG knowledge router
api_router.include_router(knowledge_router, prefix="/knowledge", tags=["RAG & Vector Embeddings AI Gateway"])
