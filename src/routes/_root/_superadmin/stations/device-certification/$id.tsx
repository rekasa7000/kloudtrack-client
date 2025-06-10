import AddDeviceCertificates from "@/components/forms/station/add-device-certificates";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_root/_superadmin/stations/device-certification/$id"
)({
  loader: ({ params }) => {
    const { id } = params;
    if (!id) {
      throw new Error("Station ID is required");
    }

    return { stationID: id };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return (
    <div className="flex flex-col gap-4 w-full px-2">
      <div className="flex flex-col gap-1 border-b border-gray-200 pb-2">
        <h1 className="font-semibold">Device Certificate</h1>
        <p>
          Add and save root certificate from AWS IoT Core. Input its metadata
        </p>
      </div>
      <AddDeviceCertificates stationID={Number(id)} />
    </div>
  );
}
