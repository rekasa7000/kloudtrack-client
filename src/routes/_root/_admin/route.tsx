import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/_admin")({
  beforeLoad: ({ context }) => {
    const { user } = context.authentication;
    if (user?.role !== "ADMIN") {
      throw redirect({
        to: "/not-authorized",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
