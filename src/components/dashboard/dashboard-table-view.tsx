import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import DashboardTable from "./dashboard-table";

const DashboardTableView = () => {
  return (
    <main className="w-full min-h-svh flex flex-col justify-start items-start gap-5">
      <div className=" w-full flex flex-col items-center">
        <div className="w-full grid grid-cols-4 gap-2">
          <Card className="shadow-none rounded-md w-auto">
            <CardHeader className="px-3">
              <CardTitle className="font-inter">
                Heat Index Danger Level
              </CardTitle>
              <Separator className="mt-1" />
            </CardHeader>
            <CardContent className="-mt-2 px-3">
              <div className="flex items-center w-full">
                <span className="flex w-3 h-3 me-3 bg-[#cc0001] rounded-full font-montserrat"></span>
                <p className="text-sm text-nowrap ">
                  Extreme Danger (52°C & beyond)
                </p>
              </div>
              <div className="flex items-center w-full">
                <span className="flex w-3 h-3 me-3 bg-[#ff6600] rounded-full font-montserrat"></span>
                <p className="text-sm text-nowrap ">Danger (42-51°C)</p>
              </div>
              <div className="flex items-center w-full">
                <span className="flex w-3 h-3 me-3 bg-[#ffcc00] rounded-full font-montserrat"></span>
                <p className="text-sm text-nowrap ">
                  Extreme Caution (33-41°C)
                </p>
              </div>
              <div className="flex items-center w-full">
                <span className="flex w-3 h-3 me-3 bg-[#FFFF00] rounded-full font-montserrat"></span>
                <p className="text-sm text-nowrap ">Caution (27-32°C)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none rounded-md w-auto">
            <CardHeader className="px-3">
              <CardTitle className="font-inter">
                Wind Speed Danger Level
              </CardTitle>
              <Separator className="mt-1" />
            </CardHeader>
            <CardContent className="-mt-2 px-3">
              <div className="flex items-center w-full">
                <span className="flex w-3 h-3 me-3 bg-[#fe0000] rounded-full font-montserrat"></span>
                <p className="text-sm text-nowrap ">
                  Typhoon-force winds (118KPH & &uarr;)
                </p>
              </div>
              <div className="flex items-center w-full">
                <span className="flex w-3 h-3 me-3 bg-[#ffc000] rounded-full font-montserrat"></span>
                <p className="text-sm text-nowrap ">
                  Storm-force winds (89-117KPH)
                </p>
              </div>
              <div className="flex items-center w-full">
                <span className="flex w-3 h-3 me-3 bg-[#ffff00] rounded-full font-montserrat"></span>
                <p className="text-sm text-nowrap ">
                  Gale-force Winds (62-88KPH)
                </p>
              </div>
              <div className="flex items-center w-full">
                <span className="flex w-3 h-3 me-3 bg-[#00ccff] rounded-full font-montserrat"></span>
                <p className="text-sm text-nowrap ">Strong winds (39-61KPH)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none rounded-md w-auto">
            <CardHeader className="px-3">
              <CardTitle className="font-inter">
                UV Index Danger Level
              </CardTitle>
              <Separator className="mt-1" />
            </CardHeader>
            <CardContent className="-mt-2 px-3">
              <div className="flex items-center w-full">
                <span className="flex w-3 h-3 me-3 bg-[#9E47CC] rounded-full font-montserrat"></span>
                <p className="text-sm text-nowrap ">Extreme (11+)</p>
              </div>
              <div className="flex items-center w-full">
                <span className="flex w-3 h-3 me-3 bg-[#F55023] rounded-full font-montserrat"></span>
                <p className="text-sm text-nowrap ">Very High (8-10)</p>
              </div>
              <div className="flex items-center w-full">
                <span className="flex w-3 h-3 me-3 bg-[#FF9000] rounded-full font-montserrat"></span>
                <p className="text-sm text-nowrap ">High (6-7)</p>
              </div>
              <div className="flex items-center w-full">
                <span className="flex w-3 h-3 me-3 bg-[#FFBC01] rounded-full font-montserrat"></span>
                <p className="text-sm text-nowrap ">Moderate (3-5)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none rounded-md w-auto">
            <CardHeader className="px-3">
              <CardTitle className="font-inter">
                Rainfall Danger Level
              </CardTitle>
              <Separator className="mt-1" />
            </CardHeader>
            <CardContent className="-mt-2 px-3">
              <div className="flex items-center w-full">
                <span className="flex w-3 h-3 me-3 bg-[#FF6600] rounded-full font-montserrat"></span>
                <p className="text-sm text-nowrap ">
                  Torrential Rain (30mm/hour & &uarr;)
                </p>
              </div>
              <div className="flex items-center w-full">
                <span className="flex w-3 h-3 me-3 bg-[#FFCC00] rounded-full font-montserrat"></span>
                <p className="text-sm text-nowrap ">
                  Intense Rain (15-30mm/hour)
                </p>
              </div>
              <div className="flex items-center w-full">
                <span className="flex w-3 h-3 me-3 bg-[#FFFF00] rounded-full font-montserrat"></span>
                <p className="text-sm text-nowrap ">Heavy Rain (7.5mm/hour)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <DashboardTable />
      </div>
    </main>
  );
};

export default DashboardTableView;
