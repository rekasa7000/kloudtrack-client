import axiosInstance from "../client/axiosInstance";
import { Login, LoginResponse, User } from "../client/types";

export const loginService = async (user: Login): Promise<LoginResponse> => {
  const response = await axiosInstance.post("auth/login", user);
  const data = response.data;
  return data;
};

export const checkAuthService = async (): Promise<User> => {
  const response = await axiosInstance.get("auth/check-auth");
  const data = response.data;
  return data;
};

export const logoutService = async (): Promise<void> => {
  const response = await axiosInstance.post("auth/logout");
  const data = response.data;
  return data;
};
