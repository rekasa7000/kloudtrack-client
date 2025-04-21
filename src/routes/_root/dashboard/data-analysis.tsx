import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/dashboard/data-analysis")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_root/dashboard/data-analysis"!</div>;
}
