import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Slash } from "lucide-react";

const routeInfoHeader = {
  title: "Tenant Management",
  description:
    "Manage all users across the platform. Add, edit, assign roles, and control access to organizations and stations.",
};

export const Route = createFileRoute("/_root/tenants")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen">
      <div className="w-full flex items-center justify-between ">
        <Header title={routeInfoHeader.title} description={routeInfoHeader.description} />
        <Link
          to="/tenants/add-tenant"
          className="w-fit text-nowrap border border-main rounded-md  py-2 px-4 text-sm font-inter"
        >
          Add Tenant
        </Link>
      </div>
      <div className="flex items-center justify-start my-5 w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/tenants">Tenants</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/tenants/add-tenant">Add Tenant</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col items-center w-full ">
        <Outlet />
      </div>
    </main>
  );
}
