import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/stations/certificates/root")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="w-full bg-red-200">Hello "/_root/stations/certificates/root"!</div>;
}
