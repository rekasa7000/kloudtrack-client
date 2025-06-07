import Header from "@/components/layout/header";
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
  title: "Organization",
  description:
    "Manage all organizations across the platform. Add, edit, assign roles, and control access to organizations and stations.",
};

export const Route = createFileRoute("/_root/_superadmin/organizations")({
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
