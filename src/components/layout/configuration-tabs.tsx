import { useMatchRoute, useLocation, Link } from "@tanstack/react-router";
import React, { ReactNode } from "react";

const tabs = [
  { name: "API Configuration", url: "/configuration" as const },
  {
    name: " Documentation",

    url: "/configuration/api-documentation" as const,
  },
];

const ConfigurationTabs = (): ReactNode => {
  const matchRoute = useMatchRoute();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-fit mt-5 w-fit items-start bg-background justify-start gap-2 mb-2 ">
      {tabs.map((tab, index) => {
        let isActive = false;

        if (tab.url === "/configuration") {
          isActive =
            matchRoute({ to: "/configuration" }) &&
            !location.pathname.startsWith("/stations/");
        }
        isActive = !!matchRoute({ to: tab.url });

        return (
          <div key={index} className="w-fit flex h-auto items-center">
            <Link
              to={tab.url}
              className={`w-fit text-nowrap px-11 py-2 text-sm transition-all font-inter ease-in-out ${
                isActive ? "font-semibold border-b-2 pb-1 border-main" : ""
              }`}
            >
              {tab.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ConfigurationTabs;
