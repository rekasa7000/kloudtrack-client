import dynamic_image from "@/assets/sunny.jpg";
import test_image from "@/assets/testimage.png";
import { useNavigate } from "@tanstack/react-router";

const DashboardCardView = () => {
  const navigate = useNavigate();
  const navigateToHistorical = () => {
    navigate({ to: "/dashboard/historical" });
  }
  return (
    <main className="w-full min-h-svh mt-1">
      <div className="w-full min-h-[550px] h-full inline-flex flex-col justify-start items-start gap-2.5">
        <div className="w-full flex flex-col justify-start items-start gap-5">
          <div className="self-stretch p-3.5 bg-white rounded-[10px] outline-1 outline-offset-[-1px] outline-[#D4D4D4] inline-flex justify-start items-start gap-2.5 overflow-hidden">
            {/* iamge of the station location  */}
            <div className="max-w-[455px] h-full rounded-lg pointer-events-none">
              <img
                src={test_image}
                alt="Station Location"
                className="h-full w-full object-cover object-center rounded-lg"
              />
            </div>

            <div className="w-full inline-flex  flex-col justify-start items-start gap-3.5 cursor-pointer" onClick={navigateToHistorical}>
              {/* image */}
              <div className="w-full h-60 px-5 py-6 relative rounded-md inline-flex justify-start items-end gap-2.5 overflow-hidden">
                <img
                  src={dynamic_image}
                  alt=""
                  className="absolute right-0 bottom-0 w-full z-0 h-full object-cover rounded-md"
                  loading="lazy"
                />
                <div className="w-96 px-2.5 inline-flex  flex-col z-10 justify-center items-start gap-1.5">
                  <div className="w-72 justify-start text-white text-2xl font-semibold font-inter">
                    Glenn Station (Demo)
                  </div>
                  <div className="w-96 h-0 outline-1 outline-offset-[-0.50px] outline-stone-300"></div>
                  <div className="justify-start text-white text-lg font-medium font-montserrat">
                    Automated Weather Station
                  </div>
                  <div className="justify-start text-white text-base font-normal font-montserrat">
                    San Jose, Balanga, Bataan
                  </div>
                  <div className="justify-start text-white text-sm font-normal font-montserrat">
                    14.67220593938318, 120.5294173964012
                  </div>
                </div>
                <div className="right-10 bottom-10 z-10 absolute">
                  <span className="text-white text-5xl font-bold font-montserrat">40 </span>
                  <span className="text-white text-4xl font-medium font-montserrat">°C</span>
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
    </main>
  );
};

export default DashboardCardView;
