export interface CertificateFile {
  name: string;
  content: string;
  size: number;
  type: string;
}

export interface RootCertificateUploaderProps {
  onCertificateUpload?: (certificate: CertificateFile) => void;
}

export interface DeviceCertificateUploaderProps {
  onPrivateKeyUpload?: (privateKey: CertificateFile) => void;
  onCertificateUpload?: (certificate: CertificateFile) => void;
}

export interface StationCertificate {
  id: string;
  name: string;
  content: string;
  size: number;
  uploadedAt: Date;
  expiresAt?: Date;
  fingerprint?: string;
}

interface Certificate {
  id: string;
  name: string;
  subject: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  serialNumber: string;
  thumbprint: string;
  isActive: boolean;
  region: string;
  createdAt: string;
}
