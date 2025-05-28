import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { checkAuthService, loginService, logoutService } from "@/api/services/authServices";
import { User, Login, LoginResponse } from "@/api/client/types";
import { toast } from "sonner";

export interface AuthContext {
  isAuthenticated: boolean;
  user: User | undefined;
  isLoading: boolean;
  login: (credentials: Login) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  isLoginLoading: boolean;
  isLogoutLoading: boolean;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: checkAuthService,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const isAuthenticated = !!user;

  const loginMutation = useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      if (data.id) {
        queryClient.setQueryData(["auth", "user"], data);
      }
      toast.success("Login Success", {
        description: `Welcome! ${data.userName}`,
        position: "top-right",
        duration: 5000,
        style: { backgroundColor: "green" },
        closeButton: true,
      });
    },
    onError: (error: any) => {
      toast.error("Login Error", {
        description: error.message,
        position: "top-right",
        duration: 5000,
        style: { backgroundColor: "red" },
        closeButton: true,
      });
      console.error("Login failed:", error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      toast.success("Logged out", {
        description: "Logout Successful!",
        position: "top-right",
        duration: 5000,
        style: { backgroundColor: "green" },
        closeButton: true,
      });
      queryClient.setQueryData(["auth", "user"], null);
      queryClient.removeQueries({ queryKey: ["auth", "user"] });
    },
    onError: (error: any) => {
      toast.error("Logout Error", {
        description: error.message,
        position: "top-right",
        duration: 5000,
        style: { backgroundColor: "red" },
        closeButton: true,
      });
      console.error("Logout failed:", error);
      queryClient.setQueryData(["auth", "user"], null);
      queryClient.removeQueries({ queryKey: ["auth", "user"] });
    },
  });

  const login = async (credentials: Login): Promise<LoginResponse> => {
    return loginMutation.mutateAsync(credentials);
  };

  const logout = async (): Promise<void> => {
    return logoutMutation.mutateAsync();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        login,
        logout,
        isLoginLoading: loginMutation.isPending,
        isLogoutLoading: logoutMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
