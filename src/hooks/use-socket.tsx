import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

// Types based on your backend events
interface TelemetryData {
  stationId: number;
  temperature: number;
  humidity: number;
  pressure: number;
  heatIndex: number;
  windDirection: number;
  windSpeed: number;
  precipitation: number;
  uvIndex: number;
  distance: number;
  lightIntensity: number;
  recordedAt: string;
}

interface StationStatus {
  stationId: number;
  status: string;
  lastSeen: string;
  isOnline: boolean;
}

interface CommandData {
  stationId: number;
  command: string;
  parameters?: any;
}

interface NotificationData {
  id: number;
  message: string;
  type: "info" | "warning" | "error" | "success";
  timestamp: string;
  read: boolean;
}

interface UseSocketIOOptions {
  url: string;
  auth?: {
    token: string;
    userId?: number;
    organizationId?: number;
    userRole?: string;
  };
  autoConnect?: boolean;
  reconnection?: boolean;
  reconnectionDelay?: number;
  reconnectionAttempts?: number;
}

interface UseSocketIOReturn {
  socket: Socket | null;
  isConnected: boolean;
  connectionStatus: "connecting" | "connected" | "disconnected" | "error";
  // Station management
  subscribeToStation: (stationId: number) => void;
  unsubscribeFromStation: (stationId: number) => void;
  subscribeToOrganization: () => void;
  getStationSummary: (stationId: number, hours?: number) => void;
  // Commands
  sendCommand: (stationId: number, command: string, parameters?: any) => void;
  getCommandStatus: (commandId: number) => void;
  cancelCommand: (commandId: number) => void;
  retryCommand: (commandId: number) => void;
  getPendingCommands: (stationId: number) => void;
  // Notifications
  markNotificationRead: (notificationId: number) => void;
  getUnreadCount: () => void;
  getNotifications: (limit?: number, offset?: number) => void;
  // Presence
  updateStatus: (status: string) => void;
  sendHeartbeat: () => void;
  // Event listeners
  onTelemetryData: (callback: (data: TelemetryData) => void) => () => void;
  onStationStatus: (callback: (status: StationStatus) => void) => () => void;
  onCommandSent: (callback: (data: any) => void) => () => void;
  onCommandExecuted: (callback: (data: any) => void) => () => void;
  onNotification: (callback: (notification: NotificationData) => void) => () => void;
  onStationAlert: (callback: (alert: any) => void) => () => void;
  // Error handling
  onError: (callback: (error: any) => void) => () => void;
}

