import {
  Bug,
  Container,
  LayoutDashboard,
  LogOut,
  Moon,
  Settings,
  ShieldUserIcon,
  Sun,
  UserCog2,
  Users2Icon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ReactNode } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { useTheme } from "./theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Menu items.
const sidebar_items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tenants",
    url: "/tenants",
    icon: Users2Icon,
  },
  {
    title: "Stations",
    url: "/stations",
    icon: Container,
  },
  {
    title: "User",
    url: "/users",
    icon: UserCog2,
  },
  {
    title: "Settings",
    url: "/configuration",
    icon: Settings,
  },
  {
    title: "Admin",
    url: "/profile",
    icon: ShieldUserIcon,
  },
];

export const AppSidebar = (): ReactNode => {
  const { setTheme } = useTheme();

  return (
    <Sidebar className="pl-2">
      {/* ayaw mag white ewan kung baket */}
      <SidebarHeader className="bg-white dark:bg-stone-800 pb-5 pt-3.5 px-3 w-full flex-row items-center justify-between">
        <div>
          <h1 className="text-lg font-medium font-inter">
            Kloud
            <span className="text-main font-inter">Track</span>
          </h1>
          <p className="text-xs text-[#B7B7B7] font-montserrat">
            Version 2.0.0
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="bg-transparent shadow-none hover:bg-transparent"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] text-black  rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] text-white w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" sideOffset={2}>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      <SidebarContent className="bg-white  dark:bg-stone-800 ">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2.5">
              {sidebar_items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size={"sm"}
                    className="h-10 [&.active]:bg-none "
                  >
                    <Link
                      to={item.url}
                      className="border font-inter  border-[#EFEFEF] [&.active]:border-b-2 transition-all ease-in-out  dark:bg-stone-700 dark:text-white dark:hover:bg-stone-600 dark:border-stone-700
                      [&.active]:border-b-main
                      [&.active]:text-main [&.active]:bg-transparent [&.active]:font-semibold [&.active]:rounded-md 
                      [&.active]:dark:bg-stone-600 
                      "
                    >
                      <item.icon />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* panget pa tong implementation | its either gawa ng 1 component or magkahiwalay a component pero for now et o na muna */}
      <SidebarFooter className="bg-white  dark:bg-stone-800 ">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-inter bg-white flex w-full justify-start text-xs text-black border hover:bg-muted border-[#EFEFEF] transition-all ease-in-out dark:border-none dark:bg-stone-700 dark:text-white dark:hover:bg-stone-600">
              <Bug />
              Report
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report a Bug</DialogTitle>
              <DialogDescription>
                Please provide a detailed description of the bug you
                encountered.
              </DialogDescription>
            </DialogHeader>

            <textarea
              className="w-full h-32 border border-[#EFEFEF] rounded-md p-2"
              placeholder="Describe the bug..."
            ></textarea>
            <DialogFooter>
              <Button variant="secondary" onClick={() => console.log("Cancel")}>
                Cancel
              </Button>
              <Button onClick={() => console.log("Submit")}>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className=" font-inter bg-white flex w-full justify-start text-xs text-black border hover:bg-muted border-[#EFEFEF] transition-all ease-in-out  dark:border-none dark:bg-stone-700 dark:text-white dark:hover:bg-stone-600
        "
            >
              <LogOut />
              Logout
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Logout</DialogTitle>
              <DialogDescription>
                Are you sure you want to logout?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button variant="secondary" onClick={() => console.log("Cancel")}>
                Cancel
              </Button>
              <Button onClick={() => console.log("Submit")}>Yes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarFooter>
    </Sidebar>
  );
};
