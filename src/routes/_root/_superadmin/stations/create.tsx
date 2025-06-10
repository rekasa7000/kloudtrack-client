import { createFileRoute } from "@tanstack/react-router";
import { Label } from "@/components/ui/label";
import { CreateStation } from "@/components/forms/station/create-station";

export const Route = createFileRoute("/_root/_superadmin/stations/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[90vh] overflow-y-auto">
      <div className="w-full flex flex-col mb-5">
        <Label className="text-xl font-semibold">Add New Station</Label>
        <h3 className="text-sm font-medium text-[#545454]">
          Register a new station by inputting its metadata and selecting its location on the map.
        </h3>
      </div>
      <CreateStation />
    </div>
  );
}
