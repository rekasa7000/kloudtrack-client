import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginService, logoutService } from "@/api/services/auth-service";
import { toast } from "sonner";
import { AUTH_KEYS } from "../queries/query-keys";

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      if (data.id) {
        queryClient.setQueryData([AUTH_KEYS.CHECK_AUTH], data);
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
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      toast.success("Logged out", {
        description: "Logout Successful!",
        position: "top-right",
        duration: 5000,
        style: { backgroundColor: "green" },
        closeButton: true,
      });
      queryClient.setQueryData([AUTH_KEYS.CHECK_AUTH], null);
      queryClient.removeQueries({ queryKey: [AUTH_KEYS.CHECK_AUTH] });
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
      queryClient.setQueryData([AUTH_KEYS.CHECK_AUTH], null);
      queryClient.removeQueries({ queryKey: [AUTH_KEYS.CHECK_AUTH] });
    },
  });
}
