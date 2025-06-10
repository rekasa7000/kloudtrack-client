import { createFileRoute, Outlet } from '@tanstack/react-router'
import Header from "@/components/layout/header";
import ReferenceTabs from '@/components/layout/reference-tabs';

const routeInfoHeader = {
  title: "Weather Terminology References",
  description:
    "View the weather terminology references.",
};


export const Route = createFileRoute('/_root/references')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex flex-col items-center w-full h-full">
      <Header title={routeInfoHeader.title} description={routeInfoHeader.description} tabs={<ReferenceTabs/>} />
      <div className="flex flex-col items-center w-full mt-2">
        <Outlet />
      </div>
    </main>
  );
}
