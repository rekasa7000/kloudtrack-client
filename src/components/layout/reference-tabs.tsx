import { ReactNode } from "react";
import { Link, useMatchRoute, useLocation } from "@tanstack/react-router";

const tabs = [
  { name: "All", url: "/references" as const },
  { name: "Heat Index", url: "/references/terminology/heatindex" },
   { name: "Wind Speed", url: "/references/terminology/windspeed"},
  { name: "Rainfall", url: "/references/terminology/rainfall" },
  { name: "UV Index", url: "/references/terminology/uvindex" },
];

const ReferenceTabs = (): ReactNode => {
  const matchRoute = useMatchRoute();
  const location = useLocation();

  return (
    <div className="flex h-auto mt-5 w-full items-center bg-background justify-start gap-2 mb-2 border-b">
      {tabs.map((tab, index) => {
        let isActive = false;

        if (tab.url === "/references") {
          isActive = matchRoute({ to: "/references" }) && !location.pathname.startsWith("/references/");
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

export default ReferenceTabs;
