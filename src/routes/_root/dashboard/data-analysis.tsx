import DashboardAnalysisCard from "@/components/dashboard/dashboard-analysis-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  ListFilter,
  CreditCardIcon,
  Table,
  ChevronDown,
} from "lucide-react";
import React from "react";

export const Route = createFileRoute("/_root/dashboard/data-analysis")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <React.Fragment>
      <div className="p-2 w-full flex item-center justify-between mt-2">
        <div className="w-full flex justify-start items-center gap-2.5 justify-self-start">
          <div className="w-full flex flex-col justify-center ">
            <h1 className="text-lg font-semibold font-inter">Air Pressure</h1>
            <p className="text-sm font-montserrat">Something in air</p>
          </div>
          <div className="flex items-center gap-2.5 w-fit">
            <div className="flex items-center w-fit space-x-2">
              <Switch id="airplane-mode" />
              <Label className="text-nowrap font-inter" htmlFor="airplane-mode">
                Show Dots
              </Label>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="w-fit inline-flex gap-2 items-center text-nowrap px-5 py-2 text-sm rounded-md border border-[#D4D4D4] bg-white">
                <span className="font-medium font-inter">Air Pressure</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="font-montserrat">
                  Subscription
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-fit inline-flex gap-2 items-center text-nowrap px-5 py-2 text-sm rounded-md border border-[#D4D4D4] bg-white">
                <span className="font-medium font-inter">Interval</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="font-montserrat">
                  Subscription
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-fit inline-flex gap-2 items-center text-nowrap px-5 py-2 text-sm rounded-md border border-[#D4D4D4] bg-white">
                <span className="font-medium font-inter">Data Range</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="font-montserrat">
                  Subscription
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="w-full mt-2">
        <DashboardAnalysisCard />
      </div>
    </React.Fragment>
  );
}
