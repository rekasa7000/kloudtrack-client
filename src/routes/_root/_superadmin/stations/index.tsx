import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Wifi,
  AlertTriangle,
  Key,
  FileText,
  MapPin,
  Eye,
  Edit,
  Trash2,
  Shield,
  XCircle,
  FilePlus,
  Command,
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
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import AddDeviceCertificates from "@/components/forms/station/add-device-certificates";
import StationDetails from "@/components/station/station-details";
import { getStatusIcon } from "@/lib/status-icon";
import { formatDate, formatRelativeTime, getStatusColor } from "@/lib/utils";

const mockStations: Station[] = [
  {
    id: "1",
    name: "Pto. Rivas Ibaba AWS",
    type: "Automated Weather Station",
    status: "connected",
    location: "Pto. Rivas Ibaba, Balanga City, Bataan",
    lastSeen: new Date(Date.now() - 1000 * 60 * 5),
    certificate: {
      certificateId: " abcde",
      certificateArn: " abcde",
      subject: " abcde",
      issuer: " abcde",
      status: " abcde",
      fingerprint: " abcde",
      validSince: " abcde",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
    deviceCertificate: {
      id: "cert-1",
      name: "temp-sensor-a1-cert.pem",
      content:
        "-----BEGIN CERTIFICATE-----\nMIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF\n-----END CERTIFICATE-----",
      size: 1024,
      uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      fingerprint: "SHA256:1234567890abcdef",
    },
    privateKey: {
      id: "key-1",
      name: "temp-sensor-a1-private.key",
      content:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7VJTUt9Us8cKB\n-----END PRIVATE KEY-----",
      size: 1679,
      uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      fingerprint: "SHA256:abcdef1234567890",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  },
  {
    id: "2",
    name: "Daang Bago RLMS",
    type: "River Level Monitoring System",
    status: "disconnected",
    location: "Daang Bago, Dinalupihan, Bataan",
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
    certificate: {
      certificateId: " abcde",
      certificateArn: " abcde",
      subject: " abcde",
      issuer: " abcde",
      status: " abcde",
      fingerprint: " abcde",
      validSince: " abcde",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
    deviceCertificate: {
      id: "cert-2",
      name: "humidity-sensor-b2-cert.pem",
      content:
        "-----BEGIN CERTIFICATE-----\nMIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF\n-----END CERTIFICATE-----",
      size: 1156,
      uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 300),
      fingerprint: "SHA256:fedcba0987654321",
    },
    privateKey: {
      id: "key-2",
      name: "humidity-sensor-b2-private.key",
      content:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7VJTUt9Us8cKB\n-----END PRIVATE KEY-----",
      size: 1702,
      uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  },
  {
    id: "3",
    name: "Bayan-bayanan ARG",
    type: "Automatic Rain Gauge",
    status: "error",
    location: "Bayan Bayanan, Dinalupihan Bataan",
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24),
    certificate: {
      certificateId: " abcde",
      certificateArn: " abcde",
      subject: " abcde",
      issuer: " abcde",
      status: " abcde",
      fingerprint: " abcde",
      validSince: " abcde",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
    deviceCertificate: {
      id: "cert-3",
      name: "motion-detector-c3-cert.pem",
      content:
        "-----BEGIN CERTIFICATE-----\nMIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF\n-----END CERTIFICATE-----",
      size: 1089,
      uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180),
      fingerprint: "SHA256:abcd1234efgh5678",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  },
  {
    id: "4",
    name: "Pto. Rivas Ibaba CLMS",
    type: "Coastal Level Monitoring System",
    status: "pending",
    location: "Pto. Rivas Ibaba, Balanga City, Bataan",
    certificate: {
      certificateId: " abcde",
      certificateArn: " abcde",
      subject: " abcde",
      issuer: " abcde",
      status: " abcde",
      fingerprint: " abcde",
      validSince: " abcde",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  },
];

export const Route = createFileRoute("/_root/_superadmin/stations/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [stations, setStations] = useState<Station[]>(mockStations);

  const handleDeleteStation = (stationId: string) => {
    setStations((prev) => prev.filter((s) => s.id !== stationId));
  };

  return (
    <div className="w-full h-full overflow-y-auto px-1">
      <div className="w-full flex flex-col mb-5">
        <Label className="text-xl font-semibold">Station List</Label>
        <h3 className="text-sm font-medium text-[#545454] dark:text-gray-200">
          Manage all stations across the platform.
        </h3>
      </div>
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Stations</p>
                <p className="text-2xl font-bold">{stations.length}</p>
              </div>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Connected</p>
                <p className="text-2xl font-bold text-green-600">
                  {stations.filter((s) => s.status === "connected").length}
                </p>
              </div>
              <Wifi className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">With Certificates</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stations.filter((s) => s.deviceCertificate && s.privateKey).length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Errors</p>
                <p className="text-2xl font-bold text-red-600">{stations.filter((s) => s.status === "error").length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Stations</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Station</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Certificates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Seen</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {stations.map((station) => (
                  <tr key={station.id} className="hover">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium">{station.name}</div>
                        {station.type && <div className="text-sm text-gray-500">{station.type}</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(station.status)}
                        <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(station.status)}`}>
                          {station.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {station.location || "Not set"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                                      <p className="text-gray-600">
                                        {(station.deviceCertificate.size / 1024).toFixed(1)} KB
                                      </p>
                                    </div>
                                    <div>
                                      <span className="font-medium text-gray-700">Uploaded:</span>
                                      <p className="text-gray-600">
                                        {formatDate(station.deviceCertificate.uploadedAt)}
                                      </p>
                                    </div>
                                    {station.deviceCertificate.expiresAt && (
                                      <div>
                                        <span className="font-medium text-gray-700">Expires:</span>
                                        <p className="text-gray-600">
                                          {formatDate(station.deviceCertificate.expiresAt)}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  {station.deviceCertificate.fingerprint && (
                                    <div>
                                      <span className="font-medium text-gray-700">Fingerprint:</span>
                                      <p className="text-gray-600 font-mono text-sm">
                                        {station.deviceCertificate.fingerprint}
                                      </p>
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
                          <span className="flex items-center gap-1 text-xs  px-2 py-1 rounded">
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
                                      <p className="text-gray-600 font-mono text-sm">
                                        {station.privateKey.fingerprint}
                                      </p>
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
                          <span className="flex items-center gap-1 text-xs  px-2 py-1 rounded">
                            <XCircle className="w-3 h-3" />
                            No Key
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {station.lastSeen ? formatRelativeTime(station.lastSeen) : "Never"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                              <AlertDialogAction
                                onClick={() => handleDeleteStation(station.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete Station
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
