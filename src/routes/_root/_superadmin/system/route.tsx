import Header from "@/components/layout/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const routeInfoHeader = {
  title: "Server Metrics",
  description: "Monitor server health, database usage, and system-wide metrics in real time.",
};

export const Route = createFileRoute("/_root/_superadmin/system")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex flex-col items-center w-full h-full">
      <div className="w-full flex items-center justify-between ">
        <Header title={routeInfoHeader.title} description={routeInfoHeader.description} />
      </div>

      <div className="flex flex-col items-center w-full h-full">
        <Outlet />
      </div>
    </main>
  );
}
