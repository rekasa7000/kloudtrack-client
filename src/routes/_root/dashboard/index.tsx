import DashboardCardView from "@/components/dashboard/dashboard-card-view";
import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";

import { CreditCardIcon, ListFilter, Search, Table } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import DashboardTableView from "@/components/dashboard/dashboard-table-view";

export const Route = createFileRoute("/_root/dashboard/")({
  component: Index,
});

function Index() {
  const [view, setView] = useState("Card View");

  const handleViewChange = (newView: string) => {
    setView(newView);
  };

  return (
    <React.Fragment>
      <div className="py-2 w-full flex item-center justify-between">
        <div className="w-lg flex justify-start items-center gap-2.5 justify-self-start">
          <div className="w-full relative ">
            <Search className="w-4 h-4 absolute top-2.5 left-4" />
            <Input className="pl-10 rounded-lg py-2" placeholder="Search...." />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-fit inline-flex gap-2 items-center text-nowrap px-5 py-2 text-sm rounded-md border border-[#D4D4D4] bg-white">
              <ListFilter className="w-4 h-4" />
              <span>Filter</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DropdownMenu>
          {view === "Card View" ? (
            <DropdownMenuTrigger className="w-fit inline-flex gap-2 items-center text-nowrap px-5 py-2 text-sm rounded-md border border-[#D4D4D4] bg-white">
              <CreditCardIcon className="w-4 h-4" />
              <span>Card View</span>
            </DropdownMenuTrigger>
          ) : (
            <DropdownMenuTrigger className="w-fit inline-flex gap-2 items-center text-nowrap px-5 py-2 text-sm rounded-md border border-[#D4D4D4] bg-white">
              <Table className="w-4 h-4" />
              <span>Table View</span>
            </DropdownMenuTrigger>
          )}

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleViewChange("Card View")}>
              Card View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleViewChange("Table View")}>
              Table View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {view === "Card View" ? <DashboardCardView /> : <DashboardTableView />}
    </React.Fragment>
  );
}
