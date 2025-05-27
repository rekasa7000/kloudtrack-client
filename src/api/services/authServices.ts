import { apiClient } from "../client/apiClient";
import { Login, LoginResponse } from "../client/types";

export const authService = {
  login: (loginData: Login) => apiClient.post<LoginResponse>(`/auth/login`, loginData),
};
