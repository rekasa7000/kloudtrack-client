import Header from "@/components/layout/header";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

const routeInfoHeader = {
  title: "Organization Management",
  description: "Manage your organization.",
};

export const Route = createFileRoute("/_root/_admin/organization")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex flex-col items-center w-full h-full">
      <div className="w-full flex items-center justify-between ">
        <Header title={routeInfoHeader.title} description={routeInfoHeader.description} />
        <Link
          to="/organizations/add-tenant"
          className="w-fit text-nowrap border border-main rounded-md  py-2 px-4 text-sm font-inter"
        >
          Add Tenant
        </Link>
      </div>
      <div className="flex flex-col items-center w-full ">
        <Outlet />
      </div>
    </main>
  );
}
