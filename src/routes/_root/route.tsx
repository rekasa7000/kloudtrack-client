import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_root")({
  beforeLoad: ({ context }) => {
    const { isAuthenticated } = context.authentication;
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider className="">
      <AppSidebar />
      <SidebarInset className="flex flex-col p-2 w-full">
        {/* put padding or margin here para magkaspace ung child */}
        {/* <SidebarTrigger /> */}
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
