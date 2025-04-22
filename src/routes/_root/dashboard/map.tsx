import DashboardMap from "@/components/dashboard/dashboard-map";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/_root/dashboard/map")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <React.Fragment>
      <DashboardMap />
    </React.Fragment>
  );
}
