import axiosInstance from "../client/axiosInstance";
import { Login, LoginResponse, User } from "../client/types";

export const loginService = async (user: Login): Promise<LoginResponse> => {
  const response = await axiosInstance.post("auth/login", user);
  return response.data;
};

export const checkAuthService = async (): Promise<User> => {
  const response = await axiosInstance.get("auth/check-auth");
  return response.data;
};

export const logoutService = async (): Promise<void> => {
  const response = await axiosInstance.post("auth/logout");
  return response.data;
};
