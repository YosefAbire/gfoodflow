import { fetchWithFallback } from '@/lib/apiClient';
import { DEMO_NETWORK_ZONES } from '@/data/networkData';

export const networkService = {
  getNetworkZones: async () => 
    fetchWithFallback('/geography/boundaries', DEMO_NETWORK_ZONES),
};