export const useSocketIO = (options: UseSocketIOOptions): UseSocketIOReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected" | "error">(
    "disconnected"
  );

  const heartbeatInterval = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const eventListeners = useRef<Map<string, Set<Function>>>(new Map());

  // Initialize socket
  useEffect(() => {
    if (!options.autoConnect) return;

    const socketInstance = io(options.url, {
      auth: options.auth,
      autoConnect: options.autoConnect ?? true,
      reconnection: options.reconnection ?? true,
      reconnectionDelay: options.reconnectionDelay ?? 1000,
      reconnectionAttempts: options.reconnectionAttempts ?? 5,
    });

    setSocket(socketInstance);
    setConnectionStatus("connecting");

    // Connection events
    socketInstance.on("connect", () => {
      setIsConnected(true);
      setConnectionStatus("connected");

      // Start heartbeat
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
      }
      heartbeatInterval.current = setInterval(() => {
        socketInstance.emit("heartbeat");
      }, 30000); // Send heartbeat every 30 seconds
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
      setConnectionStatus("disconnected");

      // Clear heartbeat
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
      }
    });

    socketInstance.on("connect_error", (error) => {
      setConnectionStatus("error");
      console.error("Socket connection error:", error);
    });

    // Setup event listeners for backend events
    setupBackendEventListeners(socketInstance);

    return () => {
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      socketInstance.disconnect();
    };
  }, [options.url, options.auth?.token]);

  const setupBackendEventListeners = (socketInstance: Socket) => {
    // Subscription confirmations
    socketInstance.on("subscription_confirmed", (data) => {
      console.log("Subscription confirmed:", data);
    });

    socketInstance.on("subscription_error", (error) => {
      console.error("Subscription error:", error);
      triggerEventListeners("subscription_error", error);
    });

    // Data events
    socketInstance.on("station_status", (data) => {
      triggerEventListeners("station_status", data);
    });

    socketInstance.on("station_summary", (data) => {
      triggerEventListeners("station_summary", data);
    });

    // Command events
    socketInstance.on("command_sent", (data) => {
      triggerEventListeners("command_sent", data);
    });

    socketInstance.on("command_executed", (data) => {
      triggerEventListeners("command_executed", data);
    });

    socketInstance.on("command_cancelled", (data) => {
      triggerEventListeners("command_cancelled", data);
    });

    socketInstance.on("command_error", (error) => {
      triggerEventListeners("command_error", error);
    });

    socketInstance.on("pending_commands", (data) => {
      triggerEventListeners("pending_commands", data);
    });

    // Notification events
    socketInstance.on("notification_marked_read", (data) => {
      triggerEventListeners("notification_marked_read", data);
    });

    socketInstance.on("unread_count", (data) => {
      triggerEventListeners("unread_count", data);
    });

    socketInstance.on("notifications", (data) => {
      triggerEventListeners("notifications", data);
    });

    // Alert events
    socketInstance.on("station_alert", (alert) => {
      triggerEventListeners("station_alert", alert);
    });

    // Error events
    socketInstance.on("data_error", (error) => {
      triggerEventListeners("data_error", error);
    });

    socketInstance.on("notification_error", (error) => {
      triggerEventListeners("notification_error", error);
    });
  };

  const triggerEventListeners = (eventName: string, data: any) => {
    const listeners = eventListeners.current.get(eventName);
    if (listeners) {
      listeners.forEach((callback) => callback(data));
    }
  };

  const addEventListener = useCallback((eventName: string, callback: Function) => {
    if (!eventListeners.current.has(eventName)) {
      eventListeners.current.set(eventName, new Set());
    }
    eventListeners.current.get(eventName)!.add(callback);

    return () => {
      const listeners = eventListeners.current.get(eventName);
      if (listeners) {
        listeners.delete(callback);
      }
    };
  }, []);

  // Station management
  const subscribeToStation = useCallback(
    (stationId: number) => {
      socket?.emit("subscribe_station", stationId);
    },
    [socket]
  );

  const unsubscribeFromStation = useCallback(
    (stationId: number) => {
      socket?.emit("unsubscribe_station", stationId);
    },
    [socket]
  );

  const subscribeToOrganization = useCallback(() => {
    socket?.emit("subscribe_organization");
  }, [socket]);

  const getStationSummary = useCallback(
    (stationId: number, hours = 24) => {
      socket?.emit("get_station_summary", { stationId, hours });
    },
    [socket]
  );

  // Command
  const sendCommand = useCallback(
    (stationId: number, command: string, parameters?: any) => {
      socket?.emit("send_command", { stationId, command, parameters });
    },
    [socket]
  );

  const getCommandStatus = useCallback(
    (commandId: number) => {
      socket?.emit("get_command_status", commandId);
    },
    [socket]
  );

  const cancelCommand = useCallback(
    (commandId: number) => {
      socket?.emit("cancel_command", commandId);
    },
    [socket]
  );

  const retryCommand = useCallback(
    (commandId: number) => {
      socket?.emit("retry_command", commandId);
    },
    [socket]
  );

  const getPendingCommands = useCallback(
    (stationId: number) => {
      socket?.emit("get_pending_commands", stationId);
    },
    [socket]
  );

  // Notification
  const markNotificationRead = useCallback(
    (notificationId: number) => {
      socket?.emit("mark_notification_read", notificationId);
    },
    [socket]
  );

  const getUnreadCount = useCallback(() => {
    socket?.emit("get_unread_count");
  }, [socket]);

  const getNotifications = useCallback(
    (limit = 20, offset = 0) => {
      socket?.emit("get_notifications", { limit, offset });
    },
    [socket]
  );

  // Presence
  const updateStatus = useCallback(
    (status: string) => {
      socket?.emit("update_status", status);
    },
    [socket]
  );

  const sendHeartbeat = useCallback(() => {
    socket?.emit("heartbeat");
  }, [socket]);

  // Event listener
  const onTelemetryData = useCallback(
    (callback: (data: TelemetryData) => void) => {
      return addEventListener("telemetry_data", callback);
    },
    [addEventListener]
  );

  const onStationStatus = useCallback(
    (callback: (status: StationStatus) => void) => {
      return addEventListener("station_status", callback);
    },
    [addEventListener]
  );

  const onCommandSent = useCallback(
    (callback: (data: any) => void) => {
      return addEventListener("command_sent", callback);
    },
    [addEventListener]
  );

  const onCommandExecuted = useCallback(
    (callback: (data: any) => void) => {
      return addEventListener("command_executed", callback);
    },
    [addEventListener]
  );

  const onNotification = useCallback(
    (callback: (notification: NotificationData) => void) => {
      return addEventListener("notification", callback);
    },
    [addEventListener]
  );

  const onStationAlert = useCallback(
    (callback: (alert: any) => void) => {
      return addEventListener("station_alert", callback);
    },
    [addEventListener]
  );

  const onError = useCallback(
    (callback: (error: any) => void) => {
      return addEventListener("error", callback);
    },
    [addEventListener]
  );

  return {
    socket,
    isConnected,
    connectionStatus,
    subscribeToStation,
    unsubscribeFromStation,
    subscribeToOrganization,
    getStationSummary,
    sendCommand,
    getCommandStatus,
    cancelCommand,
    retryCommand,
    getPendingCommands,
    markNotificationRead,
    getUnreadCount,
    getNotifications,
    updateStatus,
    sendHeartbeat,
    onTelemetryData,
    onStationStatus,
    onCommandSent,
    onCommandExecuted,
    onNotification,
    onStationAlert,
    onError,
  };
};
