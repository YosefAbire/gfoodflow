import { fetchWithFallback, apiFetch } from '@/lib/apiClient';
import { DEMO_AI_INSIGHTS, INITIAL_ANALYST_MESSAGES } from '@/data/intelligenceData';
import { runScenarioSimulation } from '@/data/scenarioData';
import { ScenarioInput } from '@/types';

export const intelligenceService = {
  getAIInsights: async () => 
    fetchWithFallback('/intelligence/insights', DEMO_AI_INSIGHTS),

  getInitialAnalystMessages: async () => 
    fetchWithFallback('/intelligence/analyst/messages', INITIAL_ANALYST_MESSAGES),

  runSimulation: async (input: ScenarioInput) => {
    try {
      return await apiFetch('/intelligence/scenario/simulate', {
        method: 'POST',
        body: JSON.stringify(input),
      });
    } catch {
      return runScenarioSimulation(input);
    }
  },
};
