interface SystemMetrics {
  cpu: {
    usagePercent: number;
    load1Min: number;
    load5Min: number;
    load15Min: number;
    temperature?: number;
  };
  memory: {
    totalGB: number;
    usedGB: number;
    freeGB: number;
    usagePercent: number;
  };
  disk: {
    totalGB: number;
    usedGB: number;
    freeGB: number;
    usagePercent: number;
  };
  network?: {
    rxBytes: string;
    txBytes: string;
  };
  system: {
    uptime: string;
    processCount: number;
  };
}

interface HealthMetricsResponse {
  id: string;
  timestamp: Date;
  cpu: SystemMetrics["cpu"];
  memory: SystemMetrics["memory"];
  disk: SystemMetrics["disk"];
  network?: SystemMetrics["network"];
  system: SystemMetrics["system"];
}

interface ApiResponse {
  success: boolean;
  data: HealthMetricsResponse;
}

interface HistoryApiResponse {
  success: boolean;
  data: HealthMetricsResponse[];
  count: number;
}
