import {
  Monitor,
  Wifi,
  MoreVertical,
  MapPin,
  AlertTriangle,
  Calendar,
  Divide,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const DeviceList = () => {
  const [showDetails, setShowDetails] = useState(false);

  const expirationDate = new Date("2025-07-10T03:35:00");
  const today = new Date();
  const daysUntilExpiration = Math.ceil(
    (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isExpiringSoon = daysUntilExpiration <= 30;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className=" rounded-xl p-6 border border-muted hover:border-gray-300 transition-all duration-200 max-w-md">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Monitor className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className=" font-semibold text-lg">Windows PC</h3>
              <span className="text-gray-700 text-sm">(Chrome)</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <Wifi className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <MapPin className="w-4 h-4 text-red-500" />
          <span className="text-gray-600 text-sm">
            Angeles City, Central Luzon PH
          </span>
        </div>

        <div
          className={`flex items-center space-x-2 p-3 rounded-lg mb-4 ${
            isExpiringSoon
              ? "bg-amber-500/10 border border-amber-500/20"
              : "bg-gray-800/50"
          }`}
        >
          {isExpiringSoon && (
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          )}
          <Calendar className="w-4 h-4 text-gray-400" />
          <div className="flex-1">
            <span
              className={`text-sm font-medium ${isExpiringSoon ? "text-amber-400" : "text-gray-300"}`}
            >
              {daysUntilExpiration > 0
                ? `Expires in ${daysUntilExpiration} days`
                : "Expired"}
            </span>
            <p className="text-xs text-gray-500">July 10, 2025 at 3:35 AM</p>
          </div>
        </div>

        <Button
          onClick={() => setShowDetails(!showDetails)}
          className="w-fit text-left  text-sm text-gray-700 inline-flex items-center transition-all ease-in-out  mb-3"
          variant={"ghost"}
        >
          {showDetails ? <ChevronDown /> : <ChevronRight />} Technical Details
        </Button>

        {showDetails && (
          <div className="bg-white  rounded-lg border border-muted p-3 mb-4 text-sm text-gray-600 space-y-1">
            <div>Coordinates: 15.1500, 120.5833</div>
            <div>Session ID: chr-session-2009</div>
            <div>Last Active: 2 hours ago</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceList;
