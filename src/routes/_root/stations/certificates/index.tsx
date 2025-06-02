import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/stations/certificates/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[90vh] overflow-y-auto lg:px-5 px-1">
      <div className="mb-5 space-y-2">
        <Label className="text-lg font-semibold">Certificates</Label>
        <h3 className="text-sm font-medium text-[#545454]">Manage all certificates for AWS IoT Core</h3>
      </div>
    </div>
  );
}
