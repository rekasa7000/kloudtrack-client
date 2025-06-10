import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Trash2,
  Eye,
  Edit,
  FilePlus,
  Command,
  FileText,
  Key,
  MapPin,
  XCircle,
  MoreHorizontal,
} from "lucide-react";
import { Station } from "@/types/station";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import AddDeviceCertificates from "@/components/forms/station/add-device-certificates";
import StationDetails from "@/components/station/station-details";
import { getStatusIcon } from "@/lib/status-icon";
import { formatDate, formatRelativeTime, getStatusColor } from "@/lib/utils";
import { truncateDescription } from "@/utils/truncate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "@tanstack/react-router";

interface StationTableProps {
  stations: Station[];
  onDelete: (id: string) => void;
}

const StationTable = ({ stations, onDelete }: StationTableProps) => {
  const data = stations;

  const columns = useMemo<ColumnDef<Station>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Station",
        cell: (prop) => {
          const station = prop.row.original;
          return (
            <div>
              <div className="text-sm font-medium">{station.name}</div>
              {station.type && (
                <div className="text-sm text-gray-500">{station.type}</div>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: (prop) => {
          const station = prop.row.original;
          return (
            <div className="flex items-center justify-center gap-2">
              {/* {getStatusIcon(station.status)} */}
              <span
                className={`px-2 py-1 text-xs rounded-full border capitalize ${getStatusColor(station.status)}`}
              >
                {station.status}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "location",
        header: () => <div className="text-center">Location</div>,
        cell: (prop) => {
          const station = prop.row.original;
          return (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              {station.location
                ? truncateDescription(station.location, 20)
                : "Not set"}
            </div>
          );
        },
      },
      {
        accessorKey: "deviceCertificate",
        header: () => <div className="text-center">Certification</div>,
        cell: (prop) => {
          const station = prop.row.original;
          return (
            <div className="flex  justify-center items-center gap-2">
              {station.deviceCertificate ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-100 hover:bg-blue-200"
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      Certificate
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Device Certificate
                      </DialogTitle>
                    </DialogHeader>
                    <div className="overflow-y-auto max-h-96">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">
                              Filename:
                            </span>
                            <p className="text-gray-600">
                              {station.deviceCertificate.name}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              Size:
                            </span>
                            <p className="text-gray-600">
                              {(station.deviceCertificate.size / 1024).toFixed(
                                1
                              )}{" "}
                              KB
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              Uploaded:
                            </span>
                            <p className="text-gray-600">
                              {formatDate(station.deviceCertificate.uploadedAt)}
                            </p>
                          </div>
                          {station.deviceCertificate.expiresAt && (
                            <div>
                              <span className="font-medium text-gray-700">
                                Expires:
                              </span>
                              <p className="text-gray-600">
                                {formatDate(
                                  station.deviceCertificate.expiresAt
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                        {station.deviceCertificate.fingerprint && (
                          <div>
                            <span className="font-medium text-gray-700">
                              Fingerprint:
                            </span>
                            <p className="text-gray-600 font-mono text-sm">
                              {station.deviceCertificate.fingerprint}
                            </p>
                          </div>
                        )}
                        <div>
                          <span className="font-medium text-gray-700">
                            Content Preview:
                          </span>
                          <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
                            {station.deviceCertificate.content.substring(
                              0,
                              200
                            )}
                            ...
                          </pre>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button
                  disabled
                  className="text-xs max-h-[32px] max-w-[108px] w-full h-full  text-black bg-gray-400 "
                >
                  <XCircle className="w-3 h-3" />
                  No Cert
                </Button>
              )}
              {station.privateKey ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs bg-red-100 dark:bg-amber-700 text-red-700 dark:text-amber-100 hover:bg-red-200"
                    >
                      <Key className="w-3 h-3 mr-1" />
                      Private Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Key className="w-5 h-5 text-red-600" />
                        Private Key
                      </DialogTitle>
                    </DialogHeader>
                    <div className="overflow-y-auto max-h-96">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">
                              Filename:
                            </span>
                            <p className="text-gray-600">
                              {station.privateKey.name}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              Size:
                            </span>
                            <p className="text-gray-600">
                              {(station.privateKey.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              Uploaded:
                            </span>
                            <p className="text-gray-600">
                              {formatDate(station.privateKey.uploadedAt)}
                            </p>
                          </div>
                        </div>
                        {station.privateKey.fingerprint && (
                          <div>
                            <span className="font-medium text-gray-700">
                              Fingerprint:
                            </span>
                            <p className="text-gray-600 font-mono text-sm">
                              {station.privateKey.fingerprint}
                            </p>
                          </div>
                        )}
                        <div>
                          <span className="font-medium text-gray-700">
                            Content Preview:
                          </span>
                          <pre className="mt-2 p-3 rounded text-xs overflow-x-auto">
                            {station.privateKey.content.substring(0, 200)}...
                          </pre>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button
                  disabled
                  className="text-xs max-h-[32px] max-w-[108px] w-full h-full  text-black bg-gray-400 "
                >
                  <XCircle className="w-3 h-3" />
                  No Key
                </Button>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "lastSeen",
        header: "Last Seen",
        cell: (prop) => {
          const station = prop.row.original;
          return (
            <div className="text-sm text-gray-600">
              {station.lastSeen
                ? formatRelativeTime(station.lastSeen)
                : "Never"}
            </div>
          );
        },
      },
      {
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: (prop) => {
          const station = prop.row.original;
          return (
            <div className="flex justify-center items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 rounded-md text-gray-600 hover:text-gray-700"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Dialog>
                      <DialogTrigger className="w-full text-left px-2 py-1.5 text-sm">
                        <Eye className="mr-2 h-4 w-4 inline" /> View Details
                      </DialogTrigger>
                      <DialogContent className="w-full min-w-sm lg:min-w-5xl min-h-[50vh] overflow-hidden flex flex-col justify-start">
                        <DialogHeader className="mb-0 pb-0">
                          <DialogTitle>Station Details</DialogTitle>
                          <DialogDescription>
                            Station details and it's certificate metadata.
                          </DialogDescription>
                        </DialogHeader>
                        <Separator className="h-1" />
                        <StationDetails station={station} />
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/stations/device-certification/$id"
                      params={{ id: station.id }}
                      className="w-full text-left px-2 py-1.5 text-sm"
                    >
                      <FilePlus className="mr-2 h-4 w-4 inline" /> Add
                      Certificate
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Dialog>
                      <DialogTrigger className="w-full text-left px-2 py-1.5 text-sm">
                        <Edit className="mr-2 h-4 w-4 inline" /> Edit Station
                      </DialogTrigger>
                      <DialogContent className="min-w-sm lg:min-w-[960px] flex flex-col gap-1">
                        <DialogHeader className="font-semibold">
                          Update Station
                        </DialogHeader>
                        <DialogDescription>
                          Update station metadata.
                        </DialogDescription>
                        <Separator className="mb-2" />
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Command className="mr-2 h-4 w-4 inline" /> Commands
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() => toast("Reset successful!")}
                        className="text-sm"
                      >
                        Reset
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => toast("Status successful!")}
                        className="text-sm"
                      >
                        Status
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => toast("Updated firmware successful!")}
                        className="text-sm"
                      >
                        Update Firmware
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => toast("Sync successful!")}
                        className="text-sm"
                      >
                        Sync
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <AlertDialog>
                      <AlertDialogTrigger className="w-full text-left px-2 py-1.5 text-sm text-red-600">
                        <Trash2 className="mr-2 h-4 w-4 inline" /> Delete
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-red-100 rounded-lg">
                              <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                              <AlertDialogTitle>
                                Delete Station
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{station.name}
                                "? This action cannot be undone.
                              </AlertDialogDescription>
                            </div>
                          </div>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(station.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete Station
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [onDelete]
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

export default StationTable;
