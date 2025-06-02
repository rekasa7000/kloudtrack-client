import { ReactNode } from "react";
import { Link, useMatchRoute } from "@tanstack/react-router";

const tabs = [
  { name: "List", url: "/stations/certificates" as const },
  { name: "Root", url: "/stations/certificates/root" as const },
];

const CertificateTabs = (): ReactNode => {
  const matchRoute = useMatchRoute();

  return (
    <div className="flex flex-col w-full gap-2">
      {tabs.map((tab, index) => {
        const isActive = matchRoute({ to: tab.url });

        return (
          <div key={index} className="w-full flex items-center hover:bg-muted">
            <Link
              to={tab.url}
              className={`w-full text-nowrap px-2 py-2 text-sm text-start transition-all font-inter ease-in-out ${
                isActive ? "bg-muted" : ""
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

export default CertificateTabs;
