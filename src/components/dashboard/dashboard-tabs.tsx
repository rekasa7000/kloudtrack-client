import { ReactNode } from "react";
import { Link, useMatchRoute } from "@tanstack/react-router";

const tabs = [
  { name: "Real-time", url: "/dashboard" },
  { name: "Analysis", url: "/dashboard/data-analysis" },
  { name: "Map", url: "/dashboard/map" },
];

const DashboardTabs = (): ReactNode => {
  const matchRoute = useMatchRoute();

  return (
    <div className="flex h-auto mt-5 w-full items-center justify-start rounded-lg gap-2">
      {tabs.map((tab, index) => (
        <div className="w-fit bg-muted flex h-auto items-center rounded-md ">
          <Link
            to={tab.url}
            key={index}
            className={`w-fit text-nowrap px-11 py-2 text-sm rounded-md transition-all font-inter ease-in-out ${
              matchRoute({ to: tab.url }) ||
              (tab.url === "/dashboard" &&
                !matchRoute({ to: "/dashboard/data-analysis" }) &&
                !matchRoute({ to: "/dashboard/map" }))
                ? " [&.active]:bg-white border [&.active]:border-[#FBD008] [&.active]:font-semibold"
                : ""
            }`}
          >
            {tab.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DashboardTabs;
