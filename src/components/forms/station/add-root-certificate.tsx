import RootCertificateUploader from "@/components/certificates/root-certificate-upload";
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
import { useState } from "react";

const AddRootCertificate = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      version: "CA1",
      region: "",

      rootCertificate: null as CertificateFile | null,
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted with values:", value);

      if (!value.rootCertificate) {
        setUploadError("Please upload a root certificate");
        return;
      }

      setIsUploading(true);
      setUploadError(null);

      const formData = new FormData();

      const blob = new Blob([value.rootCertificate.content], {
        type: "application/x-pem-file",
      });
      const file = new File([blob], value.rootCertificate.name, {
        type: "application/x-pem-file",
        lastModified: Date.now(),
      });

      formData.append("root-ca-file", file);
      formData.append("version", value.version);
      formData.append("region", value.region);

      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
    },
  });

  const handleRootCertUpload = (cert: CertificateFile) => {
    form.setFieldValue("rootCertificate", cert);
    setUploadError(null);
    console.log("Root Certificate uploaded:", cert.name);
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
      <div className="flex flex-col gap-2 rounded-lg  space-y-4 ">
        <div className="w-full flex flex-col space-y-2">
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
                  <SelectTrigger className="py-6">
                    <SelectValue placeholder="Select AWS Root Certificate Version" />
                  </SelectTrigger>
                  <SelectContent className="w-full  py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
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
        </div>
        <div className="w-full">
          <form.Field
            name="rootCertificate"
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
                <RootCertificateUploader
                  onCertificateUpload={handleRootCertUpload}
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
      <div className="w-full flex justify-end mt-3">
        <Button
          type="submit"
          disabled={isUploading}
          className={`w-fit py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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

export default AddRootCertificate;
