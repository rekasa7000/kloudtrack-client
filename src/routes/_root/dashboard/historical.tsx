import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import DashboardHistoricalCard from "@/components/dashboard/dashboard-historical-card";
import DashboardHistoricalTable from "@/components/dashboard/dashboard-historical-table";
import { Switch } from "@radix-ui/react-switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@tanstack/react-router";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/_root/dashboard/historical")({
  component: RouteComponent,
});

function RouteComponent() {
  const { theme } = useTheme();

  return (
    <React.Fragment>
      <Breadcrumb className="flex justify-start items-center w-full">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">Realtime</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className={theme === "dark" ? "text-yellow-300" : "text-black"}>
            <BreadcrumbLink asChild>
              <Link to="/dashboard/historical">Historical</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="py-4 px-0 w-full flex items-center justify-between mt-2">
        {/* Left section */}
        <div className="flex flex-col justify-center">
          <h1 className="text-lg font-semibold font-inter">Station Glenn (Demo)</h1>
          <p className="text-sm font-montserrat text-muted-foreground">
            An <span className="font-semibold">automated weather</span> station located at Brgy. San Jose, Balanga City,
            Bataan
          </p>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Show Dots */}
          <div className="flex items-center gap-2">
            <Switch id="show-dots" />
            <Label className="text-sm font-inter" htmlFor="show-dots">
              Show Dots
            </Label>
          </div>

          {/* Interval Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex gap-2 items-center text-sm px-4 py-2 rounded-md border border-gray-300">
              <span className="font-medium font-inter">30 minutes</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="font-montserrat">15 minutes</DropdownMenuItem>
              <DropdownMenuItem className="font-montserrat">30 minutes</DropdownMenuItem>
              <DropdownMenuItem className="font-montserrat">1 hour</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Data Range Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex gap-2 items-center text-sm px-4 py-2 rounded-md border border-gray-300">
              <span className="font-medium font-inter">3 Days</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="font-montserrat">1 Day</DropdownMenuItem>
              <DropdownMenuItem className="font-montserrat">3 Days</DropdownMenuItem>
              <DropdownMenuItem className="font-montserrat">7 Days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="w-full mt-2 flex gap-4 px-0">
        <div className="flex-grow w-3/4">
          <DashboardHistoricalCard />
        </div>
        <div className="w-1/4">
          <DashboardHistoricalTable />
        </div>
      </div>
    </React.Fragment>
  );
}
