import dynamic_image from "@/assets/sunny.jpg";
import test_image from "@/assets/testimage.png";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CreditCardIcon, ListFilter, Search } from "lucide-react";

const DashboardCardView = () => {
  return (
    <div className="w-full min-h-svh mt-5">
      <div className="py-3 w-full flex item-center justify-between">
        <div className="w-lg flex justify-start items-center gap-2.5 justify-self-start">
          <div className="w-full relative ">
            <Search className="w-4 h-4 absolute top-2.5 left-4" />
            <Input className="pl-10 rounded-lg py-2" placeholder="Search...." />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-fit inline-flex gap-2 items-center text-nowrap px-5 py-2 text-sm rounded-md border border-[#D4D4D4] bg-white">
              <ListFilter className="w-4 h-4" />
              <span>Filter</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-fit inline-flex gap-2 items-center text-nowrap px-5 py-2 text-sm rounded-md border border-[#D4D4D4] bg-white">
              <CreditCardIcon className="w-4 h-4" />
              <span>Card View</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem defaultValue={"Card View"}>
                Card View
              </DropdownMenuItem>
              <DropdownMenuItem>Table View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="w-full min-h-[550px] h-full inline-flex flex-col justify-start items-start gap-2.5">
        <div className="w-full flex flex-col justify-start items-start gap-5">
          <div className="self-stretch p-3.5 bg-white rounded-[10px] outline-1 outline-offset-[-1px] outline-[#D4D4D4] inline-flex justify-start items-start gap-2.5 overflow-hidden">
            {/* iamge of the station location  */}
            <div className="max-w-[455px] h-full rounded-lg">
              <img
                src={test_image}
                alt="Station Location"
                className="h-full w-full object-cover object-center rounded-lg"
              />
            </div>

            <div className="w-full inline-flex  flex-col justify-start items-start gap-3.5">
              {/* image */}
              <div className="w-full h-60 px-5 py-6 relative rounded-md inline-flex justify-start items-end gap-2.5 overflow-hidden">
                <img
                  src={dynamic_image}
                  alt=""
                  className="absolute right-0 bottom-0 w-full z-0 h-full object-cover rounded-md"
                  loading="lazy"
                />
                <div className="w-96 px-2.5 inline-flex  flex-col z-10 justify-center items-start gap-1.5">
                  <div className="w-72 justify-start text-white text-2xl font-semibold font-['Montserrat']">
                    Glenn Station (Demo)
                  </div>
                  <div className="w-96 h-0 outline-1 outline-offset-[-0.50px] outline-stone-300"></div>
                  <div className="justify-start text-white text-lg font-medium font-['Inter']">
                    Automated Weather Station
                  </div>
                  <div className="justify-start text-white text-base font-normal font-['Inter']">
                    San Jose, Balanga, Bataan
                  </div>
                  <div className="justify-start text-white text-sm font-normal font-['Inter']">
                    14.67220593938318, 120.5294173964012
                  </div>
                </div>
                <div className="right-10 bottom-10 z-10 absolute">
                  <span className="text-white text-5xl font-extrabold font-['Inter']">
                    40{" "}
                  </span>
                  <span className="text-white text-4xl font-normal font-['Inter']">
                    °C
                  </span>
                  <span className="text-white text-5xl font-extrabold font-['Inter']">
                    {" "}
                  </span>
                </div>
              </div>

              {/* details */}
              <div className="w-full grid grid-cols-4 grid-rows-2 items-start gap-3.5 flex-wrap content-start">
                <div className="w-40 h-36 bg-zinc-300 rounded-[10px]" />
                <div className="w-40 h-36 bg-zinc-300 rounded-[10px]" />
                <div className="w-40 h-36 bg-zinc-300 rounded-[10px]" />
                <div className="w-40 h-36 bg-zinc-300 rounded-[10px]" />
                <div className="w-40 h-36 bg-zinc-300 rounded-[10px]" />
                <div className="w-40 h-36 bg-zinc-300 rounded-[10px]" />
                <div className="w-40 h-36 bg-zinc-300 rounded-[10px]" />
                <div className="w-40 h-36 bg-zinc-300 rounded-[10px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCardView;
