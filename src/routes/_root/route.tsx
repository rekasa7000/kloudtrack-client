import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_root")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/(root)/router"!
      <Outlet />
    </div>
  );
}
