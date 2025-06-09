import {
  Wifi,
  AlertTriangle,
  FileText,
  Shield,
  User,
  Search,
  ListFilter,
  UserIcon,
  UserCog,
  UserCheckIcon,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import UserTable, { UserData } from "@/components/user/user-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_root/_superadmin/users/")({
  component: RouteComponent,
});

const usersMockData = {
  totals: {
    totalUsers: 25,
    totalAdmins: 5,
    totalSuperadmins: 1,
    totalActive: 22,
    totalInactive: 3,
  },
  users: [
    {
      id: 1,
      username: "jdoe",
      fullName: "John Doe",
      organization: "Acme Corp",
      lastSeen: "2025-06-04T14:30:00Z",
      dateCreated: "2023-09-15T09:00:00Z",
      status: "Active",
      role: "User",
    },
    {
      id: 2,
      username: "asmith",
      fullName: "Alice Smith",
      organization: "Beta Ltd.",
      lastSeen: "2025-06-05T08:10:00Z",
      dateCreated: "2022-11-22T11:45:00Z",
      status: "Active",
      role: "Admin",
    },
    {
      id: 3,
      username: "superadmin",
      fullName: "Jane Admin",
      organization: "Internal",
      lastSeen: "2025-06-01T20:00:00Z",
      dateCreated: "2021-01-01T00:00:00Z",
      status: "Inactive",
      role: "Superadmin",
    },
    {
      id: 4,
      username: "superadmin",
      fullName: "Jane Admin",
      organization: "Internal",
      lastSeen: "2025-06-01T20:00:00Z",
      dateCreated: "2021-01-01T00:00:00Z",
      status: "Inactive",
      role: "Superadmin",
    },
  ] as UserData[],
};

const roles = ["Superadmin", "Admin", "User"] as const;
const tabs = roles.map((role) => {
  const users = usersMockData.users.filter((user) => user.role === role);
  return {
    value: role.toLowerCase(),
    name: role,
    count: users.length,
    users,
  };
});

function RouteComponent() {
  return (
    <div className="w-full mt-5 flex flex-col lg:flex-row gap-5 h-full">
      <div className="flex flex-col gap-4 mb-8 w-full lg:w-1/3">
        <div className="p-4 rounded-lg border h-28">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-sm">Total Accounts</p>
              <p className="text-3xl font-bold">{usersMockData.totals.totalUsers}</p>
            </div>
            <UserCheckIcon className="w-12 h-12 text-black-600" />
          </div>
        </div>
        <div className="p-4 rounded-lg border h-28">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-sm">Total Admin</p>
              <p className="text-3xl font-bold">{usersMockData.totals.totalAdmins}</p>
            </div>
            <UserCog className="w-12 h-12" />
          </div>
        </div>
        <div className="p-4 rounded-lg border h-28">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-sm">Active Users</p>
              <p className="text-3xl font-bold">{usersMockData.totals.totalActive}</p>
            </div>
            <UserPlus className="w-12 h-12" />
          </div>
        </div>
        <div className="p-4 rounded-lg border h-28">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-sm">Total users</p>
              <p className="text-3xl font-bold">{usersMockData.totals.totalUsers}</p>
            </div>
            <UserIcon className="w-12 h-12" />
          </div>
        </div>
      </div>
      <Tabs defaultValue={tabs[0].value} className="w-full h-full">
        <div className="flex flex-col lg:flex-row gap-2 justify-start lg:justify-between w-full border-b">
          <TabsList className="w-full p-0 bg-background justify-start  rounded-none gap-1">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none max-w-28 mt-5 py-6 h-full flex justify-center items-center data-[state=active]:border-b-main data-[state=active]:shadow-none data-[state=active]:border-b-2"
              >
                <span className="text-sm">{tab.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex flex-col sm:flex-row gap-2 my-2">
            <div className="w-full min-w-sm relative">
              <Search className="w-4 h-4 absolute top-2.5 left-4" />
              <Input className="pl-10 rounded-lg py-2 font-inter" placeholder="Search...." />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-fit inline-flex gap-2 items-center text-nowrap px-5 py-2 text-sm rounded-md border">
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
        </div>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="overflow-x-auto h-full rounded-lg border">
              <UserTable user={tab.users} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
