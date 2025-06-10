import DashboardTabs from "@/components/layout/dashboard-tabs";
import Header from "@/components/layout/header";
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
    <main className="flex flex-col items-center w-full h-full">
      <Header title={routeInfoHeader.title} description={routeInfoHeader.description} tabs={<DashboardTabs />} />

      <div className="flex flex-col items-center w-full mt-2">
        <Outlet />
      </div>
    </main>
  );
}
