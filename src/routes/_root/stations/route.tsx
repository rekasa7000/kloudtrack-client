import Header from "@/components/layout/header";
import StationTabs from "@/components/layout/station-tabs";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/stations")({
  component: RouteComponent,
});

const routeInfoHeader = {
  title: "Stations",
  description:
    "Manage weather stations—register, activate, configure, and monitor real-time and historical data. Diagnose issues, upload firmware, and access forecasts and downloads.",
};

function RouteComponent() {
  return (
    <main className="flex flex-col items-center w-full h-full">
      <div className="flex flex-col w-full">
        <Header title={routeInfoHeader.title} description={routeInfoHeader.description} tabs={<StationTabs />} />
      </div>

      <div className="flex flex-col items-center w-full mt-2">
        <Outlet />
      </div>
    </main>
  );
}
