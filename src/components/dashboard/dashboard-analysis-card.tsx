import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
import { Label } from "../ui/label";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const DashboardAnalysisCard = () => {
  return (
    <>
      <div className="w-full h-fit flex items-stretch gap-4 px-2">
        <div className="grid grid-rows-2 max-w-[35%] w-full gap-2">
          <Card className="shadow-none rounded-md w-full h-full">
            <CardHeader className="px-3">
              <CardTitle>Information</CardTitle>
              <Separator className="mt-1" />
            </CardHeader>
            <CardContent className="-mt-2 px-3  w-full grid grid-cols-2 gap-2">
              <>
                <Label className="font-medium text-base font-inter">
                  Station Name
                </Label>
                <span className="font-montserrat text-base ">Maria (Demo)</span>
              </>
              <>
                <Label className="font-medium text-base font-inter">
                  Time Recorded
                </Label>
                <span className="font-montserrat text-base ">
                  2024-01-01 12:00:00
                </span>
              </>{" "}
              <>
                <Label className="font-medium text-base font-inter">
                  Date Recorded
                </Label>
                <span className="font-montserrat text-base ">2024-01-01</span>
              </>
              <>
                <Label className="font-medium text-base font-inter">
                  Current Record
                </Label>
                <span className="font-montserrat text-base ">0 mb</span>
              </>
              <>
                <Label className="font-medium text-base font-inter">
                  Location
                </Label>
                <span className="font-montserrat text-base ">
                  San Jose, Balanga, Bataan
                </span>
              </>
            </CardContent>
          </Card>
          <Card className="shadow-none rounded-md w-full h-full">
            <CardHeader className="px-3">
              <CardTitle>Measurements</CardTitle>
              <Separator className="mt-1" />
            </CardHeader>
            <CardContent className="-mt-2 px-3  w-full grid grid-cols-2 gap-2">
              <>
                <Label className="font-medium text-base font-inter">
                  Highest (Today)
                </Label>
                <span>0.00 mb (12:00 PM)</span>
              </>
              <>
                <Label className="font-medium text-base font-inter">
                  Highest (Today)
                </Label>
                <span>0.00 mb (12:00 PM)</span>
              </>{" "}
              <>
                <Label className="font-medium text-base font-inter">
                  Highest (Today)
                </Label>
                <span>0.00 mb (12:00 PM)</span>
              </>
            </CardContent>
          </Card>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Line Chart - Dots</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 12, right: 12 }}
                className="h-full"
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="desktop"
                  type="natural"
                  stroke="var(--chart-6)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-desktop)" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Separator className="my-5" />
    </>
  );
};

export default DashboardAnalysisCard;
