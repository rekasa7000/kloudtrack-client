import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/_root/dashboard"!
      <Outlet />
    </div>
  );
}
