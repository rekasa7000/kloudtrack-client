export interface StationListProps {
  stations: Station[];
  onStationSelect?: (station: Station) => void;
  onStationEdit?: (station: Station) => void;
  onStationDelete?: (stationId: string) => void;
  onCertificateView?: (certificate: StationCertificate, type: "certificate" | "privateKey") => void;
}

export interface Station {
  id: string;
  name: string;
  type?: string;
  status: "connected" | "disconnected" | "error" | "pending";
  location?: string;
  elevation?: string;
  lastSeen?: Date;
  deviceCertificate?: StationCertificate;
  privateKey?: StationCertificate;
  certificate: Certificate;
  createdAt: Date;
}

interface Certificate {
  certificateId?: string;
  certificateArn?: string;
  subject?: string;
  issuer?: string;
  status: string;
  fingerprint?: string;
  validSince: string;
  expiresAt: Date;
  createdAt: Date;
}
