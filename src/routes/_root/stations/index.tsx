import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateStation } from "@/components/forms/station/create-station";
import { StationList } from "@/components/station/station-list";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_root/stations/")({
  component: RouteComponent,
});

const tabs = [
  { name: "List", value: "list", content: <StationList /> },
  { name: "Create", value: "create", content: <CreateStation /> },
  { name: "Certificates", value: "certificate", content: <CreateStation /> },
];

function RouteComponent() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen gap-5">
      <div className="flex flex-col w-full ">
        <Label className="text-3xl font-bold text-black">Stations</Label>
        <p className="mt-2 text-base font-normal text-[#545454]">
          Manage weather stations—register, activate, configure, and monitor real-time and historical data. Diagnose
          issues, upload firmware, and access forecasts and downloads.
        </p>
      </div>
      <Tabs defaultValue={tabs[0].value} className="w-full">
        <div className="border-b">
          <TabsList className="w-full p-0 bg-background justify-start rounded-none max-w-sm">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary"
              >
                <span className="text-[13px]">{tab.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="w-full m-2">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
