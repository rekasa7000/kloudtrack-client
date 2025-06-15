import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode?: number;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    if (response.data && typeof response.data === "object" && "success" in response.data) {
      return {
        ...response,
        fullResponse: response.data,
        data: response.data.data,
        message: response.data.message,
        success: response.data.success,
      };
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized. You might need to log in again.");
    }
    if (error.response?.data && typeof error.response.data === "object") {
      const errorData = error.response.data;
      const enhancedError = {
        ...error,
        message: errorData.message || error.message || "An error occurred",
        success: errorData.success || false,
        statusCode: error.response.status,
        data: errorData.data || null,
      };
      return Promise.reject(enhancedError);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
