import { useMemo, useReducer, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WeatherData {
  name: string;
  date_recorded: Date;
  temperature: string;
  humidity: string;
  pressure: string;
  heat_index: string;
  wind_speed: string;
  wind_direction: string;
  uv_index: string;
  light: string;
  precipitation: string;
  hourly_precipitation: string;
}

// dummy data
const weatherData: WeatherData[] = [
  {
    name: "Station 1",
    date_recorded: new Date("2025-04-21 08:00"),
    temperature: "27°C",
    humidity: "65%",
    pressure: "1012 hPa",
    heat_index: "29°C",
    wind_speed: "15 km/h",
    wind_direction: "NE",
    uv_index: "4",
    light: "450 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 2",
    date_recorded: new Date("2025-04-21 09:00"),
    temperature: "32°C",
    humidity: "80%",
    pressure: "1008 hPa",
    heat_index: "38°C",
    wind_speed: "20 km/h",
    wind_direction: "S",
    uv_index: "7",
    light: "800 lux",
    precipitation: "2 mm",
    hourly_precipitation: "1 mm",
  },
  {
    name: "Station 3",
    date_recorded: new Date("2025-04-21 10:00"),
    temperature: "18°C",
    humidity: "45%",
    pressure: "1015 hPa",
    heat_index: "17°C",
    wind_speed: "10 km/h",
    wind_direction: "NW",
    uv_index: "3",
    light: "300 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 4",
    date_recorded: new Date("2025-04-21 11:00"),
    temperature: "25°C",
    humidity: "70%",
    pressure: "1010 hPa",
    heat_index: "27°C",
    wind_speed: "39 km/h",
    wind_direction: "E",
    uv_index: "5",
    light: "600 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 5",
    date_recorded: new Date("2025-04-21 12:00"),
    temperature: "30°C",
    humidity: "55%",
    pressure: "1009 hPa",
    heat_index: "33°C",
    wind_speed: "25 km/h",
    wind_direction: "SE",
    uv_index: "6",
    light: "700 lux",
    precipitation: "1 mm",
    hourly_precipitation: "0.5 mm",
  },
  {
    name: "Station 6",
    date_recorded: new Date("2025-04-21 13:00"),
    temperature: "22°C",
    humidity: "60%",
    pressure: "1013 hPa",
    heat_index: "23°C",
    wind_speed: "12 km/h",
    wind_direction: "N",
    uv_index: "4",
    light: "500 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 7",
    date_recorded: new Date("2025-04-21 14:00"),
    temperature: "35°C",
    humidity: "40%",
    pressure: "1007 hPa",
    heat_index: "37°C",
    wind_speed: "30 km/h",
    wind_direction: "SW",
    uv_index: "8",
    light: "900 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 8",
    date_recorded: new Date("2025-04-21 15:00"),
    temperature: "28°C",
    humidity: "75%",
    pressure: "1011 hPa",
    heat_index: "31°C",
    wind_speed: "18 km/h",
    wind_direction: "W",
    uv_index: "5",
    light: "650 lux",
    precipitation: "3 mm",
    hourly_precipitation: "2 mm",
  },
  {
    name: "Station 9",
    date_recorded: new Date("2025-04-21 16:00"),
    temperature: "20°C",
    humidity: "50%",
    pressure: "1014 hPa",
    heat_index: "20°C",
    wind_speed: "8 km/h",
    wind_direction: "NE",
    uv_index: "2",
    light: "400 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 10",
    date_recorded: new Date("2025-04-21 17:00"),
    temperature: "33°C",
    humidity: "60%",
    pressure: "1006 hPa",
    heat_index: "36°C",
    wind_speed: "22 km/h",
    wind_direction: "S",
    uv_index: "7",
    light: "750 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 11",
    date_recorded: new Date("2025-04-21 18:00"),
    temperature: "31°C",
    humidity: "58%",
    pressure: "1005 hPa",
    heat_index: "34°C",
    wind_speed: "20 km/h",
    wind_direction: "SE",
    uv_index: "6",
    light: "600 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 12",
    date_recorded: new Date("2025-04-21 19:00"),
    temperature: "29°C",
    humidity: "62%",
    pressure: "1006 hPa",
    heat_index: "32°C",
    wind_speed: "18 km/h",
    wind_direction: "S",
    uv_index: "4",
    light: "400 lux",
    precipitation: "1 mm",
    hourly_precipitation: "0.5 mm",
  },
  {
    name: "Station 13",
    date_recorded: new Date("2025-04-21 20:00"),
    temperature: "26°C",
    humidity: "70%",
    pressure: "1008 hPa",
    heat_index: "28°C",
    wind_speed: "15 km/h",
    wind_direction: "SW",
    uv_index: "2",
    light: "200 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 14",
    date_recorded: new Date("2025-04-21 21:00"),
    temperature: "24°C",
    humidity: "75%",
    pressure: "1010 hPa",
    heat_index: "26°C",
    wind_speed: "12 km/h",
    wind_direction: "W",
    uv_index: "1",
    light: "100 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 15",
    date_recorded: new Date("2025-04-21 22:00"),
    temperature: "22°C",
    humidity: "80%",
    pressure: "1011 hPa",
    heat_index: "23°C",
    wind_speed: "10 km/h",
    wind_direction: "NW",
    uv_index: "0",
    light: "50 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 16",
    date_recorded: new Date("2025-04-21 23:00"),
    temperature: "20°C",
    humidity: "85%",
    pressure: "1012 hPa",
    heat_index: "21°C",
    wind_speed: "8 km/h",
    wind_direction: "N",
    uv_index: "0",
    light: "20 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 17",
    date_recorded: new Date("2025-04-22 00:00"),
    temperature: "19°C",
    humidity: "88%",
    pressure: "1013 hPa",
    heat_index: "20°C",
    wind_speed: "5 km/h",
    wind_direction: "NE",
    uv_index: "0",
    light: "10 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 18",
    date_recorded: new Date("2025-04-22 01:00"),
    temperature: "18°C",
    humidity: "90%",
    pressure: "1014 hPa",
    heat_index: "19°C",
    wind_speed: "6 km/h",
    wind_direction: "E",
    uv_index: "0",
    light: "5 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 19",
    date_recorded: new Date("2025-04-22 02:00"),
    temperature: "17°C",
    humidity: "92%",
    pressure: "1013 hPa",
    heat_index: "18°C",
    wind_speed: "7 km/h",
    wind_direction: "SE",
    uv_index: "0",
    light: "5 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 20",
    date_recorded: new Date("2025-04-22 03:00"),
    temperature: "16°C",
    humidity: "93%",
    pressure: "1012 hPa",
    heat_index: "17°C",
    wind_speed: "5 km/h",
    wind_direction: "S",
    uv_index: "0",
    light: "10 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 21",
    date_recorded: new Date("2025-04-22 04:00"),
    temperature: "15°C",
    humidity: "94%",
    pressure: "1011 hPa",
    heat_index: "16°C",
    wind_speed: "4 km/h",
    wind_direction: "SW",
    uv_index: "0",
    light: "15 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 22",
    date_recorded: new Date("2025-04-22 05:00"),
    temperature: "16°C",
    humidity: "92%",
    pressure: "1010 hPa",
    heat_index: "17°C",
    wind_speed: "6 km/h",
    wind_direction: "W",
    uv_index: "0",
    light: "30 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 23",
    date_recorded: new Date("2025-04-22 06:00"),
    temperature: "18°C",
    humidity: "88%",
    pressure: "1011 hPa",
    heat_index: "19°C",
    wind_speed: "8 km/h",
    wind_direction: "NW",
    uv_index: "1",
    light: "100 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 24",
    date_recorded: new Date("2025-04-22 07:00"),
    temperature: "20°C",
    humidity: "80%",
    pressure: "1012 hPa",
    heat_index: "21°C",
    wind_speed: "10 km/h",
    wind_direction: "N",
    uv_index: "2",
    light: "200 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 25",
    date_recorded: new Date("2025-04-22 08:00"),
    temperature: "23°C",
    humidity: "75%",
    pressure: "1013 hPa",
    heat_index: "24°C",
    wind_speed: "12 km/h",
    wind_direction: "NE",
    uv_index: "3",
    light: "300 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 26",
    date_recorded: new Date("2025-04-22 09:00"),
    temperature: "26°C",
    humidity: "70%",
    pressure: "1014 hPa",
    heat_index: "27°C",
    wind_speed: "15 km/h",
    wind_direction: "E",
    uv_index: "4",
    light: "400 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 27",
    date_recorded: new Date("2025-04-22 10:00"),
    temperature: "28°C",
    humidity: "65%",
    pressure: "1013 hPa",
    heat_index: "30°C",
    wind_speed: "18 km/h",
    wind_direction: "SE",
    uv_index: "5",
    light: "500 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 28",
    date_recorded: new Date("2025-04-22 11:00"),
    temperature: "30°C",
    humidity: "60%",
    pressure: "1012 hPa",
    heat_index: "32°C",
    wind_speed: "20 km/h",
    wind_direction: "S",
    uv_index: "6",
    light: "600 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 29",
    date_recorded: new Date("2025-04-22 12:00"),
    temperature: "32°C",
    humidity: "55%",
    pressure: "1011 hPa",
    heat_index: "34°C",
    wind_speed: "22 km/h",
    wind_direction: "SW",
    uv_index: "7",
    light: "700 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
  {
    name: "Station 30",
    date_recorded: new Date("2025-04-22 13:00"),
    temperature: "33°C",
    humidity: "50%",
    pressure: "1010 hPa",
    heat_index: "35°C",
    wind_speed: "25 km/h",
    wind_direction: "W",
    uv_index: "8",
    light: "800 lux",
    precipitation: "0 mm",
    hourly_precipitation: "0 mm",
  },
];

const DashboardTable = () => {
  const rerender = useReducer(() => ({}), {})[1];
  const [data, setData] = useState<WeatherData[]>(weatherData);

  // column
  const columns = useMemo<ColumnDef<WeatherData>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (prop) => prop.getValue(),
      },
      {
        accessorKey: "date_recorded",
        header: "Date Recorded",
        cell: (prop) => prop.getValue()?.toLocaleString(),
      },
      {
        accessorKey: "temperature",
        header: "Temperature",
        cell: (prop) => prop.getValue(),
      },
      {
        accessorKey: "humidity",
        header: "Humidity",
        cell: (prop) => prop.getValue(),
      },
      {
        accessorKey: "pressure",
        header: "Pressure",
        cell: (prop) => prop.getValue(),
      },
      {
        accessorKey: "heat_index",
        header: "Heat Index",
        cell: (prop) => prop.getValue(),
      },
      {
        accessorKey: "wind_speed",
        header: "Wind Speed",
        cell: (prop) => prop.getValue(),
      },
      {
        accessorKey: "wind_direction",
        header: "Wind Direction",
        cell: (prop) => prop.getValue(),
      },
      {
        accessorKey: "uv_index",
        header: "UV Index",
        cell: (prop) => prop.getValue(),
      },
      {
        accessorKey: "light",
        header: "Light",
        cell: (prop) => prop.getValue(),
      },
      {
        accessorKey: "precipitation",
        header: "Precipitation",
        cell: (prop) => prop.getValue(),
      },
      {
        accessorKey: "hourly_precipitation",
        header: "Hourly Precipitation",
        cell: (prop) => prop.getValue(),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  console.log(table.getHeaderGroups());

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden ">
      <Table className="w-full  mt-2 border-y-1 border-muted">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-muted pointer-events-none"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-center font-inter font-medium py-4  "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="text-center font-light py-4 font-montserrat "
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="bg-white  flex items-center  justify-between min-w-full py-4 z-10">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="font-inter"
          >
            <ChevronLeft />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="font-inter"
          >
            Next <ChevronRight />
          </Button>
        </div>
        <div className="mr-1">
          <span className="font-medium font-montserrat text-sm">
            {" "}
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
