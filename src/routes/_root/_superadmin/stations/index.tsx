import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Wifi, AlertTriangle, FileText, Shield } from "lucide-react";
import { Station } from "@/types/station";
import StationTable from "@/components/station/station-table";

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
    <div className="w-full h-full flex flex-col overflow-y-auto px-1">
      <div className="w-full flex flex-col mb-5">
        <Label className="text-xl font-semibold">Station List</Label>
        <h3 className="text-sm font-medium text-[#545454] dark:text-gray-200">
          Manage all stations across the platform.
        </h3>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 h-full">
        <div className="flex flex-col w-full lg:w-1/3 gap-4 mb-8">
          <div className="p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Stations</p>
                <p className="text-2xl font-bold">{stations.length}</p>
              </div>
              <Shield className="w-8 h-8" />
            </div>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Connected</p>
                <p className="text-2xl font-bold">{stations.filter((s) => s.status === "connected").length}</p>
              </div>
              <Wifi className="w-8 h-8" />
            </div>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">With Certificates</p>
                <p className="text-2xl font-bold">
                  {stations.filter((s) => s.deviceCertificate && s.privateKey).length}
                </p>
              </div>
              <FileText className="w-8 h-8" />
            </div>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Errors</p>
                <p className="text-2xl font-bold">{stations.filter((s) => s.status === "error").length}</p>
              </div>
              <AlertTriangle className="w-8 h-8" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 rounded-lg border min-h-0 w-full">
          <div className="h-full overflow-y-auto">
            <StationTable stations={mockStations} onDelete={handleDeleteStation} />
          </div>
        </div>
      </div>
    </div>
  );
}
