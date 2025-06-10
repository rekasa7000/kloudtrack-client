import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Cpu, HardDrive, MemoryStick, Network, Server } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";
import { formatBytes, formatUptime } from "@/lib/utils";
import { ChartCard } from "@/components/system-metrics/chart-card";
import { MetricCard } from "@/components/system-metrics/metric-card";
import { useCurrentHealth, useHealthHistory } from "@/hooks/queries/system-metrics-queries";
import { ProgressBar } from "@/components/system-metrics/progress-bar";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import SomethingWentWrong from "@/components/error/something-went-wrong";

export const Route = createFileRoute("/_root/_superadmin/system/")({
  component: RouteComponent,
});

const chartConfig = {
  cpu: {
    label: "CPU Usage",
    color: "#4ade80",
  },
  memory: {
    label: "Memory Usage",
    color: "#60a5fa",
  },
  disk: {
    label: "Disk Usage",
    color: "#facc15",
  },
  temperature: {
    label: "Temperature (°C)",
    color: "#f87171",
  },
} satisfies ChartConfig;

function RouteComponent() {
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useCurrentHealth();

  const { data: history, isLoading: historyLoading, error: historyError } = useHealthHistory();

  const loading = metricsLoading || historyLoading;
  const error = metricsError?.message || historyError?.message || null;

  if (loading) {
    return (
      <div className="h-full  p-6 flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-20 w-20 animate-pulse mx-auto mb-2 text-gray-400" />
          <p className="text-gray-600 text-lg">Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (error || !history || !metrics) {
    return <SomethingWentWrong />;
  }

  if (!metrics) return null;

  const chartData = history
    .map((point) => ({
      timestamp: new Date(point.timestamp).getTime(),
      time: new Date(point.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      cpu: point.cpu.usagePercent,
      memory: point.memory.usagePercent,
      disk: point.disk.usagePercent,
      temperature: point.cpu.temperature || 0,
    }))
    .sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div className="h-full w-full p-6">
      <div className="w-full space-x-6 flex flex-col lg:flex-row">
        <div className="flex flex-col w-full lg:w-1/3 gap-5">
          <div
            className="text-start
         space-y-2"
          >
            <p className="text-lg text-gray-900">Last updated: {new Date(metrics.timestamp).toLocaleTimeString()}</p>
          </div>

          <div className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-6">
            <MetricCard title="CPU" icon={Cpu}>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Usage</span>
                  <span className="font-medium">{metrics.cpu.usagePercent.toFixed(1)}%</span>
                </div>
                <ProgressBar value={metrics.cpu.usagePercent} />
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                  <div>1m: {metrics.cpu.load1Min}</div>
                  <div>5m: {metrics.cpu.load5Min}</div>
                  <div>15m: {metrics.cpu.load15Min}</div>
                </div>
                {metrics.cpu.temperature && (
                  <div className="text-xs text-gray-500">Temp: {metrics.cpu.temperature}°C</div>
                )}
              </div>
            </MetricCard>

            <MetricCard title="Memory" icon={MemoryStick}>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Usage</span>
                  <span className="font-medium">{metrics.memory.usagePercent.toFixed(1)}%</span>
                </div>
                <ProgressBar value={metrics.memory.usagePercent} />
                <div className="text-xs text-gray-500">
                  {metrics.memory.usedGB.toFixed(1)}GB / {metrics.memory.totalGB}GB
                </div>
              </div>
            </MetricCard>

            <MetricCard title="Disk" icon={HardDrive}>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Usage</span>
                  <span className="font-medium">{metrics.disk.usagePercent.toFixed(1)}%</span>
                </div>
                <ProgressBar value={metrics.disk.usagePercent} />
                <div className="text-xs text-gray-500">
                  {metrics.disk.usedGB.toFixed(1)}GB / {metrics.disk.totalGB}GB
                </div>
              </div>
            </MetricCard>

            {metrics.network && (
              <MetricCard title="Network" icon={Network}>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>RX</span>
                    <span className="font-medium">{formatBytes(metrics.network.rxBytes)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>TX</span>
                    <span className="font-medium">{formatBytes(metrics.network.txBytes)}</span>
                  </div>
                </div>
              </MetricCard>
            )}

            <MetricCard title="System" icon={Server}>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uptime</span>
                  <span className="font-medium">{formatUptime(metrics.system.uptime)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Processes</span>
                  <span className="font-medium">{metrics.system.processCount}</span>
                </div>
              </div>
            </MetricCard>
          </div>
        </div>
        {chartData.length > 0 && (
          <div className="flex flex-col w-full gap-6">
            <ChartCard title="CPU & Memory Usage (2 Hours)">
              <div className="h-64">
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="cpu" stroke="#4ade80" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="memory" stroke="#60a5fa" strokeWidth={2} dot={false} />
                  </LineChart>
                </ChartContainer>
              </div>
            </ChartCard>

            <ChartCard title="Storage & Temperature">
              <div className="h-64">
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <LineChart data={chartData} accessibilityLayer margin={{ left: 12, right: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="disk" stroke="#facc15" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="temperature" stroke="#f87171" strokeWidth={2} dot={false} />
                  </LineChart>
                </ChartContainer>
              </div>
            </ChartCard>

            <Card className="col-span-full">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">System Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="cpu"
                        stackId="1"
                        stroke="#4ade80"
                        fill="#4ade80"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="memory"
                        stackId="2"
                        stroke="#60a5fa"
                        fill="#60a5fa"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="disk"
                        stackId="3"
                        stroke="#facc15"
                        fill="#facc15"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
