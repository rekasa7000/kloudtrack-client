import { createFileRoute } from "@tanstack/react-router";
import {
  Shield,
  ShieldAlert,
  Trash2,
  Calendar,
  Globe,
  Key,
  AlertTriangle,
  CheckCircle,
  GitCompareArrows,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Certificate } from "@/types/certificate";
import { useState } from "react";
import { Label } from "@/components/ui/label";
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
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import AddRootCertificate from "@/components/forms/station/add-root-certificate";

export const Route = createFileRoute("/_root/stations/root-certificate")({
  component: RouteComponent,
});

function RouteComponent() {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: "cert-1",
      name: "Amazon Root CA 1",
      version: "CA1",
      isActive: true,
      region: "us-east-1",
      createdAt: "2023-01-15",
    },
    {
      id: "cert-2",
      name: "Amazon Root CA 2",
      version: "CA2",
      isActive: false,
      region: "us-west-2",
      createdAt: "2023-02-20",
    },
    {
      id: "cert-3",
      name: "Amazon Root CA 3",
      version: "CA3",
      isActive: true,
      region: "eu-west-1",
      createdAt: "2023-03-10",
    },
    {
      id: "cert-4",
      name: "Amazon Root CA 4",
      version: "CA4",
      isActive: true,
      region: "ap-southeast-1",
      createdAt: "2023-04-05",
    },
  ]);

  const toggleCertificateStatus = (id: string) => {
    setCertificates((prev) => prev.map((cert) => (cert.id === id ? { ...cert, isActive: !cert.isActive } : cert)));
  };

  const deleteCertificate = (id: string) => {
    setCertificates((prev) => prev.filter((cert) => cert.id !== id));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isExpiringSoon = (validTo: string) => {
    const expiryDate = new Date(validTo);
    const now = new Date();
    const sixMonthsFromNow = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
    return expiryDate <= sixMonthsFromNow;
  };

  return (
    <div className="w-full max-h-[90vh] overflow-y-auto lg:px-5 px-1">
      <div className="mb-5 space-y-2 flex flex-row w-full">
        <div className="w-full flex flex-col">
          <Label className="text-lg font-semibold">Root Certificates</Label>
          <h3 className="text-sm font-medium text-[#545454]">Trusted CA cert for secure AWS IoT connections.</h3>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button>Add</Button>
          </DialogTrigger>
          <DialogContent className="min-w-sm lg:min-w-[540px] flex flex-col gap-1">
            <DialogHeader className="font-semibold">Root Certificate</DialogHeader>
            <DialogDescription>Add and save root certificate from AWS IoT Core. Input its metadata</DialogDescription>
            <AddRootCertificate />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mx-auto">
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Certificates</p>
                  <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
                </div>
                <Key className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active</p>
                  <p className="text-2xl font-bold text-green-600">{certificates.filter((c) => c.isActive).length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Inactive</p>
                  <p className="text-2xl font-bold text-gray-600">{certificates.filter((c) => !c.isActive).length}</p>
                </div>
                <ShieldAlert className="w-8 h-8 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Root Certificates</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {certificates.map((cert) => (
              <div key={cert.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-lg ${cert.isActive ? "bg-green-100" : "bg-gray-100"}`}>
                      {cert.isActive ? (
                        <Shield className="w-6 h-6 text-green-600" />
                      ) : (
                        <ShieldAlert className="w-6 h-6 text-gray-500" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm font-medium text-gray-900">{cert.name}</h3>
                        <span
                          className={`px-3 rounded-full text-xs font-medium ${
                            cert.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {cert.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Created:</span> {formatDate(cert.createdAt)}
                        </p>
                        <div>
                          <div className="flex items-center gap-2">
                            <GitCompareArrows className="w-4 h-4" />
                            <span className="font-medium">Version:</span> {cert.version}
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            <span className="font-medium">Region:</span> {cert.region}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      onClick={() => toggleCertificateStatus(cert.id)}
                      variant="outline"
                      size="sm"
                      className={
                        cert.isActive
                          ? "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                          : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                      }
                    >
                      {cert.isActive ? "Deactivate" : "Activate"}
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
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
                              <AlertDialogTitle>Delete Certificate</AlertDialogTitle>
                              <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
                            </div>
                          </div>
                        </AlertDialogHeader>

                        <Alert className="my-4">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            Deleting this root certificate will affect all devices and connections that depend on it.
                            Make sure no active IoT devices are using this certificate for authentication.
                          </AlertDescription>
                        </Alert>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteCertificate(cert.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete Certificate
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
