import { Station } from "@/types/station";
import { CheckCircle, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getStatusIcon } from "@/lib/status-icon";
import { formatDate, getStatusColor } from "@/lib/utils";

interface StationDetailsProps {
  station: Station;
}

const StationDetails = ({ station }: StationDetailsProps) => {
  return (
    <div className="flex flex-row gap-6 h-full">
      <div className="space-y-4 w-full">
        <h4 className="font-medium text-gray-900">Basic Information</h4>
        <div className="space-y-2 text-sm">
          <div className="flex gap-3 w-full justify-start">
            <Avatar className="size-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{station.name}</span>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  {getStatusIcon(station.status)}
                  <span
                    className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(station.status)}`}
                  >
                    {station.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium">{station.location || "Not set"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Address:</span>
            <span className="font-medium">{station.location || "Not set"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Created:</span>
            <span className="font-medium">{formatDate(station.createdAt)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">City:</span>
            <span className="font-medium">{station.location || "Not set"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">State:</span>
            <span className="font-medium">{station.location || "Not set"}</span>
          </div>
          {station.elevation && (
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">
                {station.location || "Not set"}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Country:</span>
            <span className="font-medium">{station.location || "Not set"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Seen:</span>
            <span className="font-medium">
              {station.lastSeen ? formatDate(station.lastSeen) : "Never"}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-2 text-sm w-full">
        <h4 className="font-medium text-gray-900">Certificate Details:</h4>
        <div className="flex justify-between">
          <span className="text-gray-600">Certificate ARN:</span>
          <span className="font-medium">
            {station.certificate.certificateArn || "Not set"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Certificate ID:</span>
          <span className="font-medium">
            {station.certificate.certificateId || "Not set"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Subject:</span>
          <span className="font-medium">
            {station.certificate.subject || "Not set"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Isuser:</span>
          <span className="font-medium">
            {station.certificate.issuer || "Not set"}
          </span>
        </div>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">Device Certificate</span>
              {station.deviceCertificate ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
            {station.deviceCertificate ? (
              <div className="text-xs text-gray-600">
                <p>{station.deviceCertificate.name}</p>
                <p>
                  Uploaded: {formatDate(station.deviceCertificate.uploadedAt)}
                </p>
                <p>Uploaded: {formatDate(station.certificate.expiresAt)}</p>
              </div>
            ) : (
              <p className="text-xs text-red-600">No certificate uploaded</p>
            )}
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">Private Key</span>
              {station.privateKey ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
            {station.privateKey ? (
              <div className="text-xs text-gray-600">
                <p>{station.privateKey.name}</p>
                <p>Uploaded: {formatDate(station.privateKey.uploadedAt)}</p>
                <p>Uploaded: {formatDate(station.certificate.expiresAt)}</p>
              </div>
            ) : (
              <p className="text-xs text-red-600">No private key uploaded</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationDetails;
