import Header from "@/components/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/profile")({
  component: RouteComponent,
});

const routeInfoHeader = {
  title: "Profile",
  description:
    "View and update your personal information, such as name, email, and password, to keep your profile up to date.",
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
