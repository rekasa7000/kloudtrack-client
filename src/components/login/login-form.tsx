import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-3 items-center", className)}
      {...props}
    >
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <img
          src="src/assets/logo.jpg"
          alt="Kloudtrack Logo"
          className="h-8 w-8"
        />
        <h1 className="text-2xl font-semibold text-black" style={{ fontFamily: "var(--font-inter)" }}>
          KloudTrack
        </h1>
      </div>
      <p className="text-xs uppercase text-black tracking-wide font-medium" style={{ fontFamily: "var(--font-poppins)" }}>
        Your Official Weather Monitoring Hub
      </p>

      {/* Form */}
      <CardHeader className="hidden">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <form>
          <div className="flex flex-col gap-3">
            <div className="grid gap-2">
              <Label
                htmlFor="username"
                className="text-gray-700"
                style={{ width: "380px", fontFamily: "var(--font-poppins)" }}
              >
                Username
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img
                    src="src/assets/user-round.png"
                    alt="User Icon"
                   />
                </span>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  required
                  className="pl-10 border-gray-300 text-gray-700 placeholder-gray-400"
                  style={{ width: "380px", fontFamily: "var(--font-poppins)" }}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="text-gray-700"
                style={{ width: "380px", fontFamily: "var(--font-poppins)" }}
              >
                Password
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img
                    src="src/assets/lock-keyhole.png"
                    alt="Keyhole Icon"
                   
                    />
                </span>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="pl-10 pr-10 border-gray-300 text-gray-700 placeholder-gray-400"
                  style={{ width: "380px", fontFamily: "var(--font-poppins)" }}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#545454] hover:bg-[gray]/90 text-white"
              style={{ width: "380px", fontFamily: "var(--font-poppins)" }}
            >
              Login <span className="ml-2">→</span>
            </Button>
          </div>
        </form>
      </CardContent>

      {/* Error Message Link */}
      <p
        className="text-sm px-3 py-1 font-semibold"
        style={{ 
          width: "380px", 
          textAlign: "center", 
          fontFamily: "var(--font-inter)" 
        }}
      >
        <span style={{ color: "gray" }}>
          Oops, wrong page?{" "}
        </span>
        <a href="#" className="underline font-semibold" style={{ color: "var(--color-main)" }}>
          Visit our website
        </a>
      </p>
    </div>
  );
}