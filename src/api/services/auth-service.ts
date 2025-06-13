import axiosInstance from "../client/axiosInstance";
import { Login, LoginResponse, User } from "../client/types";

export const loginService = async (user: Login): Promise<LoginResponse> => {
  const response = await axiosInstance.post("auth/login", user);
  console.log(response.data);
  return response.data;

  return {
    email: "superadmin@example.com",
    id: 1,
    role: "SUPERADMIN",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5NTIwNjU4LCJleHAiOjE3NTAxMjU0NTh9.1uURvAdZQnsNiLzC0v4oRccZkdiyK1doesi1Ej5X9Gw",
    userName: "superadmin",
  };
};

export const checkAuthService = async (): Promise<User> => {
  const response = await axiosInstance.get("auth/check-auth");
  return response.data;
  return {
    createdAt: new Date("2025-05-27T05:59:08.489Z"),
    email: "superadmin@example.com",
    id: 1,
    role: "SUPERADMIN",
    updatedAt: new Date("2025-05-27T05:59:08.490Z"),
    userName: "superadmin",
  };
};

export const logoutService = async (): Promise<void> => {
  const response = await axiosInstance.post("auth/logout");
  console.log(response.data);
  return response.data;
};
