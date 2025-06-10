import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="col-span-full lg:col-span-2">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      <TrendingUp className="h-4 w-4 text-gray-500" />
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
