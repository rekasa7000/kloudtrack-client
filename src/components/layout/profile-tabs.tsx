import { ReactNode } from "react";
import { Link, useMatchRoute, useLocation } from "@tanstack/react-router";

const tabs = [
  { name: "Profile", url: "/profile" as const },
  { name: "Change Password", url: "/profile/password-change" },
];

const ProfileTabs = (): ReactNode => {
  const matchRoute = useMatchRoute();
  const location = useLocation();

  return (
    <div className="flex h-auto mt-5 w-full items-center bg-background justify-start gap-2 mb-2 border-b">
      {tabs.map((tab, index) => {
        let isActive = false;

        if (tab.url === "/profile") {
          isActive = matchRoute({ to: "/profile" }) && !location.pathname.startsWith("/profile/");
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

export default ProfileTabs;
