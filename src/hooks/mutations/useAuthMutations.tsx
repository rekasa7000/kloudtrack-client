import { loginService } from "@/api/services/authServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLogin() {
  return useMutation({
    mutationFn: loginService,
    onSuccess: (newUser) => {
      toast.success("Login Success", {
        description: `Welcome! ${newUser.userName}`,
        position: "top-right",
        duration: 5000,
        style: { backgroundColor: "green" },
      });
    },
    onError: (error) => {
      toast.error("Login Error", {
        description: error.message,
        position: "top-right",
        duration: 5000,
        style: { backgroundColor: "red" },
      });
    },
  });
}
