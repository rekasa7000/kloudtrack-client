export interface Station {
  id: string;
  name: string;
  description?: string;
  status: "connected" | "disconnected" | "error" | "pending";
  location?: string;
  lastSeen?: Date;
  deviceCertificate?: StationCertificate;
  privateKey?: StationCertificate;
  createdAt: Date;
  updatedAt: Date;
}

export interface StationListProps {
  stations: Station[];
  onStationSelect?: (station: Station) => void;
  onStationEdit?: (station: Station) => void;
  onStationDelete?: (stationId: string) => void;
  onCertificateView?: (certificate: StationCertificate, type: "certificate" | "privateKey") => void;
}

interface Station {
  id: string;
  name: string;
  description?: string;
  status: "connected" | "disconnected" | "error" | "pending";
  location?: string;
  lastSeen?: Date;
  deviceCertificate?: StationCertificate;
  privateKey?: StationCertificate;
  createdAt: Date;
  updatedAt: Date;
}
