import { authService } from "@/api/services/authServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (newUser) => {
      console.log(newUser);
    },
    onError: (error) => {
      console.error("Failed to login user:", error);
    },
  });
}
