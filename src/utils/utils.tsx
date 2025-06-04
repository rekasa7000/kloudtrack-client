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

export const getStatusColor = (status: Station["status"]) => {
  switch (status) {
    case "connected":
      return "bg-green-100 text-green-800 border-green-200";
    case "disconnected":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "error":
      return "bg-red-100 text-red-800 border-red-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
  }
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};
