import { useMemo } from "react";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Station } from "@/types/station";

interface stationTableProps {
  station: Station[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

const StationTable = ({ station, onToggleStatus, onDelete }: stationTableProps) => {
  const data = station;

  const columns = useMemo<ColumnDef<Station>[]>(
    () => [
      {
        accessorKey: "Station",
        header: "Name",
        cell: (prop) => prop.getValue(),
      },
      {
        accessorKey: "version",
        header: "Version",
        cell: (prop) => prop.getValue()?.toLocaleString(),
      },
      {
        accessorKey: "isActive",
        header: "Status",
        cell: (prop) => {
          const isActive = prop.row.original.isActive;
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          );
        },
      },
      {
        accessorKey: "region",
        header: "Region",
        cell: (prop) => prop.getValue(),
      },
      {
        accessorKey: "createdAt",
        header: "Date Created",
        cell: (prop) => prop.getValue(),
      },
      {
        header: "Actions",
        cell: (prop) => {
          const certificate = prop.row.original;
          return (
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm" onClick={() => onToggleStatus(certificate.id)} className="text-xs">
                {certificate.isActive ? "Deactivate" : "Activate"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(certificate.id)}
                className="text-xs text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    [onToggleStatus, onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full flex flex-col items-center justify-between h-full">
      <Table className="w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted pointer-events-none">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center font-inter font-medium py-4  ">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-center font-light py-4 font-montserrat ">
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
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StationTable;
