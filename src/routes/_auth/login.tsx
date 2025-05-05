import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/login/login-form";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <LoginForm />
    </div>
  );
}


