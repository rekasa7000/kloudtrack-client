import { Station } from "@/types/station";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface StationTableListProps {
  stations: Station[];
}

const StationTableList = ({ stations }: StationTableListProps) => {
  const data = stations;

  const columns = useMemo<ColumnDef<Station>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => <div className="text-center">ID</div>,
        cell: (prop) => {
          const station = prop.row.original;
          return (
            <div>
              <div className="text-sm font-medium text-center">
                {station.id}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "name",
        header: () => <div className="text-center">Name</div>,
        cell: (prop) => {
          const station = prop.row.original;
          return (
            <div className="flex items-center justify-center gap-2">
              {/* {getStatusIcon(station.status)} */}

              {station.name}
            </div>
          );
        },
      },
      {
        accessorKey: "type",
        header: () => <div className="text-center">Type</div>,
        cell: (prop) => {
          const station = prop.row.original;
          return (
            <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
              {station.type}
            </div>
          );
        },
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

  return (
    <div className="w-full flex flex-col rounded-md border border-muted items-center justify-between h-full">
      <Table className="w-full">
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
                    className="text-left font-inter font-medium py-4"
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
                className="hover:bg-muted"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="text-left font-light py-4 font-montserrat"
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

      <div className="flex items-center px-5 justify-between w-full py-4 z-10">
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
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StationTableList;
