import TenantDetails from "@/components/organizations/organization-details";
import TenantList from "@/components/organizations/organization-list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tenant } from "@/types/tenant";
import { createFileRoute } from "@tanstack/react-router";
import { Building, ListFilter, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_root/_superadmin/organizations/")({
  component: RouteComponent,
});

const data: Tenant[] = [
  {
    id: 1,
    icon: <Building />,
    tenantName: "John Doe",
    status: "Active",
    description: "Individual tenant managing personal projects and subscriptions.",
    dateCreated: "2023-01-15T10:30:00Z",
  },
  {
    id: 2,
    icon: <Building />,
    tenantName: "Jane Smith",
    status: "Inactive",
    description: "Freelancer account, currently on hiatus.",
    dateCreated: "2023-02-20T14:45:00Z",
  },
  {
    id: 3,
    icon: <Building />,
    tenantName: "Acme Corp",
    status: "Active",
    description: "Enterprise client with multiple active projects and teams.",
    dateCreated: "2022-11-10T09:00:00Z",
  },
  {
    id: 4,
    icon: <Building />,
    tenantName: "Global Inc",
    status: "Active",
    description: "Multinational corporation managing global operations.",
    dateCreated: "2023-03-05T16:20:00Z",
  },
  {
    id: 5,
    icon: <Building />,
    tenantName: "Sarah Johnson",
    status: "Inactive",
    description: "Consultant account, temporarily inactive.",
    dateCreated: "2023-04-12T11:15:00Z",
  },
  {
    id: 6,
    icon: <Building />,
    tenantName: "Tech Solutions",
    status: "Active",
    description: "Tech startup providing innovative software solutions.",
    dateCreated: "2023-05-01T08:50:00Z",
  },
  {
    id: 7,
    icon: <Building />,
    tenantName: "Tech Solutions",
    status: "Active",
    description: "Tech startup branch focusing on AI development.",
    dateCreated: "2023-06-10T13:25:00Z",
  },
  {
    id: 8,
    icon: <Building />,
    tenantName: "Tech Solutions",
    status: "Active",
    description: "Tech startup division for cloud services.",
    dateCreated: "2023-07-18T17:40:00Z",
  },
  {
    id: 9,
    icon: <Building />,
    tenantName: "Tech Solutions",
    status: "Active",
    description: "Tech startup team working on cybersecurity products.",
    dateCreated: "2023-08-22T10:10:00Z",
  },
  {
    id: 10,
    icon: <Building />,
    tenantName: "Tech Solutions",
    status: "Active",
    description: "Tech startup unit specializing in blockchain technology.",
    dateCreated: "2023-09-30T15:55:00Z",
  },
  {
    id: 11,
    icon: <Building />,
    tenantName: "Tech Solutions",
    status: "Active",
    description: "Tech startup group focused on IoT solutions.",
    dateCreated: "2023-10-05T12:30:00Z",
  },
  {
    id: 12,
    icon: <Building />,
    tenantName: "Tech Solutions",
    status: "Active",
    description: "Tech startup team developing mobile applications.",
    dateCreated: "2023-11-12T09:45:00Z",
  },
  {
    id: 13,
    icon: <Building />,
    tenantName: "Tech Solutions",
    status: "Active",
    description: "Tech startup division for data analytics services.",
    dateCreated: "2023-12-20T14:20:00Z",
  },
  {
    id: 14,
    icon: <Building />,
    tenantName: "Tech Solutions",
    status: "Active",
    description: "Tech startup unit working on virtual reality projects.",
    dateCreated: "2024-01-25T11:00:00Z",
  },
  {
    id: 15,
    icon: <Building />,
    tenantName: "Tech Solutions",
    status: "Active",
    description: "Tech startup team focusing on machine learning algorithms.",
    dateCreated: "2024-02-15T16:35:00Z",
  },
  {
    id: 16,
    icon: <Building />,
    tenantName: "Tech Solutions",
    status: "Active",
    description: "Tech startup group specializing in SaaS products.",
    dateCreated: "2024-03-10T13:50:00Z",
  },
];

function RouteComponent() {
  //  simple implementation of tenant list and details
  // ? need to be refactored
  const [selectedTenant, setSelectedTenant] = useState(data[0] || null);

  function handleSelectTenant(tenant: any) {
    console.log(selectedTenant);
    setSelectedTenant(tenant);
  }

  return (
    <main className="flex flex-col items-center w-full min-h-screen">
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row w-full items-center justify-between ">
          <div className="w-full max-w-lg flex justify-start items-center gap-2.5 justify-self-start">
            <div className="w-full relative ">
              <Search className="w-4 h-4 absolute top-2.5 left-4" />
              <Input className="pl-10 rounded-lg py-2 font-inter" placeholder="Search...." />
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
        <TenantList items={data} onSelect={handleSelectTenant} />
        <TenantDetails tenant={selectedTenant} />
      </div>
    </main>
  );
}
