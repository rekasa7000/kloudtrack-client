import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { SYSTEM_METRICS_KEYS } from "./query-keys";
import { fetchCurrentMetrics, fetchHistoricalMetrics } from "@/api/services/system-metrics-service";

export const useCurrentHealth = (): UseQueryResult<HealthMetricsResponse> => {
  return useQuery({
    queryKey: [SYSTEM_METRICS_KEYS.CURRENT_HEALTH],
    queryFn: () => fetchCurrentMetrics(),
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5000,
  });
};

export const useHealthHistory = (): UseQueryResult<HealthMetricsResponse[]> => {
  return useQuery({
    queryKey: [SYSTEM_METRICS_KEYS.HEALTH_HISTORY],
    queryFn: () => fetchHistoricalMetrics(),
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5000,
  });
};
