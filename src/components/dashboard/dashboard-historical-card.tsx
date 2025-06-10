import { Activity, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "../ui/separator";
import SomethingWentWrong from "../error/something-went-wrong";
import { ChartCard } from "../system-metrics/chart-card";

// Dummy data
const history = Array.from({ length: 13 }, (_, index) => {
  const timestamp = new Date(Date.now() - (120 - index * 10) * 60 * 1000);
  return {
    timestamp: timestamp.toISOString(),
    cpu: {
      usagePercent: Math.random() * 30 + 20,
      temperature: Math.random() * 20 + 50,
    },
    memory: {
      usagePercent: Math.random() * 40 + 30,
    },
    disk: {
      usagePercent: Math.random() * 20 + 60,
    },
  };
});

const DashboardHistoricalCard = () => {
  // Mock loading and error states
  const loading = false;
  const error = null;

  if (loading) {
    return (
      <div className="h-full p-6 flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-20 w-20 animate-pulse mx-auto mb-2 text-gray-400" />
          <p className="text-gray-600 text-lg">Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (error || !history) {
    return <SomethingWentWrong />;
  }

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

  return (
    <>
      <div className="w-full h-fit flex items-stretch gap-4">
        <div className="w-full">
          <CardHeader className="mb-2 p-0">
            <CardTitle>Line Chart - Dots</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="h-full px-0">
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
          </CardContent>
        </div>
      </div>
      <Separator className="my-5" />
    </>
  );
};

export default DashboardHistoricalCard;