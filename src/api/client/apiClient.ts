import axiosInstance from "@/api/client/axiosInstance";
import { AxiosError, AxiosRequestConfig } from "axios";

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: ErrorResponse
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const apiClient = {
  async request<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response = await axiosInstance(url, config);
      const data: ApiResponse<T> = response.data;

      if (data.success === false) {
        throw new ApiError(data.error, response.status, data);
      }

      return data.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof AxiosError) {
        const statusCode = error.response?.status || 0;
        const responseData = error.response?.data;

        if (
          responseData &&
          typeof responseData === "object" &&
          "success" in responseData &&
          responseData.success === false
        ) {
          throw new ApiError(responseData.error || error.message, statusCode, responseData);
        }

        const errorMsg = error.response?.data?.message || error.message || "Network error occurred";
        throw new ApiError(errorMsg, statusCode);
      }

      throw new ApiError(error instanceof Error ? error.message : "Unknown error occurred", 0);
    }
  },
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: "GET" });
  },

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: "POST", data });
  },

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: "PUT", data });
  },

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: "DELETE" });
  },

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: "PATCH", data });
  },
};
