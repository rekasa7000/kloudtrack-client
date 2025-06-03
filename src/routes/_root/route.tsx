import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_root")({
  beforeLoad: ({ context }) => {
    // const { isAuthenticated } = context.authentication;
    // if (!isAuthenticated) {
    //   throw redirect({
    //     to: "/login",
    //   });
    // }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />

      {/* put padding or margin here para magkaspace ung child */}
      <main className="flex flex-col p-2 w-full">
        {/* <SidebarTrigger /> */}
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
