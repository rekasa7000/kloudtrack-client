import CertificateTabs from "@/components/station/certificates/certificate-tabs";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/stations/certificates")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen">
      <div className="grid grid-cols-7 items-center w-full mt-2 gap-2">
        <div className="col-span-1">
          <CertificateTabs />
        </div>
        <div className="col-span-6">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
