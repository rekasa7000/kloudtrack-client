import Header from "@/components/layout/header";
import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/_superadmin/users")({
  component: RouteComponent,
});

const routeInfoHeader = {
  title: "User Management",
  description:
    "Manage all users across the platform. Add, edit, assign roles, and control access to organizations and stations.",
};

function RouteComponent() {
  const location = useLocation();

  return (
    <main className="flex flex-col w-full h-full">
      <div className="flex flex-row w-full items-center">
        <Header title={routeInfoHeader.title} description={routeInfoHeader.description} />
        {location.pathname !== "/users/create" && (
          <Link
            to="/users/create"
            className="w-fit text-nowrap border border-main rounded-md  py-2 px-4 text-sm font-inter"
          >
            Add new user
          </Link>
        )}
      </div>
      <div className="flex flex-col items-center w-full mt-2 h-full">
        <Outlet />
      </div>
    </main>
  );
}
