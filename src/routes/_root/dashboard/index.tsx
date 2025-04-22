import DashboardCardView from "@/components/dashboard/dashboard-card-view";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/_root/dashboard/")({
  component: Index,
});

function Index() {
  return (
    <React.Fragment>
      <DashboardCardView />
    </React.Fragment>
  );
}
