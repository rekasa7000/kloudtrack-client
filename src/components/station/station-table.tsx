import { useMemo, useState } from "react";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StationMetadata {
  name: string;
  organization: string;
  lastSeen: string;
  createdAt: string;
  status: string;
  id: string;
}

const StationTable = () => {
  const [data, setData] = useState<StationMetadata[]>([]);

  // column
  const columns = useMemo<ColumnDef<StationMetadata>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (prop) => prop.getValue() as string,
      },
      {
        accessorKey: "organization",
        header: "Organization",
        cell: (prop) => prop.getValue() as string, // Removed toLocaleString()
      },
      {
        accessorKey: "lastSeen",
        header: "Last Seen",
        cell: (prop) => prop.getValue() as string,
      },
      {
        accessorKey: "createdAt",
        header: "Date Created",
        cell: (prop) => prop.getValue() as string,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (prop) => prop.getValue() as string,
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
    <div className="w-full flex flex-col items-center overflow-x-hidden ">
      <Table className="w-full  mt-2 border-y-1 border-muted">
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
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StationTable;
