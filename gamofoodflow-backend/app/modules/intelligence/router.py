from collections.abc import Sequence

from fastapi import APIRouter, Depends

from app.modules.intelligence.application.schemas import (
    AIInsightResponse,
    AnalystChatMessageRequest,
    AnalystChatMessageResponse,
    ScenarioInputRequest,
    ScenarioOutputResponse,
)
from app.modules.intelligence.application.services import IntelligenceService

router = APIRouter()


def get_intelligence_service() -> IntelligenceService:
    return IntelligenceService()


@router.get("/insights", response_model=Sequence[AIInsightResponse], summary="Get AI intelligence insights feed")
async def get_insights(
    service: IntelligenceService = Depends(get_intelligence_service),
) -> Sequence[AIInsightResponse]:
    return await service.get_ai_insights()


@router.post("/scenario/simulate", response_model=ScenarioOutputResponse, summary="Run interactive scenario simulation engine")
async def simulate_scenario(
    input_dto: ScenarioInputRequest,
    service: IntelligenceService = Depends(get_intelligence_service),
) -> ScenarioOutputResponse:
    return await service.run_scenario_simulation(input_dto)


@router.post("/analyst/chat", response_model=AnalystChatMessageResponse, summary="Interact with FoodFlow AI Analyst Agent")
async def chat_analyst(
    request: AnalystChatMessageRequest,
    service: IntelligenceService = Depends(get_intelligence_service),
) -> AnalystChatMessageResponse:
    return await service.chat_with_analyst(request)
