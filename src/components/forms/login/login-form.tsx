import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeClosed, LockKeyholeIcon, User2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { FieldInfo } from "@/utils/field-info";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "@tanstack/react-router";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await login(value);
      setTimeout(() => {
        navigate({ to: "/dashboard" });
      }, 50);
    },
  });

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <div className={cn("flex flex-col gap-3 items-center", className)} {...props}>
      <div className="flex items-center gap-1">
        <img src="src/assets/logo.jpg" alt="Kloudtrack Logo" className="h-10 w-10" />
        <h1 className="text-3xl font-semibold text-black font-inter">
          <span className="text-gray">Kloud</span>
          <span className="text-main">Track</span>
        </h1>
      </div>
      <p className="text-xs uppercase text-black tracking-wide font-light font-montserrat">
        Your Official Weather Monitoring Hub
      </p>

      <CardHeader className="hidden">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-3">
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "Email or email is required"
                    : value.length < 3
                      ? "Email must be at least 3 characters"
                      : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return value.includes("error") && 'No "error" allowed in username';
                },
              }}
              children={(field) => {
                return (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor={field.name} className="sr-only text-gray-700 w-[380px]">
                        Email
                      </Label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <User2Icon className="w-5 h-5 text-c_secondary" />
                        </span>
                        <Input
                          type="text"
                          placeholder="email"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          required
                          className="pl-10 py-6 rounded-lg border-gray-300 text-gray-700 placeholder-gray-400 w-full"
                        />
                      </div>
                    </div>
                    <FieldInfo field={field} />
                  </>
                );
              }}
            />
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "Password is required"
                    : value.length < 8
                      ? "Password must be at least 8 characters"
                      : /[ ]/.test(value)
                        ? "Password contains invalid characters"
                        : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return value.includes("error") && 'No "error" allowed in username';
                },
              }}
              children={(field) => {
                return (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor={field.name} className="sr-only text-gray-700 w-[380px]">
                        Password
                      </Label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <LockKeyholeIcon className="w-5 h-5 text-c_secondary" />
                        </span>
                        <Input
                          id="password"
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder="Password"
                          required
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="pl-10 pr-10 py-6 rounded-lg border-gray-300 text-gray-700 placeholder-gray-400 w-[380px]"
                        />
                        <Button
                          type="button"
                          className="absolute inset-y-1.5 right-0 flex items-center pr-4 bg-transparent border-none appearance-none focus:outline-none hover:bg-transparent shadow-none"
                          onClick={togglePasswordVisibility}
                        >
                          {isPasswordVisible ? (
                            <EyeClosed className="text-c_secondary dark:text-white w-5 h-5 " />
                          ) : (
                            <Eye className="text-c_secondary dark:text-white h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <FieldInfo field={field} />
                  </>
                );
              }}
            />

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full bg-c_secondary rounded-lg py-6 font-inter font-medium hover:bg-muted-foreground  text-white"
                >
                  {isSubmitting ? (
                    "Logging in"
                  ) : (
                    <>
                      Login
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              )}
            />
          </div>
        </form>
      </CardContent>

      <p className="text-sm px-3 py-1 font-light w-full font-montserrat text-center">
        <span className="text-gray-500">Oops, wrong page? </span>
        <a href="https://homepage.kloudtechsea.com" className="underline font-medium text-main">
          Visit our website
        </a>
      </p>
    </div>
  );
}
