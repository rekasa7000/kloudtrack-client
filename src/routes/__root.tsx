import { AuthContext } from "@/hooks/use-auth";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

type RouterContext = {
  authentication: AuthContext;
};
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="h-screen">
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
