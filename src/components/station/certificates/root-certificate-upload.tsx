import React, { useState, useRef } from "react";
import { Upload, CheckCircle, AlertCircle, X, Key } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CertificateFile, RootCertificateUploaderProps } from "@/types/certificate";

const RootCertificateUploader: React.FC<RootCertificateUploaderProps> = ({ onCertificateUpload }) => {
  const [certificate, setCertificate] = useState<CertificateFile | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateRootCertificate = (content: string): boolean => {
    return (
      content.includes("-----BEGIN CERTIFICATE-----") &&
      content.includes("-----END CERTIFICATE-----") &&
      (content.includes("Amazon") || content.includes("VeriSign") || content.includes("Root CA"))
    );
  };

  const handleFileUpload = async (file: File) => {
    setError(null);

    if (!file.name.match(/\.(pem|crt|cer)$/i)) {
      setError("Please upload a valid certificate file (.pem, .crt, or .cer)");
      return;
    }

    if (file.size > 10 * 1024) {
      setError("Certificate file is too large. Maximum size is 10KB.");
      return;
    }

    try {
      const content = await file.text();

      if (!validateRootCertificate(content)) {
        setError("Invalid root certificate format. Please ensure this is an Amazon Root CA certificate.");
        return;
      }

      const certFile: CertificateFile = {
        name: file.name,
        content,
        size: file.size,
        type: file.type,
      };

      setCertificate(certFile);
      onCertificateUpload?.(certFile);
    } catch (err) {
      setError("Failed to read certificate file. Please try again.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const removeCertificate = () => {
    setCertificate(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
          <Key className="w-5 h-5 text-main" />
          Amazon Root CA Certificate
        </h3>
        <p className="text-sm text-gray-600">Upload the Amazon Root CA certificate for AWS IoT Core authentication.</p>
      </div>

      {!certificate ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors h-83 flex flex-col items-center justify-center ${
            isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
        >
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop your Root CA certificate here, or{" "}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              browse files
            </button>
          </p>
          <p className="text-xs text-gray-500">Supported formats: .pem, .crt, .cer (Max 10KB)</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pem,.crt,.cer"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="rounded-lg p-4 bg-green-50">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">{certificate.name}</p>
                <p className="text-sm text-green-600">
                  {(certificate.size / 1024).toFixed(1)} KB • Root CA Certificate
                </p>
              </div>
            </div>
            <button
              onClick={removeCertificate}
              className="text-gray-400 hover:text-gray-600 p-1"
              title="Remove certificate"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {error && (
        <Alert className="mt-4 border-red-200 bg-red-50">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default RootCertificateUploader;
