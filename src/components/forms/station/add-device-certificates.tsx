import DeviceCertificateUploader from "@/components/certificates/device-certificate-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CertificateFile } from "@/types/certificate";
import { FieldInfo } from "@/utils/field-info";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

const AddDeviceCertificates = ({ stationID }: { stationID: number }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const route = useRouter();

  const form = useForm({
    defaultValues: {
      subject: "",
      issuer: "",
      version: "CA1",
      validUntil: "",
      expiresAt: "",
      certificateId: "",
      certificateArn: "",
      region: "",
      certificate: null as CertificateFile | null,
      privateKey: null as CertificateFile | null,
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted with values:", value);

      if (!value.certificate) {
        setUploadError("Please upload a root certificate");
        return;
      }
      if (!value.privateKey) {
        setUploadError("Please upload a root certificate");
        return;
      }

      setIsUploading(true);
      setUploadError(null);

      const formData = new FormData();

      const certificateBlob = new Blob([value.certificate.content], {
        type: "application/x-pem-file",
      });
      const certificateFile = new File(
        [certificateBlob],
        value.certificate.name,
        {
          type: "application/x-pem-file",
          lastModified: Date.now(),
        }
      );

      const privateKeyBlob = new Blob([value.privateKey.content], {
        type: "application/x-pem-file",
      });
      const privateKeyFile = new File(
        [privateKeyBlob],
        value.certificate.name,
        {
          type: "application/x-pem-file",
          lastModified: Date.now(),
        }
      );

      formData.append("cert-file", certificateFile);
      formData.append("key-file", privateKeyFile);
      formData.append("version", value.version);
      formData.append("certificateId", value.certificateId);
      formData.append("certificateArn", value.certificateArn);
      formData.append("subject", value.subject);
      formData.append("issuer", value.issuer);
      formData.append("validUntil", value.validUntil);
      formData.append("expiresAt", value.expiresAt);
      formData.append("region", value.region);

      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
    },
  });

  const handleCertificateUpload = (cert: CertificateFile) => {
    form.setFieldValue("certificate", cert);
    setUploadError(null);
    console.log("Device Certificate uploaded:", cert.name);
  };

  const handlePrivateKeyUpload = (privateKey: CertificateFile) => {
    form.setFieldValue("privateKey", privateKey);
    setUploadError(null);
    console.log("Device Private Key uploaded:", privateKey.name);
  };

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="bg-white flex flex-col lg:flex-row gap-5 rounded-lg space-y-4 py-1">
        <div className="w-full flex flex-col space-y-2">
          <form.Field
            name="certificateId"
            children={(field) => (
              <div>
                <Label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Certificate ID
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  placeholder="Input aws thing certificate id"
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          />
          <form.Field
            name="certificateArn"
            children={(field) => (
              <div>
                <Label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Certificate ARN
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  placeholder="Input aws thing certificate arn"
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          />
          <form.Field
            name="version"
            children={(field) => (
              <div>
                <Label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Certificate Version
                </Label>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger className="w-full px-3 py-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400">
                    <SelectValue placeholder="Select AWS Root Certificate Version" />
                  </SelectTrigger>
                  <SelectContent className="w-full py-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400">
                    <SelectItem value="CA1">CA1</SelectItem>
                    <SelectItem value="CA2">CA2</SelectItem>
                    <SelectItem value="CA3">CA3</SelectItem>
                    <SelectItem value="CA4">CA4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          <form.Field
            name="region"
            children={(field) => (
              <div>
                <Label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Region
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  placeholder="Input aws thing certificate validity until"
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          />
          <form.Field
            name="subject"
            children={(field) => (
              <div>
                <Label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  placeholder="Input aws thing certificate subject"
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          />

          <form.Field
            name="issuer"
            children={(field) => (
              <div>
                <Label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Issuer
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  placeholder="Input aws thing certificate issuer"
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          />
          <form.Field
            name="validUntil"
            children={(field) => (
              <div>
                <Label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Valid Until
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  placeholder="Input aws thing certificate validity until"
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          />
          <form.Field
            name="expiresAt"
            children={(field) => (
              <div>
                <Label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Expires
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  placeholder="Input aws thing certificate expiration"
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          />
        </div>
        <div className="w-full">
          <form.Field
            name="certificate"
            validators={{
              onChange: ({ value }) => {
                if (!value) {
                  return "Root certificate is required";
                }
                return undefined;
              },
            }}
            children={(field) => (
              <div>
                <DeviceCertificateUploader
                  onCertificateUpload={handleCertificateUpload}
                  onPrivateKeyUpload={handlePrivateKeyUpload}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
        </div>
        {uploadError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="text-sm text-red-700">{uploadError}</div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-end gap-2">
        <Button
          onClick={() => {
            route.history.back();
          }}
          className="w-fit py-6 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isUploading}
          className={`w-fit py-6 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isUploading
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload Certificate"}
        </Button>
      </div>
    </form>
  );
};

export default AddDeviceCertificates;
