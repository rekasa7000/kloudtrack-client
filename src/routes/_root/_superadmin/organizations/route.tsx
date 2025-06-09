import Header from "@/components/layout/header";
import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";

const routeInfoHeader = {
  title: "Organization",
  description:
    "Manage all organizations across the platform. Add, edit, assign roles, and control access to organizations and stations.",
};

export const Route = createFileRoute("/_root/_superadmin/organizations")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();

  return (
    <main className="flex flex-col items-center w-full h-full">
      <div className="w-full flex items-center justify-between ">
        <Header title={routeInfoHeader.title} description={routeInfoHeader.description} />
        {location.pathname !== "/users/create" && (
          <Link
            to="/organizations/create"
            className="w-fit text-nowrap border border-main rounded-md  py-2 px-4 text-sm font-inter"
          >
            Add Organization
          </Link>
        )}
      </div>
      <div className="flex flex-col items-center w-full mt-2 h-full">
        <Outlet />
      </div>
    </main>
  );
}
