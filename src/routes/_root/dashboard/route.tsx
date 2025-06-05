import DashboardTabs from "@/components/dashboard/dashboard-tabs";
import Header from "@/components/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/dashboard")({
  component: RouteComponent,
});

const routeInfoHeader = {
  title: "Dashboard",
  description:
    "Manage all users across the platform. Add, edit, assign roles, and control access to organizations and stations.",
};

function RouteComponent() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen">
      <Header title={routeInfoHeader.title} description={routeInfoHeader.description} tabs={<DashboardTabs />} />

      <div className="flex flex-col items-center w-full mt-2">
        <Outlet />
      </div>
    </main>
  );
}
