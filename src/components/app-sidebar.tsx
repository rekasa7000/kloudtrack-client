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
import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";

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
  const [toggleTheme, setToggleTheme] = useState("light");

  // d p ayos wahaha
  const handleToggleTheme = () => {
    const newTheme = toggleTheme === "light" ? "dark" : "light";
    setToggleTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Sidebar>
      {/* ayaw mag white ewan kung baket */}
      <SidebarHeader className="bg-white pb-5 pt-3.5 px-3 w-full flex-row items-center justify-between">
        <div>
          <h1 className="text-lg font-medium">
            Kloud
            <span className="text-[#FBD008]">Track</span>
          </h1>
          <p className="text-xs text-[#B7B7B7]">Version 2.0.0</p>
        </div>
        <Button
          className="bg-white border-none hover:bg-white shadow-none"
          onClick={handleToggleTheme}
        >
          {toggleTheme === "light" ? (
            <Moon className="text-black" />
          ) : (
            <Sun className="text-black" />
          )}
        </Button>
      </SidebarHeader>
      <SidebarContent className="bg-white">
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
                      className="border border-[#EFEFEF] [&.active]:border-b-2 [&.active]:border-b-[#FBD008]
                      [&.active]:text-[#FBD008] [&.active]:bg-transparent [&.active]:font-semibold [&.active]:rounded-md transition-all ease-in-out
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
      <SidebarFooter className="bg-white">
        <Dialog>
          <DialogTrigger>
            <Button
              className="bg-white flex w-full justify-start text-xs text-black border hover:bg-muted border-[#EFEFEF] transition-all ease-in-out
        "
            >
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
          <DialogTrigger>
            <Button
              className="bg-white flex w-full justify-start text-xs text-black border hover:bg-muted border-[#EFEFEF] transition-all ease-in-out
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
