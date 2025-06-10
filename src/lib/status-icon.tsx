import { Station } from "@/types/station";
import { AlertTriangle, Clock, Wifi, WifiOff } from "lucide-react";

export const getStatusIcon = (status: Station["status"]) => {
  switch (status) {
    case "connected":
      return <Wifi className="w-5 h-5 text-green-600" />;
    case "disconnected":
      return <WifiOff className="w-5 h-5 text-gray-500" />;
    case "error":
      return <AlertTriangle className="w-5 h-5 text-red-600" />;
    case "pending":
      return <Clock className="w-5 h-5 text-yellow-600" />;
  }
};
