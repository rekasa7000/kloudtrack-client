import * as React from "react";
import { User, Login, LoginResponse } from "@/api/client/types";
import { Loader2 } from "lucide-react";
import { checkAuth } from "@/hooks/queries/auth-queries";
import { useLoginMutation, useLogoutMutation } from "./mutations/auth-mutations";

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
  const { data: user, isLoading } = checkAuth();
  const isAuthenticated = !!user;

  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  const login = async (credentials: Login): Promise<LoginResponse> => {
    return loginMutation.mutateAsync(credentials);
  };

  const logout = async (): Promise<void> => {
    return logoutMutation.mutateAsync();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin" />
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
