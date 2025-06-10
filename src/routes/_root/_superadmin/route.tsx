import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/_superadmin")({
  beforeLoad: ({ context }) => {
    const { user } = context.authentication;
    if (user?.role !== "SUPERADMIN") {
      throw redirect({
        to: "/not-authorized",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full w-full">
      <Outlet />
    </div>
  );
}
