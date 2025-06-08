import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

const SomethingWentWrong = () => {
  return (
    <main className="h-full w-full flex flex-col justify-center items-center">
      <img src="/images/oops-error.png" alt="Error image" />

      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-[150px] leading-none font-extrabold font-inter">500</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="bg-main text-white dark:text-black font-bold font-montserrat px-2 text-base rounded rotate-12 absolute">
              Something went wrong
            </TooltipTrigger>
            <TooltipContent className="border border-black rounded-lg bg-white">
              <p className="text-black bg-white p-5 max-w-2xl  w-full text-wrap rounded-lg ">
                Check your internet connection!
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </main>
  );
};

export default SomethingWentWrong;
