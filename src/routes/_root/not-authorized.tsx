import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/not-authorized")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useAuth();
  return (
    <main className="h-full w-full flex flex-col justify-center items-center">
      <img src="./images/crying-not-authorized.png" alt="Not authorized image" />

      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-[150px] leading-none font-extrabold font-inter">404</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="bg-main text-white dark:text-black font-bold font-montserrat px-2 text-base rounded rotate-12 absolute">
              You are not authorized.
            </TooltipTrigger>
            <TooltipContent className="border border-black rounded-lg bg-white">
              <p className="text-black bg-white p-5 max-w-2xl  w-full text-wrap rounded-lg ">
                Let's be honest though — 99% of the time, if you're seeing this Not Authorized page, it's because you're
                trying to access something you shouldn't. Maybe you're curious, maybe you clicked too far — either way,
                this one's on you.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <button className="-mt-5">
          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="relative inline-block text-sm font-medium border rounded-full border-[#fbdb06] group active:text-yellow-700 focus:outline-none focus:ring"
          >
            <span className="absolute inset-0 rounded-full transition-transform translate-x-0.5 translate-y-0.5 bg-[#fbdb06] group-hover:translate-y-0 group-hover:translate-x-0"></span>
            <span className="bg-white dark:bg-black  relative block px-8 py-3 rounded-full font-montserrat">
              {isAuthenticated ? "Go Home" : "Login"}
            </span>
          </Link>
        </button>
      </div>
    </main>
  );
}
