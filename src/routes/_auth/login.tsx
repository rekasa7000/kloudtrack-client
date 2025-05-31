import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "@/components/forms/login/login-form";

export const Route = createFileRoute("/_auth/login")({
  beforeLoad: ({ context }) => {
    const { isAuthenticated } = context.authentication;
    if (isAuthenticated) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <LoginForm />
    </div>
  );
}
