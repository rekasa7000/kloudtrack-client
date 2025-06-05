import Header from "@/components/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/configuration")({
  component: RouteComponent,
});
const routeInfoHeader = {
  title: "Settings",
  description: "Manage your api configurations, and other configurable options.",
};

function RouteComponent() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen">
      <Header title={routeInfoHeader.title} description={routeInfoHeader.description} />

      <div className="flex flex-col items-center w-full mt-2">
        <Outlet />
      </div>
    </main>
  );
}
