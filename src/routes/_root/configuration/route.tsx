import ConfigurationTabs from "@/components/layout/configuration-tabs";
import Header from "@/components/layout/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/configuration")({
  component: RouteComponent,
});
const routeInfoHeader = {
  title: "Settings",
  description:
    "Manage your api configurations, and other configurable options.",
};

function RouteComponent() {
  return (
    <main className="flex flex-col items-center w-full h-full">
      <Header
        title={routeInfoHeader.title}
        description={routeInfoHeader.description}
      />

      <div className="flex min-h-screen h-full items-start gap-5 w-full mt-3 px-2 ">
        <div className="sticky top-0 self-start z-10">
          <ConfigurationTabs />
        </div>{" "}
        <Outlet />
      </div>
    </main>
  );
}
