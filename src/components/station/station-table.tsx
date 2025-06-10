import { useMemo } from "react";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import AddDeviceCertificates from "@/components/forms/station/add-device-certificates";
import StationDetails from "@/components/station/station-details";
import { getStatusIcon } from "@/lib/status-icon";
import { formatDate, formatRelativeTime, getStatusColor } from "@/lib/utils";

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
              {station.type && <div className="text-sm text-gray-500">{station.type}</div>}
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (prop) => {
          const station = prop.row.original;
          return (
            <div className="flex items-center gap-2">
              {getStatusIcon(station.status)}
              <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(station.status)}`}>
                {station.status}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: (prop) => {
          const station = prop.row.original;
          return (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              {station.location || "Not set"}
            </div>
          );
        },
      },
      {
        header: "Certificates",
        cell: (prop) => {
          const station = prop.row.original;
          return (
            <div className="flex items-center gap-2">
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
                            <span className="font-medium text-gray-700">Filename:</span>
                            <p className="text-gray-600">{station.deviceCertificate.name}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Size:</span>
                            <p className="text-gray-600">{(station.deviceCertificate.size / 1024).toFixed(1)} KB</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Uploaded:</span>
                            <p className="text-gray-600">{formatDate(station.deviceCertificate.uploadedAt)}</p>
                          </div>
                          {station.deviceCertificate.expiresAt && (
                            <div>
                              <span className="font-medium text-gray-700">Expires:</span>
                              <p className="text-gray-600">{formatDate(station.deviceCertificate.expiresAt)}</p>
                            </div>
                          )}
                        </div>
                        {station.deviceCertificate.fingerprint && (
                          <div>
                            <span className="font-medium text-gray-700">Fingerprint:</span>
                            <p className="text-gray-600 font-mono text-sm">{station.deviceCertificate.fingerprint}</p>
                          </div>
                        )}
                        <div>
                          <span className="font-medium text-gray-700">Content Preview:</span>
                          <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
                            {station.deviceCertificate.content.substring(0, 200)}...
                          </pre>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <span className="flex items-center gap-1 text-xs px-2 py-1 rounded">
                  <XCircle className="w-3 h-3" />
                  No Cert
                </span>
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
                            <span className="font-medium text-gray-700">Filename:</span>
                            <p className="text-gray-600">{station.privateKey.name}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Size:</span>
                            <p className="text-gray-600">{(station.privateKey.size / 1024).toFixed(1)} KB</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Uploaded:</span>
                            <p className="text-gray-600">{formatDate(station.privateKey.uploadedAt)}</p>
                          </div>
                        </div>
                        {station.privateKey.fingerprint && (
                          <div>
                            <span className="font-medium text-gray-700">Fingerprint:</span>
                            <p className="text-gray-600 font-mono text-sm">{station.privateKey.fingerprint}</p>
                          </div>
                        )}
                        <div>
                          <span className="font-medium text-gray-700">Content Preview:</span>
                          <pre className="mt-2 p-3 rounded text-xs overflow-x-auto">
                            {station.privateKey.content.substring(0, 200)}...
                          </pre>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <span className="flex items-center gap-1 text-xs px-2 py-1 rounded">
                  <XCircle className="w-3 h-3" />
                  No Key
                </span>
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
              {station.lastSeen ? formatRelativeTime(station.lastSeen) : "Never"}
            </div>
          );
        },
      },
      {
        header: "Actions",
        cell: (prop) => {
          const station = prop.row.original;
          return (
            <div className="flex items-center">
              <Dialog>
                <DialogTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  <Eye className="w-4 h-4" />
                </DialogTrigger>
                <DialogContent className="w-full min-w-sm lg:min-w-5xl min-h-[50vh] overflow-hidden flex flex-col justify-start">
                  <DialogHeader className="mb-0 pb-0">
                    <DialogTitle>Station Details</DialogTitle>
                    <DialogDescription>Station details and it's certificate metadata.</DialogDescription>
                  </DialogHeader>
                  <Separator className="h-1" />
                  <StationDetails station={station} />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-600 hover:text-gray-700 hover">
                  <FilePlus className="w-4 h-4 text-black" />
                </DialogTrigger>
                <DialogContent className="min-w-sm lg:min-w-[960px] flex flex-col gap-1">
                  <DialogTitle className="font-semibold">Device Certificate</DialogTitle>
                  <DialogDescription>
                    Add and save root certificate from AWS IoT Core. Input its metadata
                  </DialogDescription>
                  <Separator className="mb-2" />
                  <AddDeviceCertificates />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-600 hover:text-gray-700 hover">
                  <Edit className="w-4 h-4" />
                </DialogTrigger>
                <DialogContent className="min-w-sm lg:min-w-[960px] flex flex-col gap-1">
                  <DialogHeader className="font-semibold">Update Station</DialogHeader>
                  <DialogDescription>Update station metadata.</DialogDescription>
                  <Separator className="mb-2" />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-600 hover:text-gray-700 hover">
                  <Command className="w-4 h-4 text-black" />
                </DialogTrigger>
                <DialogContent className="min-w-sm flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <DialogHeader className="font-semibold text-lg">Commands</DialogHeader>
                    <DialogDescription className="text-sm text-gray-700">
                      Send Command to specific weather station{" "}
                    </DialogDescription>
                  </div>
                  <Tabs defaultValue="reset" className="flex flex-col gap-2">
                    <TabsList className="border-gray-200 bg-transparent border-b-1 p-0 rounded-none">
                      <TabsTrigger value="reset" className="shadow-none rounded-none w-24">
                        Reset
                      </TabsTrigger>
                      <TabsTrigger value="status" className="shadow-none rounded-none w-24">
                        Status
                      </TabsTrigger>
                      <TabsTrigger value="update" className="shadow-none rounded-none w-24">
                        Update
                      </TabsTrigger>
                      <TabsTrigger value="sync" className="shadow-none rounded-none w-24">
                        Sync
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="reset">
                      <div className="mb-5">
                        <Label className="text-lg text-gray-700 font-semibold">Reset</Label>
                        <h3 className="text-sm font-medium text-[#545454]">
                          Resetting this station will refresh the state of it.
                        </h3>
                      </div>
                      <Button onClick={() => toast("Reset successful!")}>Reset</Button>
                    </TabsContent>
                    <TabsContent value="status">
                      <div className="mb-5">
                        <Label className="text-lg text-gray-700 font-semibold">Status</Label>
                        <h3 className="text-sm font-medium text-[#545454]">
                          This command will collect the device status and health.
                        </h3>
                      </div>
                      <Button onClick={() => toast("Status successful!")}>Status</Button>
                    </TabsContent>
                    <TabsContent value="update">
                      <div className="mb-5">
                        <Label className="text-lg text-gray-700 font-semibold">Update Firmware</Label>
                        <h3 className="text-sm font-medium text-[#545454]">
                          This will allow the station to update its firmware
                        </h3>
                      </div>
                      <Button onClick={() => toast("Updated firmware successful!")}>Update</Button>
                    </TabsContent>
                    <TabsContent value="sync">
                      <div className="mb-5">
                        <Label className="text-lg text-gray-700 font-semibold">Sync</Label>
                        <h3 className="text-sm font-medium text-[#545454]">
                          This will collect the current data for sync in.
                        </h3>
                      </div>
                      <Button onClick={() => toast("Sync successful!")}>Sync</Button>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-red-100 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <AlertDialogTitle>Delete Station</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{station.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </div>
                    </div>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(station.id)} className="bg-red-600 hover:bg-red-700">
                      Delete Station
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
            <TableRow key={headerGroup.id} className="bg-muted pointer-events-none">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-left font-inter font-medium py-4">
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
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-left font-light py-4 font-montserrat">
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
