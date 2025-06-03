import TenantForm from "@/components/tenant-management/tenant-forms";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/tenants/add-tenant")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full flex flex-col h-full justify-start items-start">
      <h1 className="text-xl font-semibold md:text-3xl font-inter">Create Organization</h1>
      <TenantForm />
    </div>
  );
}
