import {
  Bug,
  Container,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCog2,
  Users2Icon,
  UserCircle,
  ShieldCheck,
  Key,
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
import { ReactNode, useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import ThemeSwitch from "../theme-switch";

export const AppSidebar = (): ReactNode => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { logout, isLogoutLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate({ to: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const sidebar_items = [
    {
      key: 1,
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      key: 10,
      title: "Settings",
      url: "/configuration",
      icon: Settings,
    },
  ];

  if (user?.role === "SUPERADMIN") {
    sidebar_items.push(
      {
        key: 3,
        title: "Organizations",
        url: "/organizations",
        icon: Users2Icon,
      },
      {
        key: 2,
        title: "Stations",
        url: "/stations",
        icon: Container,
      },
      {
        key: 4,
        title: "Users",
        url: "/users",
        icon: UserCog2,
      },
      {
        key: 5,
        title: "System",
        url: "/system",
        icon: ShieldCheck,
      },
       {
        key: 6,
        title: "References",
        url: "/references",
        icon: ShieldCheck,
      }
    );
  }

  if (user?.role === "ADMIN") {
    sidebar_items.push({
      key: 6,
      title: "Organization",
      url: "/organization",
      icon: Users2Icon,
    });
  }

  sidebar_items.sort((a, b) => a.key - b.key);

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="pb-5 pt-3.5 px-3 w-full flex-row items-center justify-between">
        <div>
          <h1 className="text-lg font-medium font-inter">
            Kloud
            <span className="text-main font-inter">Track</span>
          </h1>
          <p className="text-xs text-[#B7B7B7] font-montserrat">Version 2.0.0</p>
        </div>
        <ThemeSwitch />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2.5">
              {sidebar_items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild className=" h-[32px] rounded-[5px]">
                    <Link
                      to={item.url}
                      className=" transition-all ease-in-out 
                            [&.active]:bg-c_secondary  [&.active]:text-main &.active]:font-semibold
                         "
                    >
                      <item.icon />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton asChild className=" h-[32px] rounded-[5px]">
                  <Link
                    to={"/profile"}
                    className=" transition-all ease-in-out 
                            [&.active]:bg-c_secondary  [&.active]:text-main &.active]:font-semibold
                         "
                  >
                    <UserCircle />
                    Profile
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-transparent flex w-full justify-start text-black shadow-none font-normal dark:text-white hover:bg-muted transition-all ease-in-out ">
              <Bug />
              Report
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report a Bug</DialogTitle>
              <DialogDescription>Please provide a detailed description of the bug you encountered.</DialogDescription>
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
            <Button className="bg-transparent flex w-full justify-start text-black shadow-none font-normal dark:text-white hover:bg-muted transition-all ease-in-out ">
              <LogOut />
              Logout
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Logout</DialogTitle>
              <DialogDescription>Are you sure you want to logout?</DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button variant="secondary" onClick={() => console.log("Cancel")}>
                Cancel
              </Button>
              <Button onClick={handleLogout} disabled={isLogoutLoading}>
                {isLogoutLoading ? "Logging out..." : "Logout"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarFooter>
    </Sidebar>
  );
};
