import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert, Key, CheckCircle } from "lucide-react";
import { Certificate } from "@/types/certificate";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import RootCertificateTable from "@/components/certificates/root-certificates-table";

export const Route = createFileRoute("/_root/_superadmin/stations/root-certificate")({
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

  return (
    <div className="w-full flex flex-col h-full">
      <div className="mb-2 space-y-2 flex flex-row w-full">
        <div className="w-full flex flex-col">
          <Label className="text-xl font-semibold">Root Certificates</Label>
          <h3 className="text-sm font-medium">Trusted CA cert for secure AWS IoT connections.</h3>
        </div>
        <div>
          <Button variant={"outline"}>Add Root Certificate</Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 h-full">
        <div className="flex flex-col gap-4 w-1/3">
          <div className="rounded-xl p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Total Certificates</p>
                <p className="text-2xl font-bold ">{certificates.length}</p>
              </div>
              <Key className="w-8 h-8 " />
            </div>
          </div>
          <div className="rounded-xl p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Active</p>
                <p className="text-2xl font-bold">{certificates.filter((c) => c.isActive).length}</p>
              </div>
              <CheckCircle className="w-8 h-8" />
            </div>
          </div>
          <div className="rounded-xl p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Inactive</p>
                <p className="text-2xl font-bold">{certificates.filter((c) => !c.isActive).length}</p>
              </div>
              <ShieldAlert className="w-8 h-8" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 rounded-lg border min-h-0 w-full">
          <div className="h-full overflow-y-auto">
            <RootCertificateTable
              rootCertificate={certificates}
              onToggleStatus={toggleCertificateStatus}
              onDelete={deleteCertificate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
