import StationTable from "@/components/station/station-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import mapboxgl from "mapbox-gl";

import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { ListFilter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

export const Route = createFileRoute("/_root/stations/")({
  component: RouteComponent,
});

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function RouteComponent() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState<number>(9);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [lngLat, setLngLat] = useState<{ lng: number; lat: number } | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 2,
    });

    // Add click event listener
    mapRef.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      setLngLat({ lng, lat });

      // Optional: add a marker
      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current!);
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);
  return (
    <main className="flex flex-col items-center w-full min-h-screen gap-5">
      <div className="flex flex-col w-full">
        <h1 className="text-3xl font-bold  text-black">Stations</h1>
        <p className="mt-2 text-sm font-normal text-[#545454]">
          Manage weather stations—register, activate, configure, and monitor real-time and historical data. Diagnose
          issues, upload firmware, and access forecasts and downloads.
        </p>
      </div>

      <div className="flex flex-col items-center w-full mt-2 gap-2">
        <div className="w-full flex justify-between">
          <div className="w-full max-w-lg flex justify-start items-center gap-2.5 justify-self-start">
            <div className="w-full relative ">
              <Search className="w-4 h-4 absolute top-2.5 left-4" />
              <Input className="pl-10 rounded-lg py-2 font-inter" placeholder="Search...." />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="w-fit inline-flex gap-2 items-center text-nowrap px-5 py-2 text-sm rounded-md border border-[#D4D4D4] bg-white">
                <ListFilter className="w-4 h-4" />
                <span className="font-medium">Filter</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Station Name</DropdownMenuItem>
                <DropdownMenuItem>Organization</DropdownMenuItem>
                <DropdownMenuItem>Active</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Add Station</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Register a new station by inputting its metadata and saving it to the database.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    {/* <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    {/* <Label htmlFor="location" className="text-right">
                      Location
                    </Label> */}
                    <div ref={mapContainer} style={{ height: "500px", width: "100%" }} />
                    {lngLat && (
                      <div className="mt-2 text-sm">
                        Clicked Location: Longitude: {lngLat.lng.toFixed(4)}, Latitude: {lngLat.lat.toFixed(4)}
                      </div>
                    )}{" "}
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <StationTable />
      </div>
    </main>
  );
}
