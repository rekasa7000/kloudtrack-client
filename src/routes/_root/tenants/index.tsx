import TenantDetails from "@/components/tenant-management/tenant-details";
import TenantList from "@/components/tenant-management/tenant-lis";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Search, ListFilter } from "lucide-react";

export const Route = createFileRoute("/_root/tenants/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen">
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row w-full items-center justify-between ">
          <div className="w-full max-w-lg flex justify-start items-center gap-2.5 justify-self-start">
            <div className="w-full relative ">
              <Search className="w-4 h-4 absolute top-2.5 left-4" />
              <Input
                className="pl-10 rounded-lg py-2 font-inter"
                placeholder="Search...."
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="w-fit inline-flex gap-2 items-center text-nowrap px-5 py-2 text-sm rounded-md border border-[#D4D4D4] bg-white">
                <ListFilter className="w-4 h-4" />
                <span className="font-inter font-medium">Filter</span>
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

          <div className="flex items-center gap-5">
            <p className="text-lg flex justify-center flex-col font-medium text-stone-700 font-inter">
              {" "}
              Total Organizations
              <span className="text-xl font-bold text-green-500">6</span>
            </p>
            <p className="text-lg flex justify-center flex-col font-medium text-green-500 font-inter">
              {" "}
              Active Organizations
              <span className="text-xl font-bold text-stone-700">6</span>
            </p>
          </div>
        </div>
      </div>
      <div className="grid w-full relative grid-cols-1 gap-4 mt-2 md:grid-cols-[40%_60%]">
        <TenantList />
        <TenantDetails />
      </div>
    </main>
  );
}
