import { DEMO_AI_INSIGHTS, INITIAL_ANALYST_MESSAGES } from '@/data/intelligenceData';
import { runScenarioSimulation } from '@/data/scenarioData';
import { ScenarioInput } from '@/types';

export const intelligenceService = {
  getAIInsights: async () => DEMO_AI_INSIGHTS,
  getInitialAnalystMessages: async () => INITIAL_ANALYST_MESSAGES,
  runSimulation: async (input: ScenarioInput) => runScenarioSimulation(input),
};
