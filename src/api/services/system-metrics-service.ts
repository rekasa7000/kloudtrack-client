import axiosInstance from "../client/axiosInstance";

export const fetchCurrentMetrics = async () => {
  const response = await axiosInstance.get("health/current");
  return response.data;
};

export const fetchHistoricalMetrics = async () => {
  const response = await axiosInstance.get("health/history");
  return response.data;
};
