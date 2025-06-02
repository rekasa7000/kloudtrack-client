import { ListFilter, Search } from "lucide-react";
import { Input } from "../ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import StationTable from "./station-table";

export const StationList = () => {
  return (
    <div className="flex flex-col items-center w-full mt-2 gap-2">
      <div className="w-full flex justify-between">
        <div className="w-full max-w-lg flex justify-start items-center gap-2.5 justify-self-start">
          <div className="w-full relative">
            <Search className="w-4 h-4 absolute top-2.5 left-4" />
            <Input className="pl-10 rounded-lg py-2 font-inter" placeholder="Search...." />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="w-fit inline-flex gap-2 items-center text-nowrap px-5 py-2 text-sm rounded-md border border-[#D4D4D4] bg-white">
              <ListFilter className="w-4 h-4" />
              <span className="font-medium">Filter</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Station Name</DropdownMenuItem>
              <DropdownMenuItem>Organization</DropdownMenuItem>
              <DropdownMenuItem>Active</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <StationTable />
    </div>
  );
};
