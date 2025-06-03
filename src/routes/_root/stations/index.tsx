import { StationList } from "@/components/station/station-list";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";

import React, { useState } from "react";
import {
  Wifi,
  WifiOff,
  AlertTriangle,
  Clock,
  Key,
  FileText,
  MapPin,
  Eye,
  Edit,
  Trash2,
  Shield,
  CheckCircle,
  XCircle,
  Plus,
  FilePlus,
  Command,
} from "lucide-react";
import { Station } from "@/types/station";
import { StationCertificate } from "@/types/certificate";
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
import DeviceCertificateUploader from "@/components/station/certificates/device-certificate-uploader";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockStations: Station[] = [
  {
    id: "1",
    name: "Temperature Sensor A1",
    description: "Main warehouse temperature monitoring",
    status: "connected",
    location: "Warehouse A - Section 1",
    lastSeen: new Date(Date.now() - 1000 * 60 * 5),
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
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  },
  {
    id: "2",
    name: "Humidity Sensor B2",
    description: "Office humidity control system",
    status: "disconnected",
    location: "Office Building B - Floor 2",
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
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
      fingerprint: "SHA256:0987654321fedcba",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "3",
    name: "Motion Detector C3",
    description: "Security motion detection",
    status: "error",
    location: "Parking Lot C - Entrance",
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24),
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
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "4",
    name: "Smart Thermostat D4",
    description: "HVAC temperature control",
    status: "pending",
    location: "Conference Room D",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
];

export const Route = createFileRoute("/_root/stations/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [stations, setStations] = useState<Station[]>(mockStations);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const getStatusIcon = (status: Station["status"]) => {
    switch (status) {
      case "connected":
        return <Wifi className="w-5 h-5 text-green-600" />;
      case "disconnected":
        return <WifiOff className="w-5 h-5 text-gray-500" />;
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: Station["status"]) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800 border-green-200";
      case "disconnected":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleDeleteStation = (stationId: string) => {
    setStations((prev) => prev.filter((s) => s.id !== stationId));
  };

  return (
    <div className="w-full max-h-[90vh] overflow-y-auto lg:px-5 px-1">
      <div className="mb-5 space-y-2">
        <Label className="text-lg font-semibold">Station List</Label>
        <h3 className="text-sm font-medium text-[#545454]">Manage all stations across the platform. </h3>
      </div>
      <div className="min-h-screen">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Stations</p>
                  <p className="text-2xl font-bold text-gray-900">{stations.length}</p>
                </div>
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
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
            <div className="bg-white p-4 rounded-lg border">
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
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Errors</p>
                  <p className="text-2xl font-bold text-red-600">
                    {stations.filter((s) => s.status === "error").length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Stations</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Station
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Certificates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Seen
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stations.map((station) => (
                    <tr key={station.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{station.name}</div>
                          {station.description && <div className="text-sm text-gray-500">{station.description}</div>}
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
                                  className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
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
                            <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
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
                                  className="text-xs bg-red-100 text-red-700 hover:bg-red-200"
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
                                        <p className="text-gray-600">
                                          {(station.privateKey.size / 1024).toFixed(1)} KB
                                        </p>
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
                                      <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
                                        {station.privateKey.content.substring(0, 200)}...
                                      </pre>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
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
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                              <DialogHeader>
                                <DialogTitle>Station Details</DialogTitle>
                              </DialogHeader>
                              <div className="overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900">Basic Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Name:</span>
                                        <span className="font-medium">{station.name}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <div className="flex items-center gap-2">
                                          {getStatusIcon(station.status)}
                                          <span
                                            className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(station.status)}`}
                                          >
                                            {station.status}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Location:</span>
                                        <span className="font-medium">{station.location || "Not set"}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Created:</span>
                                        <span className="font-medium">{formatDate(station.createdAt)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Last Seen:</span>
                                        <span className="font-medium">
                                          {station.lastSeen ? formatDate(station.lastSeen) : "Never"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900">Certificate Status</h4>
                                    <div className="space-y-3">
                                      <div className="p-3 border rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="font-medium text-sm">Device Certificate</span>
                                          {station.deviceCertificate ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                          ) : (
                                            <XCircle className="w-5 h-5 text-red-600" />
                                          )}
                                        </div>
                                        {station.deviceCertificate ? (
                                          <div className="text-xs text-gray-600">
                                            <p>{station.deviceCertificate.name}</p>
                                            <p>Uploaded: {formatDate(station.deviceCertificate.uploadedAt)}</p>
                                          </div>
                                        ) : (
                                          <p className="text-xs text-red-600">No certificate uploaded</p>
                                        )}
                                      </div>
                                      <div className="p-3 border rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="font-medium text-sm">Private Key</span>
                                          {station.privateKey ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                          ) : (
                                            <XCircle className="w-5 h-5 text-red-600" />
                                          )}
                                        </div>
                                        {station.privateKey ? (
                                          <div className="text-xs text-gray-600">
                                            <p>{station.privateKey.name}</p>
                                            <p>Uploaded: {formatDate(station.privateKey.uploadedAt)}</p>
                                          </div>
                                        ) : (
                                          <p className="text-xs text-red-600">No private key uploaded</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                            <Dialog>
                              <DialogTrigger>
                                <FilePlus className="w-4 h-4 text-black" />
                              </DialogTrigger>
                              <DialogContent className="min-w-sm lg:min-w-[960px] flex flex-col gap-1">
                                <DialogHeader className="font-semibold">Root Certificate</DialogHeader>
                                <DialogDescription>
                                  Add and save root certificate from AWS IoT Core. Input its metadata
                                </DialogDescription>
                                <Separator className="mb-2" />
                                <DeviceCertificateUploader />
                              </DialogContent>
                            </Dialog>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                            <Dialog>
                              <DialogTrigger>
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
                                    <Button>Reset</Button>
                                  </TabsContent>
                                  <TabsContent value="status">
                                    <div className="mb-5">
                                      <Label className="text-lg text-gray-700 font-semibold">Status</Label>
                                      <h3 className="text-sm font-medium text-[#545454]">
                                        This command will collect the device status and health.
                                      </h3>
                                    </div>
                                  </TabsContent>
                                  <TabsContent value="update">
                                    <div className="mb-5">
                                      <Label className="text-lg text-gray-700 font-semibold">Update Firmware</Label>
                                      <h3 className="text-sm font-medium text-[#545454]">
                                        This will allow the station to update its firmware
                                      </h3>
                                    </div>
                                  </TabsContent>
                                  <TabsContent value="sync">
                                    <div className="mb-5">
                                      <Label className="text-lg text-gray-700 font-semibold">Sync</Label>
                                      <h3 className="text-sm font-medium text-[#545454]">
                                        This will collect the current data for sync in.
                                      </h3>
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              </DialogContent>
                            </Dialog>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
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
    </div>
  );
}
