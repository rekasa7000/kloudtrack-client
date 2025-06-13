import OrganizationForm from "@/components/forms/organizations/organizations-form";
import { createFileRoute } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronsRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/_root/_superadmin/organizations/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full flex flex-col pb-5">
      <Breadcrumb className="my-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/organizations">Tenants</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronsRight />
          </BreadcrumbSeparator>
          <BreadcrumbPage>
            <BreadcrumbLink href="/organizations/create">Add Tenant</BreadcrumbLink>
          </BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="container mx-auto h-full max-w-5xl shadow-none">
        <CardContent className="h-full">
          <OrganizationForm />
        </CardContent>
      </Card>
    </div>
  );
}
