import { StationList } from "@/components/station/station-list";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/stations/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[90vh] overflow-y-auto lg:px-5 px-1">
      <div className="mb-5 space-y-2">
        <Label className="text-lg font-semibold">Station List</Label>
        <h3 className="text-sm font-medium text-[#545454]">Manage all stations across the platform. </h3>
      </div>
      <StationList />
    </div>
  );
}
