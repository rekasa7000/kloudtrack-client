import React, { useState, useRef } from "react";
import { Upload, FileText, Key, CheckCircle, AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CertificateFile, DeviceCertificateUploaderProps } from "@/types/certificate";

const DeviceCertificateUploader: React.FC<DeviceCertificateUploaderProps> = ({
  onPrivateKeyUpload,
  onCertificateUpload,
}) => {
  const [privateKey, setPrivateKey] = useState<CertificateFile | null>(null);
  const [certificate, setCertificate] = useState<CertificateFile | null>(null);
  const [errors, setErrors] = useState<{ privateKey?: string; certificate?: string }>({});
  const [dragStates, setDragStates] = useState<{ privateKey: boolean; certificate: boolean }>({
    privateKey: false,
    certificate: false,
  });

  const privateKeyInputRef = useRef<HTMLInputElement>(null);
  const certificateInputRef = useRef<HTMLInputElement>(null);

  const validatePrivateKey = (content: string): boolean => {
    return (
      content.includes("-----BEGIN PRIVATE KEY-----") ||
      content.includes("-----BEGIN RSA PRIVATE KEY-----") ||
      content.includes("-----BEGIN EC PRIVATE KEY-----")
    );
  };

  const validateCertificate = (content: string): boolean => {
    return content.includes("-----BEGIN CERTIFICATE-----") && content.includes("-----END CERTIFICATE-----");
  };

  const handleFileUpload = async (file: File, type: "privateKey" | "certificate") => {
    const newErrors = { ...errors };
    delete newErrors[type];
    setErrors(newErrors);

    const maxSize = type === "privateKey" ? 5 * 1024 : 10 * 1024;
    const expectedExtensions = type === "privateKey" ? /\.(pem|key)$/i : /\.(pem|crt|cer)$/i;

    if (!file.name.match(expectedExtensions)) {
      const expectedFormats = type === "privateKey" ? ".pem, .key" : ".pem, .crt, .cer";
      setErrors((prev) => ({
        ...prev,
        [type]: `Please upload a valid ${type === "privateKey" ? "private key" : "certificate"} file (${expectedFormats})`,
      }));
      return;
    }

    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        [type]: `File is too large. Maximum size is ${maxSize / 1024}KB.`,
      }));
      return;
    }

    try {
      const content = await file.text();
      const validator = type === "privateKey" ? validatePrivateKey : validateCertificate;

      if (!validator(content)) {
        setErrors((prev) => ({
          ...prev,
          [type]: `Invalid ${type === "privateKey" ? "private key" : "certificate"} format.`,
        }));
        return;
      }

      const certFile: CertificateFile = {
        name: file.name,
        content,
        size: file.size,
        type: file.type,
      };

      if (type === "privateKey") {
        setPrivateKey(certFile);
        onPrivateKeyUpload?.(certFile);
      } else {
        setCertificate(certFile);
        onCertificateUpload?.(certFile);
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        [type]: `Failed to read ${type === "privateKey" ? "private key" : "certificate"} file. Please try again.`,
      }));
    }
  };

  const handleDrop = (e: React.DragEvent, type: "privateKey" | "certificate") => {
    e.preventDefault();
    setDragStates((prev) => ({ ...prev, [type]: false }));
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0], type);
    }
  };

  const removeFile = (type: "privateKey" | "certificate") => {
    if (type === "privateKey") {
      setPrivateKey(null);
      if (privateKeyInputRef.current) privateKeyInputRef.current.value = "";
    } else {
      setCertificate(null);
      if (certificateInputRef.current) certificateInputRef.current.value = "";
    }

    const newErrors = { ...errors };
    delete newErrors[type];
    setErrors(newErrors);
  };

  const renderUploadArea = (
    type: "privateKey" | "certificate",
    file: CertificateFile | null,
    icon: React.ReactNode,
    title: string,
    description: string,
    formats: string,
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium flex items-center gap-2 mb-1">
          {icon}
          {title}
        </h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors aspect-[10/4] ${
            dragStates[type] ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDrop={(e) => handleDrop(e, type)}
          onDragOver={(e) => {
            e.preventDefault();
            setDragStates((prev) => ({ ...prev, [type]: true }));
          }}
          onDragLeave={() => setDragStates((prev) => ({ ...prev, [type]: false }))}
        >
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">
            Drop your {type === "privateKey" ? "private key" : "certificate"} here, or{" "}
            <button onClick={() => inputRef.current?.click()} className="text-blue-600 hover:text-blue-700 font-medium">
              browse
            </button>
          </p>
          <p className="text-xs text-gray-500">{formats}</p>
        </div>
      ) : (
        <div className="border rounded-lg p-3 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">{file.name}</p>
                <p className="text-xs text-green-600">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button
              onClick={() => removeFile(type)}
              className="text-gray-400 hover:text-gray-600 p-1"
              title={`Remove ${type === "privateKey" ? "private key" : "certificate"}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={type === "privateKey" ? ".pem,.key" : ".pem,.crt,.cer"}
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            handleFileUpload(files[0], type);
          }
        }}
        className="hidden"
      />

      {errors[type] && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-700">{errors[type]}</AlertDescription>
        </Alert>
      )}
    </div>
  );

  return (
    <div className="w-full  mx-auto">
      <div className="grid gap-1 md:grid-rows-2">
        {renderUploadArea(
          "privateKey",
          privateKey,
          <Key className="w-4 h-4 text-red-600" />,
          "Private Key",
          "Your device's private key file",
          "Formats: .pem, .key (Max 5KB)",
          privateKeyInputRef
        )}

        {renderUploadArea(
          "certificate",
          certificate,
          <FileText className="w-4 h-4 text-blue-600" />,
          "Device Certificate",
          "Your device's certificate file",
          "Formats: .pem, .crt, .cer (Max 10KB)",
          certificateInputRef
        )}
      </div>

      {privateKey && certificate && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Both certificates uploaded successfully!</span>
          </div>
          <p className="text-sm text-green-700 mt-1">Your device is ready to connect to AWS IoT Core.</p>
        </div>
      )}
    </div>
  );
};

export default DeviceCertificateUploader;
