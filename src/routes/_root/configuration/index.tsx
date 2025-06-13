import DeviceList from "@/components/configuration/device-list";
import StationTableList from "@/components/configuration/station-table";
import { DatePicker } from "@/components/date-picker";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Station } from "@/types/station";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  Copy,
  LucideKeyRound,
  Monitor,
  SearchIcon,
  Trash,
} from "lucide-react";
import { useId, useState } from "react";
import { toast } from "sonner";

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

export const Route = createFileRoute("/_root/configuration/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [expiration, setExpiration] = useState(false);
  const id = useId();
  const [token] = useState("OB4X-4BZJ-LK2Z-TL6D");

  const copyFunction = async () => {
    try {
      await navigator.clipboard.writeText(token);
      toast.success("Token copied to clipboard", {
        position: "top-right",
      });
    } catch (err) {
      toast.success("Failed to copy token", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="mt-5 pr-3.5 w-full min-h-screen h-full">
      <div className="flex flex-col h-fit items-start gap-5 w-full rounded-md border border-muted p-5">
        <div className="w-full flex justify-between">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-xl font-semibold font-inter">Profile</h1>
            <p className="text-sm text-muted-foreground">
              This section contains your username and api key.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add API Key</Button>
            </DialogTrigger>
            <DialogContent>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Add API Key</h2>
                <p className="text-sm text-muted-foreground">
                  Provide the necessary details to create a new API key for your
                  application.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Title</Label>
                <Input
                  type="text"
                  placeholder="Station"
                  className="border p-2 rounded-md w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Enable Expiration</Label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={!expiration}
                    defaultChecked={true}
                    onCheckedChange={(checked) => setExpiration(!checked)}
                  />
                  <Label>Never</Label>
                </div>
              </div>
              {expiration && <DatePicker />}
              <Button className="mt-2">Create Key</Button>
            </DialogContent>
          </Dialog>
        </div>
        <Separator className="w-full" />
        <div className="w-full flex flex-col">
          <h3 className="text-base font-medium font-inter text-gray-400">
            Username
          </h3>

          <p className="text-xl font-semibold font-inter">Kloudtech</p>
          <p className="text-sm font-normal font-montserrat">
            Your profile was created on March 31, 2025 12:43 PM
          </p>
        </div>
        {/* details */}
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-base font-medium font-inter text-gray-400">
            Authentication Key
          </h3>
          <Card className="w-full flex flex-row items-center p-4">
            <div className="flex flex-row items-center gap-4 px-4">
              <div>
                <LucideKeyRound strokeWidth={1} className="w-14 h-14 " />
                <Badge className="bg-none py-2">API KEY</Badge>
              </div>
              <div className="flex flex-col gap-.5 ms-2">
                <h1 className="text-lg font-inter font-medium">Name</h1>
                <p className="text-base font-inter font-medium">
                  Token: <span className="font-semibold">{token}</span>
                </p>
                <p className="text-sm font-montserrat text-muted-foreground">
                  Expires on Never
                </p>
                <p className="text-sm font-montserrat text-muted-foreground ">
                  Generated on April 11, 2025 01:32 PM
                </p>
              </div>
            </div>
            <div className="ml-auto flex flex-col gap-2">
              <Button onClick={copyFunction} className="mt-2 w-fit">
                <Copy />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="mt-2 w-fit">
                    {" "}
                    <Trash />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        </div>

        {/* stations */}
        <div className="w-full flex flex-col gap-2">
          <div className="*:not-first:mt-2 w-fit self-end">
            <div className="relative">
              <Input
                id={id}
                className="peer ps-9 pe-9 "
                placeholder="Search..."
                type="search"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Submit search"
                type="submit"
              >
                <ArrowRightIcon size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
          <StationTableList stations={mockStations} />
          <span className="text-center text-sm text-muted-foreground font-medium font-inter underline">
            Reference the station ID to integrate with the API.
          </span>
        </div>

        <div className="w-full flex flex-col gap-2">
          <div className="self-center rounded-lg p-4 flex items-center space-x-3 w-fit">
            <div className="relative w-20 h-20">
              <svg
                className="w-20 h-20 transform -rotate-90"
                viewBox="0 0 24 24"
              >
                {/* Background circle */}
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-gray-700"
                />
                {/* Progress circle - 6/20 = 30% */}
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 10}`}
                  strokeDashoffset={`${2 * Math.PI * 10 * (1 - 6 / 20)}`}
                  className="text-blue-500"
                  strokeLinecap="round"
                />
              </svg>
              {/* Text in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className=" text-sm font-medium">6/20</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <h3 className=" font-medium text-base">Device Usage</h3>
              <div className="flex items-center space-x-2 text-sm">
                <Monitor className="w-4 h-4 text-green-500" />
                <span className="text-green-500">14 devices remaining</span>
              </div>
            </div>
          </div>
          <DeviceList />
        </div>
      </div>
    </div>
  );
}
