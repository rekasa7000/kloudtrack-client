import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { checkAuthService } from "@/api/services/authServices";
import { User } from "@/api/client/types";

export interface AuthContext {
  isAuthenticated: boolean;
  user: User | undefined;
  isLoading: boolean;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: checkAuthService,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const isAuthenticated = !!user;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return <AuthContext.Provider value={{ isAuthenticated, user, isLoading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
