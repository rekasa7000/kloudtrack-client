import { ReactNode } from "react";
import { Link, useMatchRoute, useLocation } from "@tanstack/react-router";

const tabs = [
  { name: "List", url: "/stations" as const },
  { name: "Create", url: "/stations/create" as const },
  { name: "Certificates", url: "/stations/certificates" as const },
];

const StationTabs = (): ReactNode => {
  const matchRoute = useMatchRoute();
  const location = useLocation();

  return (
    <div className="flex h-auto mt-5 w-full items-center bg-background justify-start gap-2 mb-2 border-b">
      {tabs.map((tab, index) => {
        let isActive = false;

        if (tab.url === "/stations") {
          isActive = matchRoute({ to: "/stations" }) && !location.pathname.startsWith("/stations/");
        } else if (tab.url === "/stations/certificates") {
          isActive = location.pathname.startsWith("/stations/certificates");
        } else {
          isActive = !!matchRoute({ to: tab.url });
        }

        return (
          <div key={index} className="w-fit flex h-auto items-center">
            <Link
              to={tab.url}
              className={`w-fit text-nowrap px-11 py-2 text-sm transition-all font-inter ease-in-out ${
                isActive ? "bg-white font-semibold border-b-2 border-black" : ""
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

export default StationTabs;
