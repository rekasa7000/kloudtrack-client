import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/user-menu/"!</div>;
}
