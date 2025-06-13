import { useMemo } from "react";
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
  BookText,
  LucideIcon,
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

type UserRole = "SUPERADMIN" | "ADMIN" | "USER";

interface SidebarItem {
  id: string;
  title: string;
  url: string;
  icon: LucideIcon;
  order: number;
  roles: UserRole[];
  ariaLabel?: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    order: 1,
    roles: ["SUPERADMIN", "ADMIN", "USER"],
    ariaLabel: "Go to dashboard",
  },
  {
    id: "stations",
    title: "Stations",
    url: "/stations",
    icon: Container,
    order: 2,
    roles: ["SUPERADMIN", "ADMIN"],
    ariaLabel: "Manage stations",
  },
  {
    id: "organizations",
    title: "Organizations",
    url: "/organizations",
    icon: Users2Icon,
    order: 3,
    roles: ["SUPERADMIN", "ADMIN"],
    ariaLabel: "Manage organizations",
  },
  {
    id: "users",
    title: "Users",
    url: "/users",
    icon: UserCog2,
    order: 4,
    roles: ["SUPERADMIN"],
    ariaLabel: "Manage users",
  },
  {
    id: "system",
    title: "System",
    url: "/system",
    icon: ShieldCheck,
    order: 5,
    roles: ["SUPERADMIN"],
    ariaLabel: "System settings",
  },
  {
    id: "references",
    title: "References",
    url: "/references",
    icon: BookText,
    order: 7,
    roles: ["SUPERADMIN", "USER"],
    ariaLabel: "View references",
  },
  {
    id: "settings",
    title: "Settings",
    url: "/configuration",
    icon: Settings,
    order: 10,
    roles: ["SUPERADMIN", "ADMIN", "USER"],
    ariaLabel: "Application settings",
  },
];

const getVisibleItems = (userRole: UserRole | undefined): SidebarItem[] => {
  if (!userRole) return [];

  return SIDEBAR_ITEMS.filter((item) => item.roles.includes(userRole)).sort(
    (a, b) => a.order - b.order
  );
};

export const AppSidebar = (): ReactNode => {
  const navigate = useNavigate();
  const { user, logout, isLogoutLoading } = useAuth();

  const visibleItems = useMemo(() => {
    return getVisibleItems(user?.role as UserRole);
  }, [user?.role]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate({ to: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="pb-5 pt-3.5 px-3 w-full flex-row items-center justify-between">
        <div>
          <h1 className="text-lg font-medium font-inter">
            Kloud
            <span className="text-main font-inter">Track</span>
          </h1>
          <p className="text-xs text-[#B7B7B7] font-montserrat">
            Version 2.0.0
          </p>
        </div>
        <ThemeSwitch />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2.5">
              {visibleItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild className="h-[32px] rounded-[5px]">
                    <Link
                      to={item.url}
                      className="transition-all ease-in-out [&.active]:bg-c_secondary [&.active]:text-main [&.active]:font-semibold"
                      aria-label={item.ariaLabel}
                    >
                      <item.icon />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton asChild className="h-[32px] rounded-[5px]">
                  <Link
                    to="/profile"
                    className="transition-all ease-in-out [&.active]:bg-c_secondary [&.active]:text-main [&.active]:font-semibold"
                    aria-label="Go to profile"
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
            <Button
              className="bg-transparent flex w-full justify-start text-black shadow-none font-normal dark:text-white hover:bg-muted transition-all ease-in-out"
              aria-label="Report a bug"
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
              className="w-full h-32 border border-[#EFEFEF] rounded-md p-2 resize-none"
              placeholder="Describe the bug..."
              aria-label="Bug description"
            />

            <DialogFooter>
              <Button variant="secondary">Cancel</Button>
              <Button>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-transparent flex w-full justify-start text-black shadow-none font-normal dark:text-white hover:bg-muted transition-all ease-in-out"
              aria-label="Logout from application"
            >
              <LogOut />
              Logout
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogDescription>
                Are you sure you want to logout? Any unsaved changes will be
                lost.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button variant="secondary">Cancel</Button>
              <Button
                onClick={handleLogout}
                disabled={isLogoutLoading}
                aria-label={
                  isLogoutLoading ? "Logging out..." : "Confirm logout"
                }
              >
                {isLogoutLoading ? "Logging out..." : "Logout"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarFooter>
    </Sidebar>
  );
};
