import StationTabs from "@/components/station/station-tabs";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/stations")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen">
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold font-inter text-[#545454]">Dashboard</h1>
        <p className="mt-2 text-sm font-normal text-stone-700 font-montserrat">
          Manage all users across the platform. Add, edit, assign roles, and control access to organizations and
          stations.
        </p>
        <StationTabs />
      </div>

      <div className="flex flex-col items-center w-full mt-2">
        <Outlet />
      </div>
    </main>
  );
}
