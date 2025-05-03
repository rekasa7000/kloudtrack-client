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
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <div
      className={cn("flex flex-col gap-3 items-center", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <img
          src="src/assets/logo.jpg"
          alt="Kloudtrack Logo"
          className="h-8 w-8"
        />
        <h1 className="text-2xl font-semibold text-black font-montserrat">
          <span className="text-gray">Kloud</span>
          <span className="text-main">Track</span>
        </h1>
      </div>
      <p className="text-xs uppercase text-black tracking-wide font-medium">
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
              <Label htmlFor="username" className="text-gray-700 w-[380px]">
                Username
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img src="src/assets/user-round.png" alt="User Icon" />
                </span>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  required
                  className="pl-10 border-gray-300 text-gray-700 placeholder-gray-400 w-[380px]"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-700 w-[380px]">
                Password
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img src="src/assets/lock-keyhole.png" alt="Keyhole Icon" />
                </span>
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="pl-10 pr-10 border-gray-300 text-gray-700 placeholder-gray-400 w-[380px]"
                />
                <Button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent border-none p-0 m-0 appearance-none focus:outline-none hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <EyeClosed className="text-black dark:text-white" />
                  ) : (
                    <Eye className="text-black dark:text-white" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#545454] hover:bg-[gray]/90 text-white"
            >
              Login <span className="ml-2">→</span>
            </Button>
          </div>
        </form>
      </CardContent>

      {/* Error Message Link */}
      <p className="text-sm px-3 py-1 font-semibold w-[380px] text-center">
        <span className="text-gray-500">Oops, wrong page? </span>
        <a
          href="#"
          className="underline font-semibold"
          style={{ color: "var(--color-main)" }}
        >
          Visit our website
        </a>
      </p>
    </div>
  );
}
