import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Activity, Cpu, HardDrive, MemoryStick, Network, Server, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export const Route = createFileRoute("/_root/_superadmin/system/")({
  component: RouteComponent,
});

const ProgressBar = ({ value, max = 100, className = "" }: { value: number; max?: number; className?: string }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const getColor = () => {
    if (percentage < 50) return "bg-green-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className={`h-2 rounded-full transition-all duration-300 ${getColor()}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const MetricCard = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
}) => (
  <Card className="h-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      <Icon className="h-4 w-4 text-gray-500" />
    </CardHeader>
    <CardContent className="space-y-3">{children}</CardContent>
  </Card>
);

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="col-span-full lg:col-span-2">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      <TrendingUp className="h-4 w-4 text-gray-500" />
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

function RouteComponent() {
  return <div>Hello "/(root)/audit-logs/"!</div>;
}
